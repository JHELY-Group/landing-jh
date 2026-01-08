// Smooth scroll to form
function scrollToForm(e) {
    e.preventDefault();
    document.querySelector('.hero-section').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all benefit cards and step cards
document.querySelectorAll('.benefit-card, .step-card, .stat-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

/*--- Metricas ---*/
document.addEventListener('DOMContentLoaded', function () {
    const counters = document.querySelectorAll('.stat-number');

    const options = { threshold: 0.5 };

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