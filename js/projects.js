// js/projects.js
(() => {
  if (!window.PortfolioModal) return;

  const P = {
    jyh: {
      title: "jyh.koreait.xyz",
      link: "http://jyh.koreait.xyz",
      img:  "images/project_jyh.jpg",              // ← 추가
      status: "개선중",
      tech: ["Spring Boot","HTML5","CSS3","MySQL","JPA/Hibernate","REST API","Docker","Docker Hub","AWS"],
      features: ["보류"],
      responsibility: ["보류"],
      period: "2025-05 ~",
      oneLine: "유저 접근성 개선중"
    },
    addrawing: {
      title: "adddrawing.koreait.xyz",
      link: "http://adddrawing.koreait.xyz",
      img:  "images/project_addrawing.jpg",        // ← 추가
      status: "개선중",
      tech: ["React","JavaScript","Java","Python","Spring Boot","Docker","Docker Hub","AWS"],
      features: ["사용자가 제시된 주제에 따라 그림을 그리고, 그림이 주제에 맞는지 유사도를 제공"],
      responsibility: [],
      period: "2025-06 ~",
      oneLine: "AI 서버 개선중"
    },
    maengle: {
      title: "maengle.xyz",
      link: "http://maengle.xyz",
      img:  "images/project_maengle.jpg",          // ← 추가
      status: "운영중",
      tech: ["Spring Boot","HTML5","CSS3","MySQL","JPA/Hibernate","Python","Docker","AWS"],
      features: [
        "회원 - 챗봇과의 대화, 게시글 작성, 마이페이지 이용",
        "관리자 - 회원 관리, 게시판 관리, 모델(상품) 관리"
      ],
      responsibility: ["마이페이지, 챗봇 서비스"],
      period: "2025-07 ~ 2025-08",
      oneLine: "회원/관리자 기능 제공 커뮤니티 서비스"
    },
    chulfudoc: {
      title: "chulfudoc.xyz",
      link: "http://chulfudoc.xyz",
      img:  "images/project_chulfudoc.jpg",        // ← 추가
      status: "운영중",
      tech: [
        "React","Next.js","TypeScript","CSS3","Spring Boot","JPA/Hibernate",
        "REST API","MySQL","Java","Python","Docker","AWS","YOLO API","Tmap API"
      ],
      features: ["AI 쓰러짐 감지","응급실 정보 제공","커뮤니티 게시판"],
      responsibility: ["쓰러짐 감지 후 응급 상황 처리","Tmap API 기반 응급의료기관 위치 안내"],
      period: "2025-08 ~ 2025-09",
      oneLine: "AI 쓰러짐 감지 & 응급실 정보 제공"
    }
  };

  function toList(items) {
    if (!items || !items.length) return "<em>내용 없음</em>";
    return `<ul>${items.map(x => `<li>${x}</li>`).join("")}</ul>`;
  }

  function openModal(key) {
    const d = P[key];
    if (!d) return;

    // 아이콘 있는 섹션 타이틀
    const section = (iconClass, label, bodyHTML) => `
      <h4 class="icon-title">
        <i class="${iconClass}" aria-hidden="true"></i>
        <span>${label}</span>
      </h4>
      ${bodyHTML}
    `;

    // ▼ 텍스트 링크 → 이미지 앵커로 교체 (이미지 없으면 텍스트로 폴백)
    const linkBlock = d.img
      ? `
        <a class="modal-shot-link" href="${d.link}" target="_blank" rel="noopener" aria-label="${d.title} 새 창에서 열기">
          <img class="modal-shot" src="${d.img}" alt="${d.title} 미리보기 이미지" />
        </a>
      `
      : `
        <a class="modal-text-link" href="${d.link}" target="_blank" rel="noopener">${d.link}</a>
      `;

    const html = `
      <h3 class="modal-title">${d.title}
        <small style="font-weight:500; margin-left:8px; color:${d.status === '운영중' ? '#2563eb' : '#f59e0b'}">(${d.status})</small>
      </h3>

      <div class="modal-link">
        ${linkBlock}
      </div>

      <div class="modal-grid">
        <div>
          ${section('fa-solid fa-code', '사용 기술', toList(d.tech))}
          ${section('fa-solid fa-list-check', '주요 기능', toList(d.features))}
          ${d.responsibility?.length ? section('fa-solid fa-user-gear', '담당 업무', toList(d.responsibility)) : ''}
          ${section('fa-regular fa-calendar-days', '개발 기간', `<p class="mono">${d.period}</p>`)}
        </div>
      </div>
    `;

    window.PortfolioModal.open(html);
  }


  // 헬퍼: 프로젝트 row에서 key 얻기
  function getKeyFromEl(el) {
    return el?.closest('.project-row')?.dataset?.key || null;
  }

  // ❶ 클릭: 왼쪽 소개 카드 어디를 클릭해도 모달 열기 (내부 링크 이동 금지)
  document.addEventListener('click', (e) => {
    const brief = e.target.closest('.proj-brief');
    if (brief) {
      const key = getKeyFromEl(brief);
      if (key) {
        if (e.target.closest('a')) e.preventDefault(); // 카드 내부 링크도 이동 대신 모달
        openModal(key);
        return;
      }
    }
    // (필요 시 우측 썸네일도 모달로 열고 싶으면 아래 주석 해제)
    // const shot = e.target.closest('.proj-shot');
    // if (shot) {
    //   const key = getKeyFromEl(shot);
    //   if (key) {
    //     e.preventDefault();
    //     openModal(key);
    //   }
    // }
  });

  // ❷ 키보드 접근성: 카드 포커스 상태에서 Enter/Space → 모달
  document.addEventListener('keydown', (e) => {
    const brief = e.target.closest('.proj-brief');
    if (!brief) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const key = getKeyFromEl(brief);
      if (key) openModal(key);
    }
  });
})();
