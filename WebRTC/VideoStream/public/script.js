//hello?
const socket = io('/')

const videoGrid = document.getElementById('video-grid')

const myPeer = new Peer(undefined, {
    host:'/',
    port: '4001'
})





const myVideo = document.createElement('video')
myVideo.muted = true
navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
}).then(stream =>{
    addVideoStream(myVideo, stream)
})

function addVideoStream(video, stream){
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () =>{
        video.play()
    })
    videoGrid.append(video)
}

myPeer.on('open', id=>{
    socket.emit('join-room', ROOM_ID, id)

})

socket.on('user-connected', userId =>{
    console.log("user connected:", userId)
})







if(false)
navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
})
  .then(function(mediaStream) {
    let hiddenVideo = document.querySelector('video.hidden') // A video that is not displayed to the user 
    hiddenVideo.srcObject = mediaStream // Play the stream on the hidden video
    
    let canvas = document.querySelector('canvas'); // Get a canvas element, by creating or querying it (it may be hidden using 'display:none')
    let ctx = canvas.getContext('2d');
    let rVFC = () => {
        ctx.drawImage(hiddenVideo, 0, 0, 400, 400); // Draw the video image on your canvas
        // ... Manipulate your canvas here ...
        ctx.fillRect(0, 0, 200, 30)
        hiddenVideo.requestVideoFrameCallback(rVFC)
    }
    hiddenVideo.requestVideoFrameCallback(rVFC)
    
    var video = myVideo//document.querySelector('video.shown');
    video.srcObject = canvas.captureStream(); // Display the canvas edit on the video
}).catch(function(err) { console.log(err.name + ": " + err.message); });