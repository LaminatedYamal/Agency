/**
 * BRUTO STUDIOS — High-End Architectural Landing Page
 * Interactive Logic: Live Portugal Clock, Interactive Type Tester, Theme Switcher, Inquiry Handler
 */

document.addEventListener('DOMContentLoaded', () => {
  initLiveClock();
  initHeroVideo();
  initExpertiseCarousel();
  initInquiryForm();
});

/**
 * 1. Live Studio Clock (Portugal GMT+0)
 */
function initLiveClock() {
  const headerTimeEl = document.getElementById('header-time');
  const footerTimeEl = document.getElementById('footer-time');
  const heroTimeEl = document.getElementById('hero-clock-time');
  const hourHand = document.getElementById('hero-hour-hand');
  const minHand = document.getElementById('hero-min-hand');

  function updateClock() {
    const now = new Date();
    // Portugal Time (Europe/Lisbon)
    const options = {
      timeZone: 'Europe/Lisbon',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    };
    const timeParts = new Intl.DateTimeFormat('en-GB', {
      ...options,
      second: '2-digit'
    }).formatToParts(now);

    const hours = parseInt(timeParts.find(p => p.type === 'hour')?.value || '16', 10);
    const minutes = parseInt(timeParts.find(p => p.type === 'minute')?.value || '49', 10);
    const seconds = parseInt(timeParts.find(p => p.type === 'second')?.value || '0', 10);

    const timeStr = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

    if (headerTimeEl) {
      headerTimeEl.textContent = timeStr;
    }
    if (footerTimeEl) {
      footerTimeEl.textContent = `${timeStr} PORTUGAL (GMT+0)`;
    }
    if (heroTimeEl) {
      heroTimeEl.textContent = timeStr;
    }

    // Rotate analog hands in architectural clock
    if (hourHand) {
      const hourDeg = (hours % 12 + minutes / 60) * 30;
      hourHand.style.transform = `rotate(${hourDeg}deg)`;
    }
    if (minHand) {
      const minDeg = (minutes + seconds / 60) * 6;
      minHand.style.transform = `rotate(${minDeg}deg)`;
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
}

/**
 * 2. Areas of Expertise Carousel
 */
function initExpertiseCarousel() {
  const viewport = document.getElementById('expertise-viewport');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  const dotBtns = document.querySelectorAll('.dot-btn');
  const cards = document.querySelectorAll('.expertise-card');

  if (!viewport || !cards.length) return;

  const totalCards = cards.length;
  let currentIndex = 0;

  function getMaxScrollLeft() {
    return Math.max(0, viewport.scrollWidth - viewport.clientWidth);
  }

  function updateActiveState(index) {
    const maxScroll = getMaxScrollLeft();
    const isAtEnd = maxScroll > 0 && viewport.scrollLeft >= maxScroll - 15;

    if (isAtEnd) {
      currentIndex = totalCards - 1;
    } else {
      currentIndex = Math.max(0, Math.min(index, totalCards - 1));
    }

    dotBtns.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  }

  function scrollToIndex(index) {
    const maxScroll = getMaxScrollLeft();
    if (index >= totalCards - 1) {
      viewport.scrollTo({ left: maxScroll, behavior: 'smooth' });
      updateActiveState(totalCards - 1);
      return;
    }
    if (index <= 0) {
      viewport.scrollTo({ left: 0, behavior: 'smooth' });
      updateActiveState(0);
      return;
    }

    if (cards[index]) {
      const targetLeft = Math.min(cards[index].offsetLeft - viewport.offsetLeft, maxScroll);
      viewport.scrollTo({
        left: targetLeft,
        behavior: 'smooth'
      });
      updateActiveState(index);
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const maxScroll = getMaxScrollLeft();
      if (viewport.scrollLeft <= 15) {
        viewport.scrollTo({ left: maxScroll, behavior: 'smooth' });
      } else {
        scrollToIndex(Math.max(0, currentIndex - 1));
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const maxScroll = getMaxScrollLeft();
      if (viewport.scrollLeft >= maxScroll - 15) {
        scrollToIndex(0);
      } else {
        scrollToIndex(currentIndex + 1);
      }
    });
  }

  dotBtns.forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index') || '0', 10);
      scrollToIndex(idx);
    });
  });

  // Track scroll position via scroll listener with debounce
  let scrollTimeout;
  viewport.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const scrollLeft = viewport.scrollLeft;
      const maxScroll = getMaxScrollLeft();

      if (maxScroll > 0 && scrollLeft >= maxScroll - 15) {
        updateActiveState(totalCards - 1);
        return;
      }

      let closestIdx = 0;
      let minDiff = Infinity;
      cards.forEach((card, idx) => {
        const diff = Math.abs((card.offsetLeft - viewport.offsetLeft) - scrollLeft);
        if (diff < minDiff) {
          minDiff = diff;
          closestIdx = idx;
        }
      });
      updateActiveState(closestIdx);
    }, 50);
  }, { passive: true });
}

/**
 * 3. Inquiry Form Handler
 */
function initInquiryForm() {
  const form = document.getElementById('inquiry-form');
  const feedback = document.getElementById('form-feedback');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.submit-btn');
    if (btn) btn.disabled = true;

    if (feedback) {
      feedback.style.color = '#e5a83b';
      feedback.textContent = 'TRANSMITTING PARAMETERS TO STUDIO ARCHIVES...';
    }

    setTimeout(() => {
      if (feedback) {
        feedback.style.color = '#34d399';
        feedback.textContent = '✓ TRANSMISSION CONFIRMED. A PRINCIPAL WILL INITIATE CONTACT WITHIN 24 HOURS.';
      }
      form.reset();
      if (btn) btn.disabled = false;
    }, 900);
  });
}

/**
 * 4. Hero Video Engine & Interactive Controls
 */
function initHeroVideo() {
  const video = document.getElementById('hero-bg-video');
  const badge = document.getElementById('video-status-badge');
  const soundBtn = document.getElementById('btn-video-sound');
  const soundIcon = document.getElementById('sound-icon');
  const playBtn = document.getElementById('btn-video-play');
  const playIcon = document.getElementById('play-icon');
  const heroStage = document.getElementById('hero-stage-container');

  if (!video) return;

  function markVideoActive() {
    video.classList.add('is-playing');
    if (badge) badge.classList.add('is-hidden');
  }

  video.addEventListener('playing', markVideoActive);
  video.addEventListener('loadeddata', () => {
    if (video.readyState >= 2) {
      markVideoActive();
    }
  });

  // Check if already playing
  if (!video.paused && video.readyState >= 2) {
    markVideoActive();
  }

  // Sound Toggle (Unmute / Mute)
  if (soundBtn && soundIcon) {
    soundBtn.addEventListener('click', () => {
      video.muted = !video.muted;
      soundIcon.textContent = video.muted ? 'UNMUTE' : 'MUTE';
      soundBtn.style.color = video.muted ? '#cbd5e1' : '#e5a83b';
      soundBtn.style.borderColor = video.muted ? 'rgba(255, 255, 255, 0.1)' : '#e5a83b';
    });
  }

  // Play / Pause Toggle
  if (playBtn && playIcon) {
    playBtn.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        playIcon.textContent = 'PAUSE';
      } else {
        video.pause();
        playIcon.textContent = 'PLAY';
      }
    });
  }

  // Drag & Drop Direct Video File Support
  if (heroStage) {
    ['dragenter', 'dragover'].forEach(name => {
      heroStage.addEventListener(name, (e) => {
        e.preventDefault();
        e.stopPropagation();
        heroStage.style.borderColor = '#e5a83b';
        heroStage.style.boxShadow = '0 0 50px rgba(229, 168, 59, 0.4)';
      });
    });

    ['dragleave', 'drop'].forEach(name => {
      heroStage.addEventListener(name, (e) => {
        e.preventDefault();
        e.stopPropagation();
        heroStage.style.borderColor = 'rgba(255, 255, 255, 0.08)';
        heroStage.style.boxShadow = '';
      });
    });

    heroStage.addEventListener('drop', (e) => {
      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        const file = files[0];
        if (file.type.startsWith('video/') || /\.(mp4|webm|mov|mkv)$/i.test(file.name)) {
          const videoUrl = URL.createObjectURL(file);
          video.src = videoUrl;
          video.play().then(() => {
            markVideoActive();
          }).catch(err => console.log('Autoplay deferred:', err));
        }
      }
    });
  }

  // Periodic check if a video file has been dropped into folder
  let retryCount = 0;
  const pollInterval = setInterval(() => {
    if (video.classList.contains('is-playing')) {
      clearInterval(pollInterval);
      return;
    }
    retryCount++;
    if (retryCount > 60) {
      clearInterval(pollInterval);
      return;
    }
    const candidates = ['hero.mp4', '16338759_1280_720_30fps.mp4', 'video.mp4', 'bruto.mp4', 'hero-video.mp4'];
    const candidate = candidates[(retryCount - 1) % candidates.length];
    fetch(candidate, { method: 'HEAD' })
      .then(res => {
        if (res.ok && res.headers.get('content-type')?.includes('video')) {
          video.src = candidate;
          video.play().then(markVideoActive).catch(() => {});
          clearInterval(pollInterval);
        }
      })
      .catch(() => {});
  }, 4000);
}

console.log(
  '%c BRUTO %c Heavy-Duty Digital. Capabilities. Areas of Expertise. ',
  'background: #111; color: #fff; font-weight: 700; padding: 4px 8px; border-radius: 2px 0 0 2px;',
  'background: #c4892c; color: #111; font-weight: 700; padding: 4px 8px; border-radius: 0 2px 2px 0;'
);
