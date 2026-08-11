// 🔥💧🌍🌀 Elemental Design System Interactive Logic

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dark / Light Mode Toggle
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('light');
      const isLight = document.body.classList.contains('light');
      themeToggleBtn.innerHTML = isLight ? '🌙 Dark Mode' : '☀️ Light Mode';
    });
  }

  // 2. Element Filter / Theme Switcher for Showcase
  const elementFilterBtns = document.querySelectorAll('.element-filter-btn');
  elementFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      elementFilterBtns.forEach(b => b.classList.remove('btn-fire', 'btn-water', 'btn-earth', 'btn-air', 'btn-avatar', 'active'));
      const elem = btn.dataset.element;
      btn.classList.add(`btn-${elem}`, 'active');

      const targetHero = document.getElementById('main-hero');
      if (targetHero) {
        targetHero.className = `hero hero-${elem} animate-fade-in-up`;
      }
    });
  });

  // 3. Modal Trigger Demo
  const openModalBtn = document.getElementById('open-modal-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalBackdrop = document.getElementById('modal-backdrop');

  if (openModalBtn && closeModalBtn && modalBackdrop) {
    openModalBtn.addEventListener('click', () => {
      modalBackdrop.classList.remove('hidden');
      modalBackdrop.classList.add('flex');
    });

    closeModalBtn.addEventListener('click', () => {
      modalBackdrop.classList.add('hidden');
      modalBackdrop.classList.remove('flex');
    });

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.add('hidden');
        modalBackdrop.classList.remove('flex');
      }
    });
  }

  // 4. Toast Notification Demo
  const triggerToastBtn = document.getElementById('trigger-toast-btn');
  const toastContainer = document.getElementById('toast-container');

  if (triggerToastBtn && toastContainer) {
    triggerToastBtn.addEventListener('click', () => {
      const toast = document.createElement('div');
      toast.className = 'alert alert-fire animate-scale-in shadow-lg shadow-fire/20';
      toast.innerHTML = `
        <svg class="w-5 h-5 flex-shrink-0 text-fire-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="6">
          <path d="M 50 10 C 65 30 75 42 75 60 C 75 76.5 63.8 90 50 90 C 36.2 90 25 76.5 25 60 C 25 45 35 30 40 22 C 42 35 48 40 50 40 C 52 35 45 20 50 10 Z" />
        </svg>
        <div>
          <h4 class="font-bold text-sm">Fire Nation Power Unleashed</h4>
          <p class="text-xs text-secondary mt-0.5">Component action completed successfully!</p>
        </div>
      `;
      toastContainer.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }, 3500);
    });
  }

  // 5. Copy Code Snippet
  const copyBtns = document.querySelectorAll('.copy-btn');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.codeTarget;
      const codeElement = document.getElementById(targetId);
      if (codeElement) {
        navigator.clipboard.writeText(codeElement.innerText.trim()).then(() => {
          const originalText = btn.innerText;
          btn.innerText = 'Copied!';
          btn.classList.add('text-earth-400');
          setTimeout(() => {
            btn.innerText = originalText;
            btn.classList.remove('text-earth-400');
          }, 2000);
        });
      }
    });
  });
});
