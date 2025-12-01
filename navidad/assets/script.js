// Create snowflakes
function createSnowflakes() {
    const container = document.getElementById('snowflakes');
    for (let i = 0; i < 30; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.innerHTML = '❄';
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
        snowflake.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(snowflake);
    }
}

// Check and update gift status based on current date
function updateGiftStatus() {
    const now = new Date();
    const giftItems = document.querySelectorAll('.gift-item');
    
    giftItems.forEach(item => {
        const unlockDate = new Date(item.getAttribute('data-unlock-date'));
        const giftCard = item.querySelector('.gift-card');
        const giftIcon = item.querySelector('.gift-icon-wrapper');
        const giftBtn = item.querySelector('.gift-btn');
        const giftTitle = item.querySelector('.gift-title');
        
        if (now >= unlockDate) {
            // Unlock the gift
            giftCard.classList.remove('locked');
            giftCard.classList.add('unlocked');
            giftIcon.remove();
            giftBtn.classList.remove('btn-locked');
            giftBtn.disabled = false;
            giftBtn.innerHTML = '<i class="bi bi-gift-fill me-2"></i>Reclamar Regalo';
            
            // Update title to remove lock emoji
            if (giftTitle.textContent.includes('🔒')) {
                giftTitle.textContent = giftTitle.textContent.replace('🔒', '🎁');
            }
        } else {
            // Lock the gift
            giftCard.classList.add('locked');
            giftCard.classList.remove('unlocked');
            giftIcon.classList.add('locked');
            giftIcon.classList.remove('unlocked');
            giftBtn.classList.add('btn-locked');
            giftBtn.disabled = true;
            giftBtn.innerHTML = '<i class="bi bi-lock-fill me-2"></i>Próximamente';
            
            // Update icon to lock
            const icon = giftIcon.querySelector('.gift-icon');
            if (!icon.classList.contains('bi-lock-fill')) {
                icon.className = 'bi bi-lock-fill gift-icon';
            }
            
            // Update title to add lock emoji
            if (!giftTitle.textContent.includes('🔒')) {
                giftTitle.textContent = giftTitle.textContent.replace('🎁', '🔒');
            }
        }
    });
}

// Open claim modal
function openClaimModal(giftType) {
    document.getElementById('giftType').value = giftType;
    document.getElementById('respuesta').innerHTML = '';
    const modal = new bootstrap.Modal(document.getElementById('claimModal'));
    modal.show();
}

// Handle form submission
const form = document.getElementById('claimForm');
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const data = new FormData(form);

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Enviando...';

    try {
        const response = await fetch('https://script.google.com/a/macros/jhely.com/s/AKfycbyJ38-KJYul0aIY5ka7y3w-nhsIHePQUXP_d-lCLPZ6-Hlf4fkP4AVAK9HVx4MG_204Ew/exec', {
            method: 'POST',
            body: data
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const result = await response.text();
        document.getElementById('respuesta').innerHTML = `
            <div class="alert alert-success">
                <h5 class="alert-heading"><i class="bi bi-check-circle-fill me-2"></i>¡Felicidades!</h5>
                <p class="text-jh mb-3">${result}</p>
                <hr>
                <p class="mb-2"><a href="https://chat.whatsapp.com/LmqshL6PHIW6kP2me1D9Ip" class="alert-link" target="_blank"><i class="bi bi-whatsapp me-2"></i>Únete a nuestro grupo aquí</a></p>
                <p class="mb-0"><a href="https://jhely.com" class="alert-link" target="_blank"><i class="bi bi-house-door me-2"></i>Conoce nuestra plataforma aquí</a></p>
            </div>
        `;
        form.reset();
    } catch (error) {
        document.getElementById('respuesta').innerHTML = `
            <div class="alert alert-danger">
                <i class="bi bi-exclamation-triangle-fill me-2"></i>
                Hubo un error al enviar el formulario. Inténtalo más tarde.
            </div>
        `;
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Initialize
createSnowflakes();
updateGiftStatus();

// Update gift status every minute
setInterval(updateGiftStatus, 60000);