let APP_ID = undefined


let token = undefined; //production
let uid = String(Math.floor(Math.random() * 10000000));

let client;
let channel;

let localStream;
let remoteStream;
let peerConnection;

const stun_servers = {
    iceServers:[
        {
            urls:['stun:stun1.1.google.com:19302', 'stun:stun2.1.google.com:19302']
        }
    ]
}

const getVideoPlayer = (id) => {
    return document.getElementById(`user-${id}`)
}

const agora = require("agora-rtm-sdk")
let init = async() =>{

    client = await agora.createInstance(APP_ID)
    await client.login({uid, token})

    channel = client.createChannel('main')
    await channel.join()

    channel.on('MemberJoined', handleUserJoined)


    client.on('MessageFromPeer', handleMessageFromPeer)

    let vp1 = getVideoPlayer(1)
    vp1.muted = true;


    localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    })
    vp1.srcObject = localStream
    vp1.addEventListener('loadedmetadata', () =>{
        vp1.play()
    })
    vp1.append(localStream)


}

let handleMessageFromPeer = async (message, MemberID) =>{
    message = JSON.parse(message.text)
    console.log(message, MemberID)

    switch(message.type){
        case 'offer':{
            createAnswer(MemberID, message.offer)
        }
        case 'answer':{
            addAnswer(message.answer)
        }
        case 'candidate':{
            if(peerConnection){
                peerConnection.addIceCandidate(message.candidate)
            }
        }
    }
    
}

let handleUserJoined = async (MemberID) =>{
    console.log("new user joined:", MemberID)
    createOfferToRemote(MemberID)
}


let createPeerConnection = async (MemberID) =>{
    peerConnection = new RTCPeerConnection(stun_servers)
    let vp2 = getVideoPlayer(2)

    remoteStream = new MediaStream()//setup the MediaStream, add the data from remote later
    vp2.srcObject = remoteStream
    vp2.addEventListener('loadedmetadata', () =>{
        vp2.play()
    })
    vp2.append(remoteStream)


    let vp1 = getVideoPlayer(1)
    vp1.muted = true;
    while(!localStream){
        localStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        })
    }
    vp1.srcObject = localStream
    vp1.addEventListener('loadedmetadata', () =>{
        vp1.play()
    })
    vp1.append(localStream)

    localStream.getTracks().forEach(track => { //give the connection the data to send to remote
        peerConnection.addTrack(track, localStream)
    })

    //listen for remote to send their tracks/data
    peerConnection.ontrack = event =>{
        event.streams[0].getTracks().forEach(track => {
            remoteStream.addTrack(track)
        })
    }

    peerConnection.onicecandidate = async event => {
        if(event.candidate){
            client.sendMessageToPeer({text:JSON.stringify({
                'type':'candidate', 
                'candidate':event.candidate
            })}, MemberID)
        }
    }

}

let createOfferToRemote = async (MemberID) => {
    
    await createPeerConnection(MemberID)

    let offer = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer)
    console.log(offer)

    client.sendMessageToPeer({text:JSON.stringify({
        'type':'offer', 
        'offer':offer
    })}, MemberID)

}


let createAnswer = async (MemberID, offer) =>{
    await createPeerConnection(MemberID)

    await peerConnection.setRemoteDescription(offer)

    let answer = await peerConnection.createAnswer()
    await peerConnection.setLocalDescription(answer)

    //send back sdp answer
    client.sendMessageToPeer({text:JSON.stringify({
        'type':'answer', 
        'answer':answer
    })}, MemberID)
}

let addAnswer = async answer=>{
    if(!peerConnection.currentRemoteDescription){
        peerConnection.setRemoteDescription(answer)
    }
}
//init after getting agora app_id
fetch('APP_ID')
    .then(response => response.text())
    .then(text => {APP_ID = text; console.log(text, '==', APP_ID); return text;})
    .then(()=>init())
    .catch(error =>{console.log(error)})
//init();

