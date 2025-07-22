    const form = document.getElementById('contact-form');
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const data = new FormData(form);

      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbwxz3BZitsN9k7oaA04LwSHYn0jId9s1KWeUEddEcJcNm8Ko3-oao6cTAU12a3nPix5/exec', {
          method: 'POST',
          body: data
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.text();
        document.getElementById('respuesta').innerHTML = `<p class="text-jh">${result}<p><a href="https://jhely.com">👉 Conoce nuestra plataforma aquí</a>`;
        form.reset();
      } catch (error) {
        document.getElementById('respuesta').innerText = 'Hubo un error al enviar el formulario. Intentalo más tarde.';
      }
    });

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


    // Reloj
    const mostrarReloj = ()=>{
     fechaFinal = new Date('2025-7-24');
     fechaActual = new Date();
     dif = fechaFinal - fechaActual;
     segundos = Math.trunc(dif / 1000);
     minutos = Math.trunc(segundos / 60);
     horas = Math.trunc(minutos / 60);
     dias = Math.trunc(horas / 24);

     if(horas > 23){
        dias = dias + Math.trunc(horas / 24);
        horas = horas%24;
     }
     if(minutos > 59){
        horas = horas + Math.trunc(horas / 60);
        minutos = minutos%60;
     }
     if(segundos > 59){
        minutos = minutos + Math.trunc(minutos / 60);
        segundos = segundos%60;
     }
     document.getElementById('dias').innerHTML = dias;
     document.getElementById('horas').innerHTML = horas;
     document.getElementById('minutos').innerHTML = minutos;
     document.getElementById('segundos').innerHTML = segundos;
    }
 
    setInterval(mostrarReloj, 1000);