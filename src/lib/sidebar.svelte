<script>
  import profileImg from '../assets/images/PERFIL.PNG';
  let isActive = false;

  function toggleSidebar() {
    isActive = !isActive;
  }
</script>

<aside class="sidebar" class:active={isActive}>

  <div class="sidebar-info">

    <figure class="avatar-box">
      <img src={profileImg} alt="Leonardo Pool" width="80">
    </figure>

    <div class="info-content">
      <h1 class="name" title="Leonardo Pool">Leonardo Pool</h1>

      <p class="title">Web developer & Project Manager</p>
    </div>

    <button class="info_more-btn" on:click={toggleSidebar}>
      <span>Show Contacts</span>

      <ion-icon name="chevron-down"></ion-icon>
    </button>

  </div>

      <div class="sidebar-info_more">

        <div class="separator"></div>

        <ul class="contacts-list">

          <li class="contact-item">

            <div class="icon-box">
              <ion-icon name="mail-outline"></ion-icon>
            </div>

            <div class="contact-info">
              <p class="contact-title">Correo</p>

              <a href="mailto:leo.pool3003@gmail.com" class="contact-link">leo.pool3003@gmail.com</a>
            </div>

          </li>

          <li class="contact-item">

            <div class="icon-box">
              <ion-icon name="phone-portrait-outline"></ion-icon>
            </div>

            <div class="contact-info">
              <p class="contact-title">Teléfono</p>

              <a href="tel:+52 9993098011" class="contact-link">+52 (999) 309-8011</a>
            </div>

          </li>

          <li class="contact-item">

            <div class="icon-box">
              <ion-icon name="calendar-outline"></ion-icon>
            </div>

            <div class="contact-info">
              <p class="contact-title">Fecha de nacimiento</p>

              <time datetime="1982-06-23">Marzo 30, 2003</time>
            </div>

          </li>

          <li class="contact-item">

            <div class="icon-box">
              <ion-icon name="location-outline"></ion-icon>
            </div>

            <div class="contact-info">
              <p class="contact-title">Ubicación</p>

              <address>Mérida, Yucatán, MX</address>
            </div>

          </li>

        </ul>

        <div class="separator"></div>

        <ul class="social-list">

          <li class="social-item">
            <a href="https://www.facebook.com/share/1CBVhAheEk/?mibextid=wwXIfr" class="social-link" aria-label="Facebook">
              <ion-icon name="logo-facebook"></ion-icon>
            </a>
          </li>

          <li class="social-item">
            <a href="https://x.com/Leolinares115" class="social-link" aria-label="Twitter">
              <ion-icon name="logo-twitter"></ion-icon>
            </a>
          </li>

          <li class="social-item">
            <a href="https://www.instagram.com/leonardo_pool_linares/" class="social-link" aria-label="Instagram">
              <ion-icon name="logo-instagram"></ion-icon>
            </a>
          </li>

        </ul>

      </div>

    </aside>
