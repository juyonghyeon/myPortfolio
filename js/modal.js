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

// 🔒 스크롤 잠금 (rAF 복원 + iOS 터치 차단)
let __locked = false;
let __scrollY = 0;
let __prevScrollBehavior = '';
function lockScroll(lock) {
  const sbw = window.innerWidth - document.documentElement.clientWidth;

  if (lock && !__locked) {
    __locked = true;
    __prevScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';

    __scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;

    document.body.style.position = 'fixed';
    document.body.style.top = `-${__scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    if (sbw > 0) document.body.style.paddingRight = sbw + 'px';

    document.addEventListener('touchmove', preventTouch, { passive: false });
    return;
  }

  if (!lock && __locked) {
    document.removeEventListener('touchmove', preventTouch);

    // body.style.top에서 실제 값 추출
    const y = Math.abs(parseInt(document.body.style.top || '0', 10)) || __scrollY;

    // 고정 해제
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    document.body.style.paddingRight = '';

    // 레이아웃 해제 → 다음 프레임에 복원
    requestAnimationFrame(() => {
      window.scrollTo(0, y);
      document.documentElement.style.scrollBehavior = __prevScrollBehavior || '';
      __locked = false;
    });
  }
}
function preventTouch(e){ e.preventDefault(); }

(() => {
  const root = document.getElementById('modal-root');
  if (!root) return;

  let lastFocus = null;
  let removeTrapTab = null;
  let removeCaptureClose = null;

  function ensureRootFixed() {
    Object.assign(root.style, { position: 'fixed', inset: '0', zIndex: '10000' });
  }

  function openModal(html) {
    lastFocus = document.activeElement;
    ensureRootFixed();
    lockScroll(true);

    root.innerHTML = `
      <div class="modal-backdrop" aria-hidden="false" style="position:fixed;inset:0;">
        <div class="modal" role="dialog" aria-modal="true" aria-label="상세 보기">
          <button class="modal-close" aria-label="닫기">×</button>
          <div class="modal-body">${html}</div>
        </div>
      </div>`;
    root.hidden = false;

    const backdrop = root.querySelector('.modal-backdrop');
    const dialog   = root.querySelector('.modal');

    // ✅ 닫기(버튼/백드롭) — 내부 클릭은 닫히지 않도록 정확히 판별
    function onCaptureClose(e) {
      // 백드롭 "자체"를 클릭했을 때만
      if (e.target === backdrop) {
        e.preventDefault();
        closeModal();
        return;
      }
      // 닫기 버튼 클릭
      if (e.target.closest('.modal-close')) {
        e.preventDefault();
        closeModal();
      }
    }
    root.addEventListener('click', onCaptureClose, { capture: true });
    removeCaptureClose = () => root.removeEventListener('click', onCaptureClose, true);

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
    removeTrapTab = () => document.removeEventListener('keydown', trapTab);

    // ESC 닫기
    document.addEventListener('keydown', onKeydown);
  }

  function closeModal() {
    document.removeEventListener('keydown', onKeydown);
    if (removeTrapTab) { removeTrapTab(); removeTrapTab = null; }
    if (removeCaptureClose) { removeCaptureClose(); removeCaptureClose = null; }

    clearInert();

    root.hidden = true;
    root.innerHTML = '';

    lockScroll(false); // ← rAF로 다음 프레임에 원래 위치 복원

    // 포커스 복귀
    if (lastFocus) {
      try {
        const brief = lastFocus.closest?.('.proj-brief');
        if (brief && typeof brief.blur === 'function') brief.blur();
        else if (typeof lastFocus.focus === 'function') lastFocus.focus();
      } catch(_) {}
      lastFocus = null;
    }
  }

  function onKeydown(e) { if (e.key === 'Escape') closeModal(); }

  window.PortfolioModal = { open: openModal, close: closeModal };
})();
