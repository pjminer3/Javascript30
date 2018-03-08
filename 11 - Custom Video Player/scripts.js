// GET OUR ELEMENTS
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider[type="range"]');

let mouseClicked = false;




// BUILD OUT FUNCTIONS
function mouseDown() {
  mouseClicked = true;
}

function mouseUp() {
  mouseCliced = false;
}

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
  // get the skip value
  const timeSkip = this.dataset.skip;
  // change the movie time
  video.currentTime += parseFloat(timeSkip);
}

function handleRangeUpdate(e) {
  if (!mouseClicked) return;

  video[this.name] = this.value;
}

function handleProgress() {
  // function to handle the progress bar by updating the flex-basis
  console.log('handlgin progress');
  // get % of video that has been watched 
  const currentPerc = this.currentTime / this.duration;
  // apply that percent to the flex basis of the progress bar
  progressBar.style.flexBasis = `${currentPerc * 100}%`;
}

function scrub(e) {
  // use this function to enable 'scrubbing' on the progress bar
  // const barProgress = e.offsetX;
  // const barPercProgress = barProgress / this.offsetWidth;
  // // set the new value on the video
  // video[this.name] = barPercProgress.toFixed(2);
}


// HOOK UP THE EVENT LISTENERS
  // add togglePlay() to both the video and the toggle button
  video.addEventListener('click', togglePlay);
  toggle.addEventListener('click', togglePlay);
  // add a listener on the video to change the play button (while it's playing)
  video.addEventListener('play', updateButton);
  video.addEventListener('pause', updateButton);
  // add a video listener to update the progress bar
  video.addEventListener('timeupdate', handleProgress);
  // call skip() on a click to any skip button
  skipButtons.forEach( button => {
    button.addEventListener('click', skip);
  })
  // 2. add listeners for both sliders on change (and on move, only when clicking it)
  ranges.forEach(range => {
    range.addEventListener('mousedown', mouseDown);
    range.addEventListener('mouseup', mouseUp);
    range.addEventListener('mousemove', handleRangeUpdate);
  })

  // 4. Listen on progress bar for a click
  // 5. List on progress bar for a drag and drop
