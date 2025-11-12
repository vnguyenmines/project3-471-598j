// ransom.js
console.log('ransom script loaded');

const SECRET_PIN = '1234'; // the "correct" PIN for the joke
let attempt = '';
const display = document.getElementById ? document.getElementById('display') : null;
const status = () => document.getElementById('status');
const timerEl = document.getElementById ? document.getElementById('timer') : null;

function updateDisplay() {
  if (!display) return;
  display.textContent = attempt || '----';
}

/* keep your original-named handlers, extended */
function numHandler(num) {
  console.log('num handler called ' + num);
  // Append up to 8 digits
  if (attempt.length < 8) {
    attempt += String(num);
    updateDisplay();
  } else {
    console.log('max digits reached');
  }
}

function deleteHandler() {
  console.log('delete handler called');
  attempt = '';
  updateDisplay();
}

/* link clear button to deleteHandler */
document.addEventListener('DOMContentLoaded', () => {
  // wire the clear button if present
  const clear = document.getElementById('clearBtn');
  if (clear) clear.addEventListener('click', () => deleteHandler());

  // initialize display
  if (display) display.textContent = SECRET_PIN; // show 8552 like the mock screenshot
  startTimer(5 * 60); // 5 minute countdown
});

/* submit logic - checks PIN and shows result */
function submitPin() {
  console.log('submit clicked, attempt:', attempt);
  const s = status();
  if (!s) return;
  if (attempt === SECRET_PIN) {
    s.textContent = 'Status: PIN accepted. Unlocking...';
    s.style.background = '#dff0d8';
    s.style.color = '#2f6627';
    // playful success animation
    document.body.style.transition = 'background 0.6s';
    document.body.style.background = '#20342a';
    // clear attempt
    attempt = '';
    updateDisplay();
    setTimeout(() => {
      window.location.replace("/");
    }, 2000);
  } else {
    s.textContent = 'Status: Incorrect PIN — charging non-refundable "Membership".';
    s.style.background = '#fde0e0';
    s.style.color = '#6a1a1a';
    // small shake animation to emphasize bad design
    shakeScreen();
    // keep attempt (simulate lock-in); do not actually do anything malicious
  }
}

/* small CSS animation via JS */
function shakeScreen() {
  const el = document.querySelector('.frame');
  if (!el) return;
  el.style.transform = 'translateX(6px)';
  el.style.transition = 'transform 0.05s ease';
  setTimeout(()=> el.style.transform = 'translateX(-6px)', 50);
  setTimeout(()=> el.style.transform = 'translateX(4px)', 100);
  setTimeout(()=> el.style.transform = 'translateX(0)', 150);
}

/* Countdown timer */
let timerInterval = null;
function startTimer(seconds) {
  let remaining = seconds;
  function tick() {
    if (!timerEl) return;
    const mm = Math.floor(remaining / 60).toString().padStart(2, '0');
    const ss = (remaining % 60).toString().padStart(2, '0');
    timerEl.textContent = `${mm}:${ss}`;
    if (remaining <= 0) {
      clearInterval(timerInterval);
      // final "threat" - purely UI
      const s = status();
      if (s) {
        s.textContent = 'Status: Time expired — placing mock order (this is fake).';
        s.style.background = '#ffefcf';
        s.style.color = '#6b4200';
      }
      document.body.style.filter = 'grayscale(0.35)';
      return;
    }
    remaining -= 1;
  }
  tick();
  timerInterval = setInterval(tick, 1000);
}

/* expose functions to global (used by inline onclicks) */
window.numHandler = numHandler;
window.deleteHandler = deleteHandler;
window.submitPin = submitPin;


