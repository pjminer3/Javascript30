// GET OUR ELEMENTS
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider[type="range"]');




// BUILD OUT FUNCTIONS
function togglePlay() {
  // when called, toggle from paused/play
  // do it with a turnerary operator
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton(e) {
  const newIcon = e.type === 'play' ? '❚ ❚' : '►';
  toggle.textContent = newIcon;
}

function skip() {
  console.log('skipping');
  // make buttons skip when clicked
}

function handleRangeUpdate() {
  console.log(this.value);
  // make both ranges change (volume and speed) with this one function
}


// HOOK UP THE EVENT LISTENERS
  // add togglePlay() to both the video and the toggle button
  video.addEventListener('click', togglePlay);
  toggle.addEventListener('click', togglePlay);
  // add a listener on the video to change the play button (while it's playing)
  video.addEventListener('play', updateButton);
  video.addEventListener('pause', updateButton);
  // call skip() on a click to any skip button
  // add listeners for both sliders on change (and on move, only when clicking it)
