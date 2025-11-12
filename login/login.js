// login.js — checks the integral answer (no network calls)
// The integral shown in the image is ∫[4..6] (8 + 2x) dx = 36
document.addEventListener('DOMContentLoaded', () => {
  const CORRECT = 36;
  const input = document.getElementById('answerInput');
  const btn = document.getElementById('answerBtn');
  const feedback = document.getElementById('feedback');

  // helper: normalize numeric text to number (allow plain digits)
  function parseAnswer(text){
    if (!text) return NaN;
    // remove whitespace and commas
    const cleaned = String(text).trim().replace(/,/g,'');
    // allow simple numeric expressions like "36", " 36 ", or "36.0"
    const n = Number(cleaned);
    if (!Number.isNaN(n)) return n;
    // allow fraction form "72/2"
    if (/^\d+\s*\/\s*\d+$/.test(cleaned)){
      const [a,b] = cleaned.split('/').map(s=>Number(s.trim()));
      if (b !== 0) return a / b;
    }
    return NaN;
  }

  function setFeedback(msg, ok){
    feedback.textContent = msg;
    feedback.style.background = ok ? '#e7f7ea' : '#fdecec';
    feedback.style.color = ok ? '#175b2b' : '#6a1a1a';
  }

  btn.addEventListener('click', () => {
    const val = parseAnswer(input.value);
    if (Number.isNaN(val)) {
      setFeedback('Status: correct answer.', false);
      return;
    }
    if (Math.abs(val - CORRECT) < 1e-6) {
      setFeedback('Status: Correct! You are clearly very smart. Proceeding...', true);
      flashSuccess();
      setTimeout(() => {window.location.replace("/store")}, 1000);
    } else {
      setFeedback('Status: Incorrect — try again if you dare.', false);
      // small shake to be obnoxious
      shake(document.querySelector('.frame'));
    }
  });

  // allow pressing Enter inside input
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') btn.click();
  });

  // tiny animations
  function shake(el){
    if (!el) return;
    el.style.transition = 'transform 0.05s ease';
    el.style.transform = 'translateX(8px)';
    setTimeout(()=> el.style.transform = 'translateX(-8px)', 60);
    setTimeout(()=> el.style.transform = 'translateX(4px)', 120);
    setTimeout(()=> el.style.transform = 'translateX(0)', 180);
  }
  function flashSuccess(){
    const orig = document.body.style.background;
    document.body.style.transition = 'background 0.35s';
    document.body.style.background = '#eafaf1';
    setTimeout(()=> document.body.style.background = orig, 900);
  }
});

