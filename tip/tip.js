// tip.js — simple tip selection logic (no real payments)
document.addEventListener('DOMContentLoaded', () => {
  const tipButtons = Array.from(document.querySelectorAll('.tip-btn'));
  const subtotalEl = document.getElementById('subtotal');
  const tipAmtEl = document.getElementById('tipAmt');
  const grandEl = document.getElementById('grandTotal');
  const payBtn = document.getElementById('payBtn');
  const msg = document.getElementById('msg');

  // parse subtotal (simple example, replace with real cart calculation)
  const subtotal = parseFloat(subtotalEl.textContent.replace(/[^0-9.]/g, '')) || 24.00;
  let selectedPercent = 0;

  function formatUSD(n){
    return `$${n.toFixed(2)}`;
  }

  function updateTotals(){
    const tipAmount = +(subtotal * (selectedPercent/100));
    tipAmtEl.textContent = formatUSD(tipAmount);
    grandEl.textContent = formatUSD(subtotal + tipAmount);
    payBtn.disabled = selectedPercent === 0;
    msg.textContent = selectedPercent === 0 ? 'Status: Waiting for tip selection' : `Status: ${selectedPercent}% tip selected`;
  }

  tipButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tipButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedPercent = Number(btn.dataset.percent) || 0;
      updateTotals();
    });
  });

  payBtn.addEventListener('click', () => {
    if(selectedPercent === 0) return;
    payBtn.disabled = true;
    msg.textContent = 'Processing payment...';
    // fake progress
    fakeProgress().then(() => {
      msg.textContent = 'Purchase complete — thank you for tipping!';
      payBtn.textContent = 'Done';
      payBtn.disabled = true;
    });
  });

  function fakeProgress(){
    return new Promise(resolve => {
      const steps = [400, 800, 1200, 1600];
      let i = 0;
      const interval = setInterval(() => {
        msg.textContent = `Processing payment${'.'.repeat((i%3)+1)}`;
        i++;
        if(i >= steps.length){
          clearInterval(interval);
          setTimeout(resolve, 400);
        }
      }, 300);
    });
  }

  // initialize
  subtotalEl.textContent = formatUSD(subtotal);
  updateTotals();
});

