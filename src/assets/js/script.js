// Anti-debugger and source code protection
(function() {
    console.log('%cATTENTION:', 'color: red; font-size: 20px;');
    console.log('%cThis website is protected against code inspection.', 'font-size: 16px;');
    console.log('%cPlease refrain from trying to copy or debug the code.', 'font-size: 16px;');

    const check = () => {
        function doCheck(a) {
            if (('' + a / a).length !== 1 || a % 20 === 0) {
                (function() {}).constructor('debugger')()
            } else {
                (function() {}).constructor('debugger')()
            }
            doCheck(++a)
        }
        try {
            doCheck(0)
        } catch (err) {}
    };
    
    // Enable anti-debug
    setInterval(check, 1000); 
})();

'use strict';

/* ===============================
   Utilidades
================================ */
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); };

/* ===============================
   Sidebar (móvil)
================================ */
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

/* ===============================
   Testimonials (modal)
================================ */
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  modalContainer?.classList.toggle("active");
  overlay?.classList.toggle("active");
};

for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    const avatar = this.querySelector("[data-testimonials-avatar]");
    const title = this.querySelector("[data-testimonials-title]");
    const text  = this.querySelector("[data-testimonials-text]");

    if (modalImg && avatar) {
      modalImg.src = avatar.src;
      modalImg.alt = avatar.alt || '';
    }
    if (modalTitle && title) modalTitle.innerHTML = title.innerHTML;
    if (modalText && text) modalText.innerHTML = text.innerHTML;

    testimonialsModalFunc();
  });
}

modalCloseBtn?.addEventListener("click", testimonialsModalFunc);


/* ===============================
   Contact Form Logic handled in contact.svelte
================================ */

// The overlay click listener now only handles the testimonials modal
if (overlay) {
  overlay.addEventListener("click", function () {
    if (modalContainer?.classList.contains("active")) {
      testimonialsModalFunc();
    }
  });
}
