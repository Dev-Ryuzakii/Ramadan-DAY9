// Total number of fasting days in Ramadan
const TOTAL_FASTING_DAYS = 30;

// Get DOM elements
const calendarElement = document.getElementById('calendar');
const progressBarElement = document.getElementById('progressBar');
const progressTextElement = document.getElementById('progressText');
const totalFastingDaysElement = document.getElementById('totalFastingDays');

// Load saved progress from local storage
let fastingProgress = JSON.parse(localStorage.getItem('fastingProgress')) || Array(TOTAL_FASTING_DAYS).fill(null);

// Render the calendar
function renderCalendar() {
  calendarElement.innerHTML = '';
  fastingProgress.forEach((status, index) => {
    const dayElement = document.createElement('div');
    dayElement.className = `day ${status || ''}`;
    dayElement.textContent = index + 1;
    dayElement.addEventListener('click', () => toggleDayStatus(index));
    calendarElement.appendChild(dayElement);
  });
}

// Toggle day status (Fasted/Missed)
function toggleDayStatus(dayIndex) {
  const currentStatus = fastingProgress[dayIndex];
  if (currentStatus === 'fasted') {
    fastingProgress[dayIndex] = 'missed';
  } else if (currentStatus === 'missed') {
    fastingProgress[dayIndex] = null;
  } else {
    fastingProgress[dayIndex] = 'fasted';
  }
  saveProgress();
  renderCalendar();
  updateProgress();
}

// Save progress to local storage
function saveProgress() {
  localStorage.setItem('fastingProgress', JSON.stringify(fastingProgress));
}

// Update progress bar and summary
function updateProgress() {
  const fastedDays = fastingProgress.filter((status) => status === 'fasted').length;
  const progressPercentage = (fastedDays / TOTAL_FASTING_DAYS) * 100;

  progressBarElement.style.width = `${progressPercentage}%`;
  progressTextElement.textContent = `${Math.round(progressPercentage)}% Completed`;
  totalFastingDaysElement.textContent = fastedDays;
}

// Initialize the app
renderCalendar();
updateProgress();