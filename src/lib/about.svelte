<script>
  import { activePage } from '$lib/store.js';

  import avatar1 from '../assets/images/avatar-1.png';
  import avatar2 from '../assets/images/avatar-2.png';
  import avatar3 from '../assets/images/avatar-3.png';
  import avatar4 from '../assets/images/avatar-4.png';
  import iconDesign from '../assets/images/icon-design.svg';
  import iconDev from '../assets/images/icon-dev.svg';
  import iconApp from '../assets/images/icon-app.svg';
  import iconPhoto from '../assets/images/icon-photo.svg';
  import iconQuote from '../assets/images/icon-quote.svg';
  import checkGif from '../assets/images/check.gif';
  import logo1 from '../assets/images/logo-1-color.png';
  import logo2 from '../assets/images/logo-2-color.png';
  import logo3 from '../assets/images/logo-3-color.png';
  import logo4 from '../assets/images/logo-4-color.png';
  import logo5 from '../assets/images/logo-5-color.png';
  import logo6 from '../assets/images/logo-6-color.png';


  let isModalActive = false;
  let currentModal = {
    avatar: '',
    title: '',
    text: ''
  };

  const testimonials = [
    {
      avatar: avatar1,
      alt: 'Alfonso Cauich',
      title: 'Alfonso Cauich',
      text: `<p>Leonardo fue contratado para desarrollar un sistema para nuestro taller mecánico de diesel, solicitamos una herramienta que nos pudiese ayudar con nuestro inventario, con la gestión de nuestros clientes y sobre todo la gestión de productividad de nuestros mecánicos, nos recomendó una aplicación web para tener acceso a nuestra plataforma en todo momento, quedamos satisfechos con el resultado final y la atención brindada, ya que no solo nos ayudó con la herramienta solicitada, si no que también nos asesoró en la compra de hardware para el correcto funcionamiento de la aplicación.</p>`
    },
    {
      avatar: avatar2,
      alt: 'Joselin Cauich',
      title: 'Joselin Cauich',
      text: `<p>Contraté a Leonardo para que realizara mi página web personal, ya que necesitaba una herramienta que me ayudara a mostrar mis proyectos y habilidades como desarrollador web. Me ayudó a crear un sitio web atractivo y fácil de usar, que refleja mi estilo personal y profesional. Estoy muy satisfecho con el resultado final y la atención al cliente que recibí durante todo el proceso. Además, Leonardo me brindó asesoramiento sobre cómo mejorar mi presencia en línea y cómo optimizar mi sitio web para los motores de búsqueda. Recomiendo encarecidamente sus servicios a cualquier.</p>`
    },
    {
      avatar: avatar3,
      alt: 'Karla Esquivel Heredia',
      title: 'Karla Esquivel Heredia',
      text: `<p>Leonardo fue contratado para desarrollar una aplicación web de un mayorista de viajes, actualmente se encuentra trabajando en nuestra empresa como lider desarrollo en nuestro departamento de TI y estamos muy satisfechos con su desempeño y profesionalismo, ya que no solo cumplió con nuestras expectativas, si no que las superó.</p>`
    },
    {
      avatar: avatar4,
      alt: 'Raul Andres Esquivel',
      title: 'Raul Andres Esquivel',
      text: `<p>Leonardo nos ayudó con nuestra Landing page para nuestra empresa la cual es una inmobiliaria, nos asesoró en todo momento y nos brindó un excelente servicio, estamos muy satisfechos con el resultado final y la atención a los detalles y diseño de la página web.</p>`
    }
  ];

  function openModal(testimonial) {
    currentModal = testimonial;
    isModalActive = true;
  }

  function closeModal() {
    isModalActive = false;
  }
</script>

<article class="about" data-page="about" class:active={$activePage === 'about'}>

  <header>
    <h2 class="h2 article-title">Sobre mi</h2>
  </header>

  <section class="about-text">
    <p>
      Soy ingeniero en desarrollo y gestión de software, con especialización en desarrollo web.
      me gusta mucho el diseño web, la creación de interfaces para dispositivos móviles y paginas web.
    </p>

    <p>
      My trabajo es construir tu sitio web para que sea funcional y fácil de usar, pero al mismo tiempo atractivo.
     adicionalmente, me apasiona crear proyectos de calidad que se adapten a tus necesidades y
      objetivos. Me gusta trabajar con las últimas tecnologías y tendencias de diseño para asegurarme de que
      cada proyecto sea una experiencia única para tus usuarios.
    </p>
  </section>


  <!--
    - service
  -->

  <section class="service">

    <h3 class="h3 service-title">Trabajando en ...</h3>

    <ul class="service-list">

      <li class="service-item">

        <div class="service-icon-box">
          <img src={iconDesign} alt="design icon" width="40">
        </div>

        <div class="service-content-box">
          <h4 class="h4 service-item-title">Diseño Web</h4>

          <p class="service-item-text">
            Realizo diseños para cualquier tipo de página web o app móvil
          </p>
        </div>

      </li>

      <li class="service-item">

        <div class="service-icon-box">
          <img src={iconDev} alt="Web development icon" width="40">
        </div>

        <div class="service-content-box">
          <h4 class="h4 service-item-title">Web development</h4>

          <p class="service-item-text">
            Desarrollo de cualquier tipo de página web según la solicitud del usuario. 
          </p>
        </div>

      </li>

      <li class="service-item">

        <div class="service-icon-box">
          <img src={iconApp} alt="mobile app icon" width="40">
        </div>

        <div class="service-content-box">
          <h4 class="h4 service-item-title">Mobile apps</h4>

          <p class="service-item-text">
            Desarrollo profesional de aplicaciones móviles para Android
          </p>
        </div>

      </li>

      <li class="service-item">

        <div class="service-icon-box">
          <img src={iconPhoto} alt="camera icon" width="40">
        </div>

        <div class="service-content-box">
          <h4 class="h4 service-item-title">Meta Ads Managment</h4>

          <p class="service-item-text">
            Manejo de campañas de publicidad a través del portal de meta ads.
          </p>
        </div>

      </li>

    </ul>

  </section>


  <!--
    - testimonials
  -->

  <section class="testimonials">

    <h3 class="h3 testimonials-title">Testimonios</h3>

    <ul class="testimonials-list has-scrollbar">

      {#each testimonials as testimonial}
        <li class="testimonials-item">
          <button on:click={() => openModal(testimonial)} class="testimonial-button">
            <div class="content-card">

              <figure class="testimonials-avatar-box">
                <img src={testimonial.avatar} alt={testimonial.alt} width="60">
              </figure>

              <h4 class="h4 testimonials-item-title">{testimonial.title}</h4>

              <div class="testimonials-text">
                {@html testimonial.text}
              </div>

            </div>
          </button>
        </li>
      {/each}

    </ul>

  </section>


  <!--
    - testimonials modal
  -->

  <div class="modal-container" class:active={isModalActive}>

    <button class="overlay" class:active={isModalActive} on:click={closeModal} aria-label="Close modal"></button>

    <section class="testimonials-modal">

      <button class="modal-close-btn" on:click={closeModal} aria-label="Close modal">
        <ion-icon name="close-outline"></ion-icon>
      </button>

      {#if currentModal}
        <div class="modal-img-wrapper">
          <figure class="modal-avatar-box">
            <img src={currentModal.avatar} alt={currentModal.alt} width="80">
          </figure>

          <img src={iconQuote} alt="quote icon">
        </div>

        <div class="modal-content">

          <h4 class="h3 modal-title">{currentModal.title}</h4>

          <div class="modal-text">
            {@html currentModal.text}
          </div>

        </div>
      {/if}

    </section>

  </div>


  <!--
    - Success modal
  -->
  <div class="modal-container" data-success-modal-container>
    <div class="overlay" data-overlay></div>
    <section class="testimonials-modal success-modal">
      <button class="modal-close-btn" data-success-modal-close-btn aria-label="Close modal">
        <ion-icon name="close-outline"></ion-icon>
      </button>
      <div class="modal-content">
        <figure class="modal-avatar-box">
          <img src={checkGif} alt="Success" width="80">
        </figure>
        <h4 class="h3 modal-title">¡Gracias!</h4>
        <div data-modal-text>
          <p>
            Muchas gracias por brindar tu información, me pondré en contacto contigo lo más pronto posible.
          </p>
        </div>
      </div>
    </section>
  </div>


  <!--
    - clients
  -->

  <section class="clients">

    <h3 class="h3 clients-title">Clients</h3>

    <ul class="clients-list has-scrollbar">

      <li class="clients-item">
        <img src={logo1} alt="client logo">
      </li>

      <li class="clients-item">
        <img src={logo2} alt="client logo">
      </li>

      <li class="clients-item">
        <img src={logo3} alt="client logo">
      </li>

      <li class="clients-item">
        <img src={logo4} alt="client logo">
      </li>

      <li class="clients-item">
        <img src={logo5} alt="client logo">
      </li>

      <li class="clients-item">
        <img src={logo6} alt="client logo">
      </li>

    </ul>

  </section>

</article>

<style>
  .testimonial-button {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    width: 100%;
    text-align: left;
    cursor: pointer;
  }
</style>