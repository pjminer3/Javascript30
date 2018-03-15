const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false})
    .then(localMediaStream => {
      // set the video element's source to the camera object
      video.src = window.URL.createObjectURL(localMediaStream);
      video.play();
    })
    .catch(err => {
      // In case they don't let us use their camera
      console.error('Oh no! We need to use your camera: ', err);
    });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;

  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    // adds the video image to canvas
    ctx.drawImage(video, 0, 0, width, height);

    // get pixels for editing
    let pixels = ctx.getImageData(0, 0, width, height);
    // changes the pixels
    // pixels = redEffect(pixels);
    pixels = rgbSplit(pixels);
    // adds the pixels back to canvas
    ctx.putImageData(pixels, 0, 0);
  }, 16)
  
}

function takePhoto() {
  snap.currentTime = 0;
  snap.play();

  // get the data from canvas to keep
  const data = canvas.toDataURL('image/jpeg');

  // create a link node to hold the image
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.textContent = "Download Image";
  link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;

  // add the image link to the strip node
  strip.insertBefore(link, strip.firstChild);
};

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i+= 4) {
    // this way i will be each RGB red value
    pixels.data[i + 0] = pixels.data[i + 0] + 100; // change value of red
    pixels.data[i + 1] = pixels.data[i + 1] - 50; // change value of green
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // change value of blue
  }
  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 150] = pixels.data[i + 0];
    pixels.data[i - 100] = pixels.data[i + 1];
    pixels.data[i + 150] = pixels.data[i + 2];
  }

  return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);

