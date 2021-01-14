const timeStart = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')
const timeControls = document.querySelectorAll('.timer__button')
let countdownInterval

function timer(seconds) {
  const now = Date.now()
  const then = now + seconds * 1000
  displayTimeLeft(seconds)
  displayEndTime(then)
  clearInterval(countdownInterval)

  countdownInterval = setInterval(() => {
    const countdown = Math.round((then - Date.now()) / 1000)
    if (countdown < 0) {
      clearInterval(countdownInterval)
      return
    }

    displayTimeLeft(countdown)
  }, 1000)
}

function displayTimeLeft(time) {
  const minute = Math.floor(time / 60)
  const remainderSeconds = time % 60

  const timeLeft = `${minute}:${
    remainderSeconds < 10 ? '0' : ''
  }${remainderSeconds}`

  timeStart.textContent = timeLeft
}

function displayEndTime(time) {
  const date = new Date(time)
  const hours = date.getHours()
  const minutes = date.getMinutes()

  endTime.textContent = `Be back at: ${hours}:${
    minutes < 10 ? '0' : ''
  }${minutes}`
}

function handleTimeControl() {
  timer(this.dataset.time)
}

timeControls.forEach((t) => t.addEventListener('click', handleTimeControl))
document.customForm.addEventListener('submit', function (e) {
  e.preventDefault()
  const minute = this.minutes.value * 60
  timer(minute)
  this.reset()
})
