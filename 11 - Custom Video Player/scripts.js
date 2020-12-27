const video = document.querySelector('.viewer')
const skipBtn = document.querySelector('button[data-skip="25"]')
const prevBtn = document.querySelector('button[data-skip="-10"]')
const icon = document.querySelector('.toggle')
const ranges = document.querySelectorAll('input')
const progress = document.querySelector('.progress')
const progressbar = document.querySelector('.progress__filled')

function toggleVideo(e) {
  const method = video.paused ? 'play' : 'pause'
  video[method]()
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip)
}

function updateIcon(e) {
  icon.textContent = e.type === 'play' ? '😂' : '😡'
}

function handleRangeUpdate() {
  video[this.name] = this.value
}

function handleProgressUpdate(e) {
  const percent = (video.currentTime / video.duration) * 100
  progressbar.style.flexBasis = `${percent}%`
}

function scrup(e) {
  const scrupTime = (e.offsetX / progress.offsetWidth) * video.duration

  video.currentTime = scrupTime
}

video.addEventListener('click', toggleVideo)
video.addEventListener('play', updateIcon)
video.addEventListener('pause', updateIcon)
video.addEventListener('timeupdate', handleProgressUpdate)

skipBtn.addEventListener('click', skip)
prevBtn.addEventListener('click', skip)
icon.addEventListener('click', toggleVideo)
ranges.forEach((range) => range.addEventListener('change', handleRangeUpdate))
ranges.forEach((range) =>
  range.addEventListener('mousemove', handleRangeUpdate),
)

let isMouseDown = false

progress.addEventListener('click', scrup)
progress.addEventListener('mousemove', (e) => isMouseDown && scrup(e))
progress.addEventListener('mousedown', () => (isMouseDown = true))
progress.addEventListener('mouseup', () => (isMouseDown = false))
