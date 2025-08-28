(function () {
  // countdown
  const target = new Date("Dec 1, 2025 00:00:00").getTime();
  const dEl = document.getElementById("days");
  const hEl = document.getElementById("hours");
  const mEl = document.getElementById("minutes");
  const sEl = document.getElementById("seconds");

  function tick() {
    const now = Date.now();
    let dist = target - now;
    if (dist <= 0) {
      dEl.textContent = "0";
      hEl.textContent = "0";
      mEl.textContent = "0";
      sEl.textContent = "0";
      return;
    }
    const days = Math.floor(dist / (1000 * 60 * 60 * 24));
    dist -= days * (1000 * 60 * 60 * 24);
    const hours = Math.floor(dist / (1000 * 60 * 60));
    dist -= hours * (1000 * 60 * 60);
    const mins = Math.floor(dist / (1000 * 60));
    dist -= mins * (1000 * 60);
    const secs = Math.floor(dist / 1000);
    dEl.textContent = days;
    hEl.textContent = String(hours).padStart(2, "0");
    mEl.textContent = String(mins).padStart(2, "0");
    sEl.textContent = String(secs).padStart(2, "0");
  }
  tick();
  setInterval(tick, 1000);

  // gentle snowflakes (emoji). We'll generate a small, fixed number placed randomly so they already appear across the screen.
  const FLAKE_COUNT = 18;
  const body = document.body;

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  for (let i = 0; i < FLAKE_COUNT; i++) {
    const el = document.createElement("div");
    el.className = "snowflake";
    el.textContent = "❄️";
    const size = Math.round(rand(14, 26));
    el.style.fontSize = size + "px";
    el.style.left = Math.round(rand(2, 96)) + "%";
    // start already somewhere on the screen
    el.style.top = Math.round(rand(2, 88)) + "vh";

    const duration = Math.round(rand(18, 40));
    const delay = -Math.round(rand(0, duration)); // negative so it looks mid-animation

    el.style.animation = `fallY ${duration}s linear infinite`;
    // tiny horizontal sway via separate animation on transform translateX
    el.style.animationTimingFunction = "linear";
    // use CSS variable hack to create phase offset
    el.style.setProperty("--sway-amt", rand(6, 14) + "px");
    // add slight opacity and blur based on size to create depth
    el.style.opacity = (size / 28).toFixed(2);

    // Add small sway using requestAnimationFrame loop per element to keep things light and unique
    body.appendChild(el);

    // progressive horizontal sway via simple JS loop
    (function loop(node, phase) {
      let start = null;
      function frame(t) {
        if (!start) start = t;
        const elapsed = (t - start) / 1000;
        const sway =
          Math.sin(elapsed * (0.2 + Math.random() * 0.4)) *
          (parseFloat(getComputedStyle(node).opacity) * 8);
        node.style.transform = `translateX(${sway}px) translateY(0)`;
        requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    })(el, i);

    // when a flake goes past bottom, reset top to -8vh so it's continuous
    // We'll rely on CSS animation for vertical movement, but keep elements present across screen via negative delays
  }

  // Form
  const form = document.getElementById("leadForm");
  form.addEventListener("submit", async (e)=> {
    e.preventDefault();
    const data = new FormData(form);

    const email = document.getElementById("email").value.trim();

    if (!email) return;

    // micro-validation
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      alert("Ingresá un email válido.");
      return;
    }

    try{
      const response = await fetch('https://script.google.com/macros/s/AKfycbwxz3BZitsN9k7oaA04LwSHYn0jId9s1KWeUEddEcJcNm8Ko3-oao6cTAU12a3nPix5/exec', {
      method: 'POST',
      body: data
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.text();
      console.log(result);
      document.getElementById('mensaje').innerHTML = `
      <p class="text-gold">Gracias, te avisaremos cuando lancemos.<p>
      <a href="https://jhely.com" class="text-gold">👉 Conoce nuestra plataforma aquí</a>
      `;

      // UX: show quick success state
      const btn = form.querySelector("button");
      btn.disabled = true;
      btn.textContent = "Enviado ✓";
    }catch(e){
      console.log(e)
      document.getElementById('mensaje').innerText = 'Hubo un error al enviar el formulario. Intentalo más tarde.';
    }
  });
})();
