// modal.js
function setInertAllExcept(el) {
  const keep = new Set([el, ...el.querySelectorAll('*')]);
  const roots = Array.from(document.body.children);
  roots.forEach(node => { if (!keep.has(node)) node.setAttribute('inert', ''); });
}
function clearInert() {
  Array.from(document.querySelectorAll('[inert]')).forEach(n => n.removeAttribute('inert'));
}
function getFocusable(container) {
  return Array.from(container.querySelectorAll(
    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
  )).filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));
}

// 🔒 스크롤 잠금(스크롤바 폭 보정 + iOS 터치 차단)
function lockScroll(lock) {
  const sbw = window.innerWidth - document.documentElement.clientWidth;
  if (lock) {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    if (sbw > 0) {
      document.documentElement.style.paddingRight = sbw + 'px';
      document.body.style.paddingRight = sbw + 'px';
    }
    document.addEventListener('touchmove', preventTouch, { passive: false });
  } else {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.documentElement.style.paddingRight = '';
    document.body.style.paddingRight = '';
    document.removeEventListener('touchmove', preventTouch);
  }
}
function preventTouch(e){ e.preventDefault(); }

(() => {
  const root = document.getElementById('modal-root');
  if (!root) return;

  let lastFocus = null;
  let removeTrapTab = null; // 👈 trapTab 해제용 저장

  function ensureRootFixed() {
    Object.assign(root.style, { position: 'fixed', inset: '0', zIndex: '10000' });
  }

  function openModal(html) {
    lastFocus = document.activeElement;
    ensureRootFixed();
    lockScroll(true);                // ✅ 스크롤 잠금

    root.innerHTML = `
      <div class="modal-backdrop" data-close="1" aria-hidden="false" style="position:fixed;inset:0;">
        <div class="modal" role="dialog" aria-modal="true" aria-label="상세 보기">
          <button class="modal-close" data-close="1" aria-label="닫기">×</button>
          <div class="modal-body">${html}</div>
        </div>
      </div>`;
    root.hidden = false;

    const backdrop = root.querySelector('.modal-backdrop');
    const dialog   = root.querySelector('.modal');

    // inert + 포커스 트랩
    setInertAllExcept(root);
    const focusables = getFocusable(dialog);
    const first = focusables[0] || dialog;
    const last  = focusables[focusables.length - 1] || dialog;
    first.focus();

    function trapTab(e) {
      if (e.key !== 'Tab') return;
      if (focusables.length === 0) { e.preventDefault(); return; }
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    document.addEventListener('keydown', trapTab);
    removeTrapTab = () => document.removeEventListener('keydown', trapTab); // 👈 저장

    // ESC / 백드롭 닫기
    document.addEventListener('keydown', onKeydown);
    backdrop.addEventListener('click', (e) => { if (e.target.dataset.close === '1') closeModal(); });
    dialog.addEventListener('click', (e) => e.stopPropagation()); // 내부 클릭은 닫힘 방지
  }

  function closeModal() {
    // 🔽 먼저 핸들러 해제
    document.removeEventListener('keydown', onKeydown);
    if (removeTrapTab) { removeTrapTab(); removeTrapTab = null; }
    clearInert();
    lockScroll(false);

    // DOM 정리 (이제 비워도 안전)
    root.hidden = true;
    root.innerHTML = '';

    // 포커스 복귀
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    lastFocus = null;
  }

  function onKeydown(e) { if (e.key === 'Escape') closeModal(); }

  window.PortfolioModal = { open: openModal, close: closeModal };
})();
