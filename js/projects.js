// js/projects.js
(() => {
  if (!window.PortfolioModal) return;

  // ===== 기술명 → 아이콘 경로 매핑 =====
  const TECH_ICON = {
    // SVG
    "Spring Boot": "images/svgs/SpringBoot.svg",
    CSS3: "images/svgs/CSS3.svg",
    Git: "images/svgs/Git.svg",
    MySQL: "images/svgs/Mysql.svg",
    Python: "images/svgs/Python.svg",
    "Visual Studio Code": "images/svgs/Visualstudio_code.svg",

    // JPG (공백/언더스코어 주의)
    AWS: "images/AWS.jpg",
    Docker: "images/Docker.jpg",
    "Docker Hub": "images/Docker Hub.jpg",
    GitHub: "images/GitHub.jpg",
    "GitHub Pages": "images/GitHubPages.jpg",
    HTML5: "images/HTML5.jpg",
    IntelliJ: "images/IntelliJ.jpg",
    Java: "images/Java.jpg",
    JavaScript: "images/JavaScript.jpg",
    "JPA/Hibernate": "images/JPA_Hibernate.jpg",
    "Next.js": "images/Next.jpg",
    React: "images/React.jpg",
    "REST API": "images/REST_API.jpg",
    TypeScript: "images/TypeScript.jpg",
    "YOLO API": "images/YOLO_API.jpg",
    "Tmap API": "images/TmapAPI.jpg",
  };

  // URL 세그먼트 안전 처리 (공백 등)
  function encodeSrc(src) {
    return src
      .split("/")
      .map((s) => encodeURIComponent(s))
      .join("/");
  }

  // 공통 리스트 렌더
  function toList(items) {
    if (!items || !items.length) return "<em>내용 없음</em>";
    return `<ul>${items.map((x) => `<li>${x}</li>`).join("")}</ul>`;
  }

  // 사용 기술: 아이콘 그리드 렌더
  function toTechIcons(techArr) {
    if (!techArr || !techArr.length) return "<em>내용 없음</em>";
    const items = techArr
      .map((name) => {
        const path = TECH_ICON[name] || "";
        const safe = path ? encodeSrc(path) : "";
        const img = safe
          ? `<img src="${safe}" alt="${name}" loading="lazy" decoding="async" />`
          : `<span class="tech-fallback" aria-hidden="true">🔧</span>`;
        return `
        <li class="tech-item" title="${name}">
          <div class="tech-icon">${img}</div>
          <div class="tech-label">${name}</div>
        </li>
      `;
      })
      .join("");
    return `<ul class="tech-grid">${items}</ul>`;
  }

  const P = {
    jyh: {
      title: "jyh.koreait.xyz",
      link: "http://jyh.koreait.xyz",
      img: "images/project_jyh.jpg",
      status: "improvement",
      tech: [
        "Spring Boot",
        "HTML5",
        "CSS3",
        "MySQL",
        "JPA/Hibernate",
        "REST API",
        "Docker",
        "Docker Hub",
        "AWS",
      ],
      features: ["카카오 로그인 서비스", "머신러닝 기반 당뇨병 검사"],
      responsibility: ["개인 프로젝트"],
      period: "2025-05 ~",
      oneLine: "유저 접근성 개선중",
      repos: [
        {
          name: "secondhand_jpa",
          type: "BE",
          url: "https://github.com/juyonghyeon/secondhand_jpa",
        },
      ],
    },
    addrawing: {
      title: "adddrawing.koreait.xyz",
      link: "http://adddrawing.koreait.xyz",
      img: "images/project_addrawing.jpg",
      status: "improvement",
      tech: [
        "React",
        "JavaScript",
        "Java",
        "Python",
        "Spring Boot",
        "Docker",
        "Docker Hub",
        "AWS",
      ],
      features: [
        "사용자가 제시된 주제에 맞춰 그림을 그리고, 해당 주제와의 유사도를 확인할 수 있음",
        "그림 유사도 판별을 위한 AI 서버를 Flask로 구축하여 제공 (현재 개선 중)",
      ],
      problemSolving: ["AI 서버 응답 속도가 매우 느려 현재 개선 중."],
      responsibility: ["개인 프로젝트"],
      period: "2025-06 ~",
      oneLine: "AI 서버 개선중",
      repos: [
        {
          name: "addrawing-front",
          type: "FE",
          url: "https://github.com/juyonghyeon/quick_draw_fe",
        },
      ],
    },
    maengle: {
      title: "maengle.xyz",
      link: "http://maengle.xyz",
      img: "images/project_maengle.jpg",
      status: "operate",
      tech: [
        "Spring Boot",
        "HTML5",
        "CSS3",
        "MySQL",
        "JPA/Hibernate",
        "Python",
        "Docker",
        "AWS",
      ],
      features: [
        "회원: 챗봇과 대화, 게시글 작성, 마이페이지 이용",
        "관리자: 회원 관리, 게시판 관리, 모델(상품) 관리",
        "마이페이지에서 본인 게시글 확인 및 최근 작성글 5개 열람 가능",
        "개발자가 등록한 챗봇 모델을 기반으로, 관리자는 이미지를 추가해 서비스 형태로 제공 가능",
      ],
      problemSolving: [
        "프로필 이미지 삭제 후 재등록이 되지 않던 문제를 JS로 버튼/상태를 동적으로 관리해 해결(등록·삭제 토글, 유효성 처리)",
        "AI 서버의 높은 리소스 요구로 AWS 단독 배포가 어려워 내부 서버 포트포워딩(리버스 프록시)으로 서비스 연결",
      ],
      responsibility: ["마이페이지", "챗봇도메인"],
      period: "2025-07 ~ 2025-08",
      oneLine: "회원/관리자 기능 제공 커뮤니티 서비스",
      repos: [
        {
          name: "maengle-front",
          type: "FE",
          url: "https://github.com/Team2-chatBoard/chatboard",
        },
      ],
    },
    chulfudoc: {
      title: "chulfudoc.xyz",
      link: "http://chulfudoc.xyz",
      img: "images/project_chulfudoc.jpg",
      status: "operate",
      tech: [
        "React",
        "Next.js",
        "TypeScript",
        "CSS3",
        "Spring Boot",
        "JPA/Hibernate",
        "REST API",
        "MySQL",
        "Java",
        "Python",
        "Docker",
        "AWS",
        "YOLO API",
        "Tmap API",
      ],
      features: [
        "AI 쓰러짐 감지",
        "응급의료기관 정보 제공 (지도 기반: 자동 안내 / 검색 / 마커 클릭)",
        "자동 안내: AI가 1초 단위로 쓰러짐을 감지하고, 10초 안에 5회 감지되면 가장 가까운 응급의료기관 5곳의 지도 위치와 목록 정보를 제공",
        "검색: 지도 또는 목록을 통해 원하는 응급의료기관 위치 검색 가능",
        "마커 클릭: 지도 마커를 클릭하면 해당 응급의료기관의 세부 정보 제공",
        "Tmap API를 활용해 현위치부터 응급의료기관까지의 실제 경로, 차량 예상 시간, 거리 제공",
        "커뮤니티 게시판",
      ],
      problemSolving: [
        "Tmap API가 document.write 기반 로더(Kakaomap과 상이)라서, appkey를 script 태그로 정적 삽입하고 initMap에서 지도/마커를 생성하도록 구조 변경",
        "Tmap API 일일 1,000회 호출 제한 대응: Haversine으로 직선거리 상위 20곳 선필터링 → 경로 API로 최종 5곳 산출(호출량 절감)",
        "초기 렌더에서 폴리라인 누락 이슈를 지연 렌더·재그리기로 해결",
        "모달 오픈 시 바디 스크롤 잠금과 포커스 트랩 적용으로 접근성 개선",
      ],
      responsibility: [
        "쓰러짐 감지 후 응급 상황 처리",
        "Tmap API 기반 응급의료기관 위치 안내",
      ],
      period: "2025-08 ~ 2025-09",
      oneLine: "AI 쓰러짐 감지 & 응급실 정보 제공",
      repos: [
        {
          name: "chulfudoc-front",
          type: "FE",
          url: "https://github.com/koreait1/chulfudoc-front",
        },
        {
          name: "chulfudoc-api",
          type: "BE",
          url: "https://github.com/koreait1/chulfudoc-api",
        },
        {
          name: "chulfudoc-ml",
          type: "BE",
          url: "https://github.com/koreait1/chulfudoc-ml",
        },
      ],
    },
  };

  // ★ GitHub 레포 리스트 렌더
  function toRepoList(repos) {
    if (!repos || !repos.length) return "";
    return `
      <ul class="repo-list">
        ${repos
          .map(
            (r) => `
          <li>
            <a href="${r.url}" target="_blank" rel="noopener" class="repo-link">
              <span class="repo-pill ${r.type || "ETC"}">${
              r.type || "ETC"
            }</span>
              <span class="repo-name">${r.name}</span>
            </a>
          </li>
        `
          )
          .join("")}
      </ul>
    `;
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

    // 텍스트 링크 → 이미지 앵커로 교체 (이미지 없으면 텍스트로 폴백)
    const linkBlock = d.img
      ? `
        <a class="modal-shot-link" href="${
          d.link
        }" target="_blank" rel="noopener" aria-label="${
          d.title
        } 새 창에서 열기">
          <img class="modal-shot" src="${encodeSrc(d.img)}" alt="${
          d.title
        } 미리보기 이미지" />
        </a>
      `
      : `
        <a class="modal-text-link" href="${d.link}" target="_blank" rel="noopener">${d.link}</a>
      `;

    const html = `
      <h3 class="modal-title">${d.title}</h3>

      <div class="modal-link">
        ${linkBlock}
      </div>

      <div class="modal-grid">
        <div>
          ${section("fa-solid fa-list-check", "주요 기능", toList(d.features))}
          ${
            d.responsibility?.length
              ? section(
                  "fa-solid fa-user-gear",
                  "담당 업무",
                  toList(d.responsibility)
                )
              : ""
          }
          ${
            d.problemSolving?.length
              ? section(
                  "fa-solid fa-screwdriver-wrench",
                  "문제 해결 사례",
                  toList(d.problemSolving)
                )
              : ""
          }
          ${section("fa-solid fa-code", "사용 기술", toTechIcons(d.tech))}
          ${section(
            "fa-regular fa-calendar-days",
            "개발 기간",
            `<p class="mono">${d.period}</p><br />`
          )}
          ${
            d.repos?.length
              ? section("fa-brands fa-github", "GitHub", toRepoList(d.repos))
              : ""
          }
        </div>
      </div>
    `;

    window.PortfolioModal.open(html);
  }

  // 헬퍼: 프로젝트 row에서 key 얻기
  function getKeyFromEl(el) {
    return el?.closest(".project-row")?.dataset?.key || null;
  }

  // ❶ 클릭: 왼쪽 소개 카드 어디를 클릭해도 모달 열기 (내부 링크 이동 금지)
  document.addEventListener("click", (e) => {
    const brief = e.target.closest(".proj-brief");
    if (brief) {
      const key = getKeyFromEl(brief);
      if (key) {
        if (e.target.closest("a")) e.preventDefault(); // 카드 내부 링크도 이동 대신 모달
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
  document.addEventListener("keydown", (e) => {
    const brief = e.target.closest(".proj-brief");
    if (!brief) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const key = getKeyFromEl(brief);
      if (key) openModal(key);
    }
  });
})();
