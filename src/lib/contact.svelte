<script>
  // @ts-nocheck
  import { activePage } from '$lib/store.js';
  import { onMount } from 'svelte';

  onMount(() => {
    const contactForm = document.querySelector("[data-form]");
    const formInputs = document.querySelectorAll("[data-form-input]");
    const formBtn = document.querySelector("[data-form-btn]");

    const successModalContainer = document.querySelector("[data-success-modal-container]");
    const successModalCloseBtn = document.querySelector("[data-success-modal-close-btn]");
    const overlay = document.querySelector("[data-overlay]");

    const successModalFunc = function () {
      successModalContainer?.classList.toggle("active");
      overlay?.classList.toggle("active");
    };

    if (successModalCloseBtn) {
      successModalCloseBtn.addEventListener("click", successModalFunc);
    }
    
    if (overlay) {
      overlay.addEventListener("click", function () {
        if (successModalContainer?.classList.contains("active")) {
          successModalFunc();
        }
      });
    }

    if (contactForm && formInputs.length > 0 && formBtn) {
      for (let i = 0; i < formInputs.length; i++) {
        formInputs[i].addEventListener("input", function () {
          if (contactForm.checkValidity()) {
            formBtn.removeAttribute("disabled");
          } else {
            formBtn.setAttribute("disabled", "");
          }
        });
      }

      contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        emailjs.init("m6H72h69vckPpWTog"); 

        const templateParams = {
          fullname: this.fullname.value,
          email: this.email.value,
          phone: this.phone.value,
          message: this.message.value,
        };

        emailjs.send("service_ag6bgxq", "template_qdmel1o", templateParams)
          .then(function(response) {
             console.log('SUCCESS!', response.status, response.text);
             successModalFunc();
             contactForm.reset();
             formBtn.setAttribute("disabled", "");
          }, function(error) {
             console.log('FAILED...', error);
             alert("Failed to send message. Please try again later.");
          });
      });
    }
  });
</script>

<article class="contact" data-page="contact" class:active={$activePage === 'contact'}>

  <header>
    <h2 class="h2 article-title">Contacto</h2>
  </header>

  <section class="mapbox" data-mapbox>
    <figure>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d119934.40272815124!2d-89.69848133579103!3d20.9859263157585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f56715cad717559%3A0x435882af5032b43a!2sM%C3%A9rida%2C%20Yuc.!5e0!3m2!1ses-419!2smx!4v1622564269102!5m2!1ses-419!2smx"
        width="400" height="300" loading="lazy" title="Google Maps location of Mérida, Yucatán"></iframe>
    </figure>
  </section>

  <section class="contact-form">

    <h3 class="h3 form-title">Formulario de Contacto</h3>

    <form action="#" class="form" data-form>

      <div class="input-wrapper" style="grid-template-columns: 1fr;">
        <input type="text" name="fullname" class="form-input" placeholder="Nombre completo" required data-form-input>
      </div>

      <div class="input-wrapper">
        <input type="email" name="email" class="form-input" placeholder="Dirección de correo" required data-form-input>
        <input type="tel" name="phone" class="form-input" placeholder="Número de teléfono" data-form-input>
      </div>

      <textarea name="message" class="form-input" placeholder="Tu mensaje" required data-form-input></textarea>

      <button class="form-btn" type="submit" disabled data-form-btn>
        <ion-icon name="paper-plane"></ion-icon>
        <span>Enviar Mensaje</span>
      </button>

    </form>

  </section>

</article>
