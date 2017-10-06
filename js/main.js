const video = document.querySelector('[data-js="player"]');
const canvas = document.querySelector('[data-js="photo"]');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('[data-js="strip"]');
const snap = document.querySelector('[data-js="snap"]');
const inputs = document.querySelectorAll('[data-js="controls-input"]');

let width, height, pixels;
let red = 30, green = 30, blue = 30;

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      video.src = window.URL.createObjectURL(localMediaStream);
      video.play();
  })
  .catch(err => {
    console.error(`OH NOO!!`, err);
  })
}

function paintToCanavas() {
  width =  video.videoWidth;
  height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
      showEffect();
   }, 16);
}

function showEffect() {
  // take the pixels out
  pixels = ctx.getImageData(0, 0, width, height);

  // mess with them
  pixels = rgbSplit(pixels);

  // put them back
  ctx.putImageData(pixels, 0, 0);
}

function rgbSplit() {
  for(let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] + red; // RED
    pixels.data[i + 1] = pixels.data[i + 1] - green; // GREEN
    pixels.data[i + 2] = pixels.data[i + 2] * blue;//  BLUE
  }
  return pixels;
}

function updateVar(e) {
  const target = parseFloat(e.target.value);
  const name = e.target.name;
  if(name === 'red') { red = target }
  if(name === 'green') { red = target }
  if(name === 'blue') { red = target }
}

function takePhoto() {
  //played the sound
  snap.currentTime = 0;
  snap.play();

  // take the data out of the canva
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src="${data}" alt="Handsome!" />`;
  strip.insertBefore(link, strip.firstChild);

}

getVideo();

video.addEventListener('canplay', paintToCanavas);
inputs.forEach((input) => {
    this.addEventListener('click', updateVar);
});
