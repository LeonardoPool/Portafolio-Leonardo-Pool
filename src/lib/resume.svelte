<script>
  import { activePage } from '$lib/store.js';
</script>

<article class="resume" data-page="resume" class:active={$activePage === 'resume'}>

        <header>
          <h2 class="h2 article-title">Resume</h2>
        </header>

        <section class="timeline">

          <div class="title-wrapper">
            <div class="icon-box">
              <ion-icon name="book-outline"></ion-icon>
            </div>

            <h3 class="h3">Educación</h3>
          </div>

          <ol class="timeline-list">

            <li class="timeline-item">

              <h4 class="h4 timeline-item-title">Universidad Técnológica Metropolitana</h4>

              <span>2024 — </span>

              <p class="timeline-text">
               Ingeniero en Desarrollo y Gestión de Software.
              </p>

            </li>

            <li class="timeline-item">

              <h4 class="h4 timeline-item-title">Universidad Tecnológica Metropolitana</h4>

              <span>2022 — 2024</span>

              <p class="timeline-text">
                Técnico Superior Universitario en Desarrollo de software multiplataforma.
              </p>

            </li>

            <li class="timeline-item">

              <h4 class="h4 timeline-item-title">Preparatoria 2 U.A.D.Y</h4>

              <span>2018 — 2021</span>

              <p class="timeline-text">
                Escuela Preparatoria No. 2 de la Universidad Autónoma de Yucatán, Mérida, Yucatán con enfoque en ciencias sociales administrativas.
              </p>

            </li>

          </ol>

        </section>

        <section class="timeline">

          <div class="title-wrapper">
            <div class="icon-box">
              <ion-icon name="book-outline"></ion-icon>
            </div>

            <h3 class="h3">Experiencia</h3>
          </div>

          <ol class="timeline-list">

            <li class="timeline-item">

              <h4 class="h4 timeline-item-title">Jefe de departamento</h4>

              <span>2025 — Present</span>

              <p class="timeline-text">
               Project manager y desarrollador web departamento de desarrollo en GMT Mayorista y Grupo desarrollador Avaa.
              </p>

            </li>

            <li class="timeline-item">

              <h4 class="h4 timeline-item-title">Administrativo en Tractocamiones de la peninsula S.A. C.V.</h4>

              <span>2024 — 2025</span>

              <p class="timeline-text">
                Auxiliar administrativo, me encargaba de la gestión de documentos, creación de facturas, atención al cliente y soporte administrativo general.
              </p>

            </li>

            <li class="timeline-item">

              <h4 class="h4 timeline-item-title">Oficial de seguridad de la información - Banco DONDE I.A.P.</h4>

              <span>2024 — 2024</span>

              <p class="timeline-text">
                Encargado de proteger la información sensible de la empresa Banco Dondé a nivel tecnológico, implementando políticas de seguridad y realizando auditorías internas, así como la verificación del cumplimiento de las políticas de operación emitidas por la CNBV y Banxico.
              </p>

            </li>

          </ol>

        </section>

        <section class="skill">

          <h3 class="h3 skills-title">My skills</h3>

          <ul class="skills-list content-card">

            <li class="skills-item">

              <div class="title-wrapper">
                <h5 class="h5">Web design</h5>
                <data value="80">80%</data>
              </div>

              <div class="skill-progress-bg">
                <div class="skill-progress-fill" style="width: 80%;"></div>
              </div>

            </li>

            <li class="skills-item">

              <div class="title-wrapper">
                <h5 class="h5">Graphic design</h5>
                <data value="70">70%</data>
              </div>

              <div class="skill-progress-bg">
                <div class="skill-progress-fill" style="width: 70%;"></div>
              </div>

            </li>

            <li class="skills-item">

              <div class="title-wrapper">
                <h5 class="h5">Project Managment</h5>
                <data value="90">80%</data>
              </div>

              <div class="skill-progress-bg">
                <div class="skill-progress-fill" style="width: 80%;"></div>
              </div>

            </li>

            <li class="skills-item">

              <div class="title-wrapper">
                <h5 class="h5">Web development</h5>
                <data value="50">85%</data>
              </div>

              <div class="skill-progress-bg">
                <div class="skill-progress-fill" style="width: 85%;"></div>
              </div>

            </li>

          </ul>

        </section>

      </article>