/*--- Metricas ---*/
document.addEventListener('DOMContentLoaded', function () {
    const counters = document.querySelectorAll('.counter');

    const options = {
    threshold: 0.5
    };

    const animateCount = (el) => {
    const target = +el.getAttribute('data-target');
    const duration = 2000; // tiempo total en ms
    const frameRate = 60;
    const totalFrames = Math.round(duration / (1000 / frameRate));
    let frame = 0;

    const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const current = Math.floor(target * progress);
        el.textContent = '+' + current.toLocaleString();

        if (frame >= totalFrames) {
        clearInterval(counter);
        el.textContent = '+' + target.toLocaleString();
        }
    }, 1000 / frameRate);
    };

    const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        animateCount(entry.target);
        obs.unobserve(entry.target); // solo una vez
        }
    });
    }, options);

    counters.forEach(counter => {
    observer.observe(counter);
    });
});

/*--- Carrucel de resenas ---*/
const track = document.getElementById("testimonialTrack");
const items = document.querySelectorAll(".testimonial");
const totalItems = items.length;
const visibleCount = 3;
const itemWidth = items[0].offsetWidth;
let index = 0;

function updateCarousel() {
  track.style.transition = "transform 0.5s ease";
  track.style.transform = `translateX(-${index * itemWidth}px)`;
}

function autoSlide() {
  index++;
  updateCarousel();

  // Reiniciar si llega al final de la lista duplicada
  if (index >= totalItems - visibleCount) {
    setTimeout(() => {
      track.style.transition = "none";
      index = 0;
      track.style.transform = `translateX(0)`;
    }, 600);
  }
}

let interval = setInterval(autoSlide, 4000); // Cambia cada 4 segundos

// Recalcular ancho en redimensionamiento
window.addEventListener("resize", () => {
  clearInterval(interval);
  index = 0;
  track.style.transition = "none";
  track.style.transform = `translateX(0px)`;
  setTimeout(() => {
    interval = setInterval(autoSlide, 4000);
  }, 500);
});