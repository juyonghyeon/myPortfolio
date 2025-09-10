// js/projects.js
(() => {
  if (!window.PortfolioModal) return;

  const P = {
    jyh: {
      title: "jyh.koreait.xyz",
      link: "http://jyh.koreait.xyz",
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

    const html = `
      <h3 class="modal-title">${d.title}
        <small style="font-weight:500; margin-left:8px; color:${d.status === '운영중' ? '#2563eb' : '#f59e0b'}">(${d.status})</small>
      </h3>
      <p class="modal-link"><a href="${d.link}" target="_blank" rel="noopener">${d.link}</a></p>
      <div class="modal-grid">
        <div>
          <h4>사용 기술</h4>
          ${toList(d.tech)}
          <h4>주요 기능</h4>
          ${toList(d.features)}
          ${d.responsibility?.length ? `<h4>담당 업무</h4>${toList(d.responsibility)}` : ""}
          <h4>개발 기간</h4>
          <p>${d.period}</p>
        </div>
      </div>
      <div class="modal-actions">
        <a class="btn primary" href="${d.link}" target="_blank" rel="noopener">메인 페이지 열기</a>
        <button class="btn" data-close="1">닫기</button>
      </div>
    `;
    window.PortfolioModal.open(html);
  }

  // 좌측 소개 카드 클릭/키보드
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-open]');
    if (btn) openModal(btn.dataset.open);
    const brief = e.target.closest('.proj-brief');
    if (brief && brief.parentElement?.dataset.key) {
      openModal(brief.parentElement.dataset.key);
    }
  });
  document.addEventListener('keydown', (e) => {
    const brief = e.target.closest('.proj-brief');
    if (!brief) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const key = brief.parentElement?.dataset.key;
      if (key) openModal(key);
    }
  });
})();
