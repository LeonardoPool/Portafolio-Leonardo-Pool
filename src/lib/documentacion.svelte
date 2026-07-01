<script>
  import { activePage } from '$lib/store.js';
  import docPdf from '../assets/document/CV_LEONARDOPOOL_2026.pdf';
</script>

<article class="documentacion" data-page="documentacion" class:active={$activePage === 'documentacion'}>
  <header>
    <h2 class="h2 article-title">Documentación</h2>
  </header>

  <section class="viewer-section">
    <!-- Desktop: inline PDF viewer -->
    <div class="pdf-container">
      <iframe src={docPdf} title="Visor de Documento" class="pdf-viewer"></iframe>
    </div>

    <!-- Mobile/Tablet: Sleek preview card with information and view/download options -->
    <div class="mobile-preview-card">
      <div class="doc-icon-box">
        <ion-icon name="document-text-outline"></ion-icon>
      </div>
      <div class="doc-info">
        <h3 class="doc-name">CV_LEONARDOPOOL_2026.pdf</h3>
        <p class="doc-meta">Documento PDF • 140 KB</p>
      </div>
    </div>
    
    <div class="actions-container">
      <!-- Ver Documento (Opens PDF in a new tab, ideal for mobile browsing) -->
      <a href={docPdf} target="_blank" rel="noopener noreferrer" class="action-btn secondary">
        <ion-icon name="eye-outline"></ion-icon>
        <span>Ver Documento</span>
      </a>

      <!-- Descargar Documento -->
      <a href={docPdf} download="CV_LEONARDOPOOL_2026.pdf" class="action-btn primary">
        <ion-icon name="download-outline"></ion-icon>
        <span>Descargar</span>
      </a>
    </div>
  </section>
</article>

<style>
  .viewer-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    margin-top: 25px;
    width: 100%;
  }

  /* Default mobile/tablet layout: hide desktop PDF iframe container */
  .pdf-container {
    display: none;
  }

  /* Mobile/Tablet Preview Card */
  .mobile-preview-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background: var(--border-gradient-onyx);
    position: relative;
    padding: 35px 24px;
    border-radius: 16px;
    box-shadow: var(--shadow-2);
    width: 100%;
    z-index: 1;
  }

  .mobile-preview-card::before {
    content: "";
    position: absolute;
    inset: 1px;
    background: var(--bg-gradient-jet);
    border-radius: inherit;
    z-index: -1;
  }

  .doc-icon-box {
    color: var(--orange-yellow-crayola);
    font-size: 56px;
    margin-bottom: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .doc-name {
    color: var(--white-2);
    font-size: var(--fs-4);
    font-weight: var(--fw-500);
    margin-bottom: 4px;
    word-break: break-all;
  }

  .doc-meta {
    color: var(--light-gray-70);
    font-size: var(--fs-7);
    font-weight: var(--fw-300);
  }

  /* Actions container */
  .actions-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
  }

  .action-btn {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 14px 24px;
    border-radius: 14px;
    font-size: var(--fs-6);
    font-weight: var(--fw-500);
    box-shadow: var(--shadow-3);
    z-index: 1;
    transition: var(--transition-1);
    cursor: pointer;
    text-align: center;
  }

  .action-btn::before {
    content: "";
    position: absolute;
    inset: 1px;
    border-radius: inherit;
    z-index: -1;
    transition: var(--transition-1);
  }

  /* Primary Button (Gradient Hover style) */
  .action-btn.primary {
    color: var(--orange-yellow-crayola);
    background: var(--border-gradient-onyx);
  }

  .action-btn.primary::before {
    background: var(--bg-gradient-jet);
  }

  .action-btn.primary:hover {
    background: var(--bg-gradient-yellow-1);
    color: var(--smoky-black);
  }

  .action-btn.primary:hover::before {
    background: var(--bg-gradient-yellow-2);
  }

  /* Secondary Button (Outlined style) */
  .action-btn.secondary {
    color: var(--white-2);
    background: transparent;
    border: 1px solid var(--jet);
  }

  .action-btn.secondary::before {
    background: transparent;
  }

  .action-btn.secondary:hover {
    background: var(--onyx);
    border-color: var(--light-gray-70);
  }

  .action-btn ion-icon {
    font-size: 18px;
  }

  /* Desktop layout (>= 768px) */
  @media (min-width: 768px) {
    /* Show PDF container on desktop */
    .pdf-container {
      display: block;
      width: 100%;
      height: 600px;
      border-radius: 14px;
      overflow: hidden;
      border: 1px solid var(--jet);
      box-shadow: var(--shadow-2);
      background: var(--onyx);
    }

    .pdf-viewer {
      width: 100%;
      height: 100%;
      border: none;
    }

    /* Hide preview card on desktop */
    .mobile-preview-card {
      display: none;
    }

    /* Row actions layout on desktop */
    .actions-container {
      flex-direction: row;
      justify-content: center;
      gap: 16px;
      width: auto;
    }

    .action-btn {
      width: auto;
      padding: 13px 30px;
    }
  }
</style>
