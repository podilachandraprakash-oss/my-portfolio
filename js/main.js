// =========================================================================
// STATIC PORTFOLIO CONTROLLER: CHANDU (PODILA CHANDRA PRAKASH)
// Strict Architecture: ZERO Content Data in JS
// JS Exclusively Governs: Visual Effects, Interactions, Audio, & Redirection
// Color Direction: Refined Obsidian & Forest Emerald (Zero Neon)
// All Content Data Resides in Pure Semantic HTML5
// =========================================================================

// --- 1. Custom Magnetic Emerald Cursor ---
function initCustomCursor() {
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouch) return;

  document.body.classList.add('custom-cursor-active');

  const ring = document.getElementById('custom-cursor-ring');
  const dot = document.getElementById('custom-cursor-dot');
  const cursorText = document.getElementById('cursor-text');
  if (!ring || !dot) return;

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

    // Check hovered interactive target
    const target = e.target;
    const projectCard = target.closest('[data-cursor-project]');
    const interactive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor]');

    if (projectCard) {
      ring.className = 'project-active';
      if (cursorText) cursorText.textContent = projectCard.getAttribute('data-cursor-project') || 'Explore';
    } else if (interactive) {
      ring.className = 'pointer-active';
      const customLabel = interactive.getAttribute('data-cursor');
      if (cursorText) cursorText.textContent = customLabel || (interactive.tagName === 'A' ? 'Link' : 'Click');
    } else {
      ring.className = '';
      if (cursorText) cursorText.textContent = '';
    }
  });

  // Smooth RAF easing for the trailing outer ring
  function animateCursor() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
}

// --- 2. Live IST Time Clock ---
function initTimeClock() {
  const clockEl = document.getElementById('live-clock');
  if (!clockEl) return;

  function update() {
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }) + ' IST';
  }
  update();
  setInterval(update, 1000);
}

// --- 3. Scroll Progress Bar & Dynamic Navbar Glass Effect ---
function initScrollHandler() {
  const progressBar = document.getElementById('scroll-progress');
  const navbar = document.getElementById('main-navbar');

  window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollTop;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (progressBar && windowHeight > 0) {
      progressBar.style.width = `${(totalScroll / windowHeight) * 100}%`;
    }

    if (navbar) {
      if (window.scrollY > 40) {
        navbar.classList.add('bg-[#050806]/92', 'backdrop-blur-xl', 'border-b', 'border-emerald-900/30', 'shadow-2xl');
      } else {
        navbar.classList.remove('bg-[#050806]/92', 'backdrop-blur-xl', 'border-b', 'border-emerald-900/30', 'shadow-2xl');
      }
    }
  }, { passive: true });
}

// --- 4. Contact Form & Direct Transmission Redirection ---
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // Service selection chips
  const serviceChips = document.querySelectorAll('.service-chip-btn');
  serviceChips.forEach(chip => {
    chip.addEventListener('click', () => {
      window.sound?.playClick();
      serviceChips.forEach(c => {
        c.classList.remove('bg-emerald-600', 'text-white', 'font-bold');
        c.classList.add('bg-slate-900/80', 'text-slate-400');
      });
      chip.classList.add('bg-emerald-600', 'text-white', 'font-bold');
      chip.classList.remove('bg-slate-900/80', 'text-slate-400');
      const input = document.getElementById('contact-service-input');
      if (input) input.value = chip.getAttribute('data-value');
    });
  });

  // Submit handler: Confetti animation + WhatsApp Transmission Redirection
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    window.sound?.playSuccess();

    // Refined emerald / platinum confetti particle effect (no neon)
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.65 },
        colors: ['#10b981', '#059669', '#34d399', '#6ee7b7', '#f8fafc']
      });
    }

    const name = document.getElementById('contact-name-input')?.value || 'Client';
    const email = document.getElementById('contact-email-input')?.value || '';
    const service = document.getElementById('contact-service-input')?.value || 'Website Development';
    const message = document.getElementById('contact-message-input')?.value || '';

    // Hide form, show HTML success panel
    form.classList.add('hidden');
    const successMsg = document.getElementById('form-success-message');
    if (successMsg) successMsg.classList.remove('hidden');

    // Build transmission payload for direct redirect
    const transmissionText = `Hi Chandu,\n\nName: ${name}\nEmail: ${email}\nRequested Service: ${service}\nMessage: ${message}`;
    const redirectUrl = `https://wa.me/917569813732?text=${encodeURIComponent(transmissionText)}`;

    // Set fallback redirect button link in the success message
    const redirectBtn = document.getElementById('success-redirect-btn');
    if (redirectBtn) {
      redirectBtn.href = redirectUrl;
    }

    // Auto-redirect to WhatsApp after 1.5s
    setTimeout(() => {
      window.open(redirectUrl, '_blank');
    }, 1500);
  });
}

// --- 5. Direct Channel Redirections ---
function redirectToWhatsApp(customText) {
  window.sound?.playClick();
  const text = customText || 'Hi Chandu, I reviewed your portfolio and would like to discuss a project.';
  window.open(`https://wa.me/917569813732?text=${encodeURIComponent(text)}`, '_blank');
}

function redirectToEmail() {
  window.sound?.playClick();
  window.location.href = 'mailto:podilachandraprakash@gmail.com?subject=Project%20Inquiry%20via%20Portfolio';
}

function redirectToPhone() {
  window.sound?.playClick();
  window.location.href = 'tel:+917569813732';
}

function redirectToExternal(url) {
  window.sound?.playClick();
  window.open(url, '_blank', 'noopener,noreferrer');
}

// --- 6. Audio Toggle & Mobile Menu Drawer ---
function toggleAudio() {
  const isEnabled = window.sound ? window.sound.toggle() : false;
  const icon = document.getElementById('audio-toggle-icon');
  if (icon) {
    icon.innerHTML = isEnabled 
      ? '<path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>'
      : '<path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>';
  }
  if (isEnabled) window.sound?.playClick();
}

function toggleMobileMenu() {
  window.sound?.playClick();
  const drawer = document.getElementById('mobile-drawer');
  if (!drawer) return;
  drawer.classList.toggle('hidden');
}

// --- 7. DOM Ready Initialization ---
window.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initTimeClock();
  initScrollHandler();
  initContactForm();

  // Attach hover sounds to all links, buttons, and clickable items
  document.querySelectorAll('a, button, [role="button"]').forEach(el => {
    el.addEventListener('mouseenter', () => window.sound?.playHover());
  });
});
