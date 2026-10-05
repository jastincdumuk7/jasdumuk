/**
 * JASTIN DUMUK (jasdumuk) PORTFOLIO JAVASCRIPT
 * Powers the interactive capabilities, Web Audio synthesis,
 * project filters, mascot dynamics, and clipboard hooks.
 */

(function () {
  'use strict';

  // --- STATE & DATA ---
  let quackCount = 0;
  let audioCtx = null;
  let isDancing = false;
  let danceTimer = null;

  // Curated project details for the modal
  const projectsData = [
    {
      title: "Jasdumuk Interactive Digital HQ",
      category: "WEB APPLICATION // PORTFOLIO",
      tags: ["HTML5", "CSS3", "VANILLA JS", "FUTURA SYSTEM", "A11Y"],
      desc: "The primary digital portfolio and creative engineering showcase for Jastin Dumuk. Engineered with high-contrast light teal, obsidian black, and electric green accents. Adheres to modern web performance standards, fluid responsive scaling, and zero runtime overhead.",
      specs: [
        "100% pure vanilla JavaScript—zero bloated client runtime libraries.",
        "Custom fluid typography scale calculated with CSS clamp().",
        "Fully accessible semantic landmark layout conforming to WCAG AA contrast.",
        "Synthesized Web Audio sound effects for the Erm Duck mascot."
      ],
      githubUrl: "https://github.com/jastincdumuk7/jasdumuk"
    },
    {
      title: "The Duck Companion Engine",
      category: "INTERACTIVE // SOUND SYNTHESIS",
      tags: ["WEB AUDIO API", "CSS SPRITES", "MICRO-INTERACTIONS"],
      desc: "An in-browser reactive mascot module built around Erm Duck. Features an on-the-fly oscillator frequency sweep mimicking a retro synth quack, reactive speech bubbles, and tactile physics bounces.",
      specs: [
        "Audio synthesis via AudioContext, BiquadFilterNode, and GainNode envelope shaping.",
        "Zero external audio asset requests, instantaneous zero-latency playback.",
        "Dynamic speech balloon queue with randomized developer humor.",
        "Persistent quack interaction telemetry counter."
      ],
      githubUrl: "https://github.com/jastincdumuk7/jasdumuk"
    },
    {
      title: "Typographic Matrix & Token Architecture",
      category: "DESIGN SYSTEM // TOKENS",
      tags: ["DESIGN TOKENS", "VARIABLE TYPOGRAPHY", "FUTURA / JOST"],
      desc: "A rigorous typographic hierarchy exploring Paul Renner's Futura across all weights (100 to 900), oblique variants, and hollow outline stroke treatments. Designed for razor-sharp legibility on high-DPI displays.",
      specs: [
        "Jost web font integration pairing seamlessly with local macOS system Futura.",
        "Modular CSS variable system governing borders, shadows, and color states.",
        "Tactile neo-brutalist interaction tokens for buttons and interactive cards.",
        "High-contrast outline rendering via -webkit-text-stroke."
      ],
      githubUrl: "https://github.com/jastincdumuk7/jasdumuk"
    },
    {
      title: "Algorithmic Canvas Playground",
      category: "CREATIVE EXPERIMENT // CANVAS",
      tags: ["HTML5 CANVAS", "GEOMETRIC PHYSICS", "INTERACTION"],
      desc: "A creative lab sandbox featuring mathematical easing vectors, electric neon particles, and interactive drag-and-drop geometric elements.",
      specs: [
        "High-framerate 60FPS animation loops.",
        "Hardware-accelerated transforms and GPU compositing.",
        "Adaptive resolution scaling to match devicePixelRatio.",
        "Graceful fallback for prefers-reduced-motion environments."
      ],
      githubUrl: "https://github.com/jastincdumuk7/jasdumuk"
    }
  ];

  const duckWisdoms = [
    "erm... did someone say high-contrast teal and Futura?",
    "10/10 code quality detected. Erm Duck approves!",
    "Always commit with descriptive messages. Quack.",
    "CSS Grid > Floats. Change my mind.",
    "Futura bold tracked 0.15em is pure geometric perfection.",
    "erm... what the duck?!",
    "Bug found and promptly debugged. You're welcome.",
    "Clean code, high contrast, bold ideas.",
    "No runtime dependencies were harmed in the making of this site.",
    "Quack! Don't forget to star the repo on GitHub!"
  ];

  // --- AUDIO SYNTHESIS: RETRO QUACK SFX ---
  function playQuackSound() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      if (!audioCtx) {
        audioCtx = new AudioContextClass();
      }

      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const now = audioCtx.currentTime;

      // Primary Oscillator (Sawtooth for duck-like harmonic timbre)
      const osc = audioCtx.createOscillator();
      osc.type = 'sawtooth';

      // Pitch sweep downward: rapid glide from ~420Hz down to ~160Hz
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(160, now + 0.18);

      // Bandpass Filter to emulate nasal beak resonance
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, now);
      filter.Q.setValueAtTime(3.5, now);

      // Gain Envelope
      const gainNode = audioCtx.createGain();
      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.exponentialRampToValueAtTime(0.35, now + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      // Connect graph
      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {
      console.warn("Audio synthesis not permitted or unsupported:", e);
    }
  }

  // --- MASCOT ACTIONS ---
  function handleQuackAction() {
    quackCount++;
    const display = document.getElementById('quackCounterDisplay');
    if (display) display.textContent = quackCount;

    playQuackSound();

    // Visual wobble on mascot image
    const mascot = document.getElementById('duckMascot');
    if (mascot) {
      mascot.style.transform = 'scale(1.18) rotate(' + (Math.random() > 0.5 ? 8 : -8) + 'deg)';
      setTimeout(() => {
        mascot.style.transform = '';
      }, 200);
    }

    // Append to terminal log
    const terminal = document.getElementById('duckTerminalLog');
    if (terminal) {
      const timestamp = new Date().toLocaleTimeString();
      terminal.textContent += `\n[${timestamp}] Quack triggered (#${quackCount}) - Sound synthesized`;
      terminal.scrollTop = terminal.scrollHeight;
    }
  }

  function handleThinkAction() {
    const speech = document.getElementById('duckSpeech');
    if (!speech) return;

    const randomIndex = Math.floor(Math.random() * duckWisdoms.length);
    const chosen = duckWisdoms[randomIndex];

    speech.style.opacity = '0';
    speech.style.transform = 'translateY(6px)';

    setTimeout(() => {
      speech.textContent = `"${chosen}"`;
      speech.style.opacity = '1';
      speech.style.transform = 'translateY(0)';
    }, 150);

    // Minor audio beep
    playQuackSound();
  }

  function handleDanceAction() {
    const mascot = document.getElementById('duckMascot');
    if (!mascot) return;

    if (isDancing) {
      isDancing = false;
      mascot.classList.remove('duck-dancing');
      clearTimeout(danceTimer);
      return;
    }

    isDancing = true;
    mascot.classList.add('duck-dancing');
    playQuackSound();

    const speech = document.getElementById('duckSpeech');
    if (speech) {
      speech.textContent = '"PARTYYYY BOUNCE ACTIVATED! 🦆✨"';
    }

    // Stop dancing after 5 seconds to conserve energy
    danceTimer = setTimeout(() => {
      isDancing = false;
      mascot.classList.remove('duck-dancing');
    }, 5000);
  }

  // --- CLIPBOARD & TOAST NOTIFICATION ---
  function showToast(message) {
    const toast = document.getElementById('toastNotification');
    const toastMsg = document.getElementById('toastMessage');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  function copyTextToClipboard(text, successMessage) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMessage);
      }).catch(() => {
        fallbackCopy(text, successMessage);
      });
    } else {
      fallbackCopy(text, successMessage);
    }
  }

  function fallbackCopy(text, successMessage) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(successMessage);
    } catch (err) {
      showToast("PRESS CTRL+C TO COPY: " + text);
    }
    document.body.removeChild(textArea);
  }

  // --- SCROLL PROGRESS & ACTIVE LINK SPY ---
  function initScrollProgress() {
    const progressBar = document.getElementById('progressBar');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = `${progress}%`;
    }, { passive: true });
  }

  // --- PROJECT FILTERING ---
  function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const category = card.getAttribute('data-category') || '';
          if (filter === 'all' || category.includes(filter)) {
            card.style.display = 'flex';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --- MODAL DIALOG ---
  function initProjectModal() {
    const modal = document.getElementById('projectModal');
    const modalCategory = document.getElementById('modalCategory');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalTags = document.getElementById('modalTags');
    const modalSpecs = document.getElementById('modalSpecs');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalDismissBtn = document.getElementById('modalDismissBtn');

    if (!modal) return;

    let previousActiveElement = null;

    function openModal(projectIndex) {
      const data = projectsData[projectIndex];
      if (!data) return;

      previousActiveElement = document.activeElement;

      modalCategory.textContent = data.category;
      modalTitle.textContent = data.title;
      modalDesc.textContent = data.desc;

      // Tags
      modalTags.innerHTML = '';
      data.tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'tech-tag';
        span.textContent = tag;
        modalTags.appendChild(span);
      });

      // Specs
      modalSpecs.innerHTML = '';
      data.specs.forEach(spec => {
        const li = document.createElement('li');
        li.textContent = spec;
        modalSpecs.appendChild(li);
      });

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      modalCloseBtn.focus();
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (previousActiveElement) {
        previousActiveElement.focus();
      }
    }

    // Attach to trigger buttons
    document.querySelectorAll('.open-modal-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const index = parseInt(btn.getAttribute('data-project'), 10);
        openModal(index);
      });
    });

    modalCloseBtn?.addEventListener('click', closeModal);
    modalDismissBtn?.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
      }
    });
  }

  // --- MOBILE MENU TOGGLE ---
  function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- QUICK PING FORM ---
  window.handleQuickPing = function () {
    const nameInput = document.getElementById('pingName');
    const msgInput = document.getElementById('pingMessage');
    const feedback = document.getElementById('pingFeedback');

    if (!nameInput || !msgInput || !feedback) return;

    const name = nameInput.value.trim();
    const msg = msgInput.value.trim();

    if (!name || !msg) return;

    feedback.textContent = `⚡️ TRANSMISSION RECEIVED FROM ${name.toUpperCase()}! OPENING MAIL CLIENT...`;
    showToast("PING RECEIVED! CONNECTING...");

    setTimeout(() => {
      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`Hi Jastin,\n\n${msg}\n\nFrom: ${name}`);
      window.location.href = `mailto:jasdumuk@gmail.com?subject=${subject}&body=${body}`;
    }, 900);
  };

  // --- INITIALIZATION ---
  document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
    initProjectFilters();
    initProjectModal();
    initMobileMenu();

    // Mascot triggers
    document.getElementById('duckMascot')?.addEventListener('click', handleQuackAction);
    document.getElementById('quackBtn')?.addEventListener('click', handleQuackAction);
    document.getElementById('thinkBtn')?.addEventListener('click', handleThinkAction);
    document.getElementById('danceBtn')?.addEventListener('click', handleDanceAction);
    document.getElementById('quackAudioBtn')?.addEventListener('click', handleQuackAction);

    // Copy Email triggers
    document.querySelectorAll('.copy-email-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = btn.getAttribute('data-email') || 'jasdumuk@gmail.com';
        copyTextToClipboard(email, "COPIED TO CLIPBOARD: " + email);
      });
    });

    console.log(
      "%c JASTIN DUMUK // PORTFOLIO 2026 %c HIGH VOLTAGE LIGHT TEAL & FUTURA LOADED ",
      "background: #0a0c10; color: #00f5cc; font-weight: bold; padding: 4px 8px; border-radius: 4px;",
      "background: #bbf7ee; color: #0a0c10; font-weight: bold; padding: 4px 8px; border-radius: 4px;"
    );
  });
})();
