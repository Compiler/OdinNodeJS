let APP_ID = undefined
let res = fetch('APP_ID')
.then(response => response.text())
.then(text => {APP_ID = text; console.log(text); return text;}).catch(error =>{console.log(error)})

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

let init = async() =>{
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


    createOfferToRemote()
}


let createOfferToRemote = async () => {
    peerConnection = new RTCPeerConnection(stun_servers)
    let vp2 = getVideoPlayer(2)

    remoteStream = new MediaStream()//setup the MediaStream, add the data from remote later
    vp2.srcObject = remoteStream
    vp2.addEventListener('loadedmetadata', () =>{
        vp2.play()
    })
    vp2.append(remoteStream)


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
            console.log('new ice candidate:', event.candidate)
        }
    }

    let offer = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer)
    console.log(offer)

}

init();

