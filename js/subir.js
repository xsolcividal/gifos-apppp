function startStreamingVideo() {
    navigator.mediaDevices.getUserMedia({
        audio: false, 
        video: { 
            width: { min: 240, max: 480},
        }
    })
    .then(function(stream) {
        let video = document.querySelector('#video-gifo');
        video.srcObject = stream;
        video.onloadedmetadata = function(e) {
            video.play();
        }
    })
}
document.querySelector('#comenzar-btn').addEventListener("click", () => {
    document.getElementById("create-your-guifo").style.display = "none"
    document.getElementById("capture-guifo").style.display = "block"
    startStreamingVideo()
})
function captureCamera(call) {
    navigator.mediaDevices.getUserMedia({
        audio: false, 
        video: { 
            width: { min: 240, max: 480},
        }
    }).then(function(camera) {
        call(camera);
    }).catch(function(error) {
        alert('No se puede acceder a la camara.');
        console.log(error);
    });
}
function stopRecordingCallback() {
    console.log(recorder.getBlob())
    document.querySelector('#step3-preview-video').src = URL.createObjectURL(recorder.getBlob())
    recorder.camera.stop();
}
async function upload() {
    document.getElementById("preview-section").style.display = "none"
    document.getElementById("gifo-subido").style.display = "block"
    let form = new FormData();
    form.append('file', recorder.getBlob(), 'myGif.gif')
    //console.log(form.get('file'))
    const uploadURL = 'https://upload.giphy.com/v1/gifs?api_key=kdFOwDT4ieXpQiNeUk4B1EhjZ0yt0Irt'
    const answerFetch = await fetch(uploadURL, {
        method: 'POST',
        body: form,
    }).then(response => response.json()
    ).then(
        function(sucess) {
            document.getElementById("gifo-subido").style.display = "none";
            document.getElementById("descarga").style.display = "block"
            console.log(sucess.data.id)
            const gifUrlLocalStorage = localStorage.getItem('myGifosId');
            console.log(gifUrlLocalStorage)
            if (gifUrlLocalStorage === null) {
                const gifosUrlArray = [];
                gifosUrlArray.push(sucess.data.id);
                localStorage.setItem('myGifosId', JSON.stringify(gifosUrlArray));
                renderGifUrl(gifosUrlArray);
            } else {
                const gifUrlLocalStorageArray = JSON.parse(gifUrlLocalStorage);
                let gifosUrlSet = new Set();
                gifUrlLocalStorageArray.forEach(value => {
                gifosUrlSet.add(value)
                })
                gifosUrlSet.add(sucess.data.id)
                const gifosUrlLocalStorageJson = JSON.stringify(Array.from(gifosUrlSet));
                localStorage.setItem('myGifosId', gifosUrlLocalStorageJson);
                const container = document.querySelector('#uploaded-gifs');
                const divGifos = document.querySelector('#mis-guifos-cnt')
                const gifDiv = document.createElement('div');
                container.replaceChild(GifDiv, divGifos);
                GifDiv.setAttribute('id', 'mis-guifos-cnt')
                GifDiv.setAttribute('class', 'images-container')
                renderGifUrl(Array.from(gifosUrlSet))
                document.querySelector('#gifo-uploaded-img').setAttribute('src', 'https://media.giphy.com/media/' + sucess.data.id + '/200w_d.gif');
                document.querySelector('#copy-url-gifo-btn').addEventListener('click', callback => {
                    const container = document.querySelector('.gifo-created-btns');
                    const auxInput = document.createElement('input');
                    container.appendChild(auxiliarInput);
                    auxInput.setAttribute('value', 'https://media.giphy.com/media/' + sucess.data.id + '/200w_d.gif');
                    auxInput.select();
                    document.execCommand("copy");
                    alert("URL copiado en el portapapeles");
                    container.removeChild(auxInput);
                })
                document.querySelector('#download-gifo-btn').addEventListener('click', callback => {
                    const anchor = document.querySelector('#download-gifo-btn');
                    anchor.setAttribute('href', 'https://media.giphy.com/media/' + sucess.data.id + '/200w_d.gif');
                    anchor.setAttribute('download', 'my-Gifo-' + sucess.data.id);
                })
            }
        }
    ).catch(error => {
        alert('Ocurrio un error al crear tu guifo.')
        console.log(error)
    });
};
function renderGifUrl(array) {
    const gifosDiv = document.querySelector('#mis-guifos-cnt');
    array.forEach(value => {
        const gifosFigure = document.createElement('figure');
        const gifosImage = document.createElement('img');
        gifosDiv.appendChild(gifosFigure);
        gifosFigure.appendChild(gifosImage);
        gifosImage.setAttribute('src', 'https://media.giphy.com/media/' + value + '/200w_d.gif')
    })
}
function verifyMyGifsLocalStore() {
    const gifUrlLocalStorage = localStorage.getItem('myGifosId');
    if (gifUrlLocalStorage === null) {
        localStorage.setItem('myGifosId', '[]');
    } else {     
        const gifUrlLocalStorageArray = JSON.parse(gifUrlLocalStorage);
        let gifosUrlSet = new Set();
        gifUrlLocalStorageArray.forEach(value => {
            gifosUrlSet.add(value)
        })
        const gifosUrlLocalStorageJson = JSON.stringify(Array.from(gifosUrlSet));
        localStorage.setItem('myGifosId', gifosUrlLocalStorageJson);
        renderGifUrl(Array.from(gifosUrlSet))
    }
}
verifyMyGifsLocalStore()
document.querySelector('#btn-start-recording').addEventListener('click', callback => {
    document.getElementById("capture-guifo").style.display = "none"
    document.getElementById("pause-guifo").style.display = "block"
    captureCamera(function(camera) {
        recorder = RecordRTC(camera, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            height: 240,
            onGifPreview: function(gifURL) {
                document.querySelector('#grabando-video').src = gifURL
            },
            timeSlice: 1000,
        });
        recorder.startRecording();
        dateStarted = new Date().getTime();
        recorder.camera = camera;
        document.querySelector('#repetir-guifo').addEventListener('click', recorder.reset)
    });
});

document.querySelector('#btn-stop-recording').addEventListener('click', callback => {
    document.getElementById("pause-guifo").style.display = "none"
    document.getElementById("preview-section").style.display = "block"
    recorder.stopRecording(stopRecordingCallback);
});
document.querySelector('#repetir-guifo').addEventListener('click', callback => {
    document.querySelector("#capture-guifo").style.display = "block"
    document.querySelector("#preview-section").style.display = "none"
})

document.querySelector('#upload-guifo').addEventListener('click', callback => {
    upload()
})
document.querySelector("#ready").addEventListener("click", ()=>{
    window.location = 'index.html'
})