(() => {
  const background = document.querySelector('.tech-background');
  const hero = document.querySelector('.hero');
  const toggle = document.querySelector('.motion-toggle');
  let choice = null;
  try { choice = localStorage.getItem('portfolio-motion'); } catch (e) {}
  let paused = choice === 'paused';
  let queued = false;
  const updateButton = () => {
    document.body.classList.toggle('motion-paused', paused);
    document.body.classList.toggle('motion-enabled', !paused);
    toggle.setAttribute('aria-pressed', String(paused));
    const ar = document.documentElement.lang === 'ar';
    toggle.textContent = ar ? (paused ? 'استئناف حركة الخلفية ▷' : 'إيقاف حركة الخلفية Ⅱ') : (paused ? 'Resume background motion ▷' : 'Pause background motion Ⅱ');
    toggle.disabled = false;
  };
  const updateScroll = () => {
    const bounds = hero.getBoundingClientRect();
    const distance = Math.max(300, bounds.height * .85);
    const progress = Math.min(1, Math.max(0, window.scrollY / distance));
    background.style.opacity = String(1 - progress);
    document.body.classList.toggle('background-offscreen', progress === 1 || document.hidden);
    queued = false;
  };
  const requestUpdate = () => {
    if (!queued) { queued = true; requestAnimationFrame(updateScroll); }
  };
  toggle.addEventListener('click', () => {
    paused = !paused;
    choice = paused ? 'paused' : 'running';
    try { localStorage.setItem('portfolio-motion', choice); } catch (e) {}
    updateButton(); requestUpdate();
  });
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });
  window.addEventListener('pageshow', requestUpdate);
  document.addEventListener('visibilitychange', requestUpdate);
  document.addEventListener('languagechange', () => { updateButton(); requestUpdate(); });
  updateButton(); updateScroll();
})();
