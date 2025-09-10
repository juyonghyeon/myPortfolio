// js/skill.js
(() => {
  const detail = document.getElementById('skill-detail');
  const container = document.querySelector('.stack-logos');
  if (!detail || !container) return;

  // 주신 텍스트 그대로 구성 (오탈자 1곳: "공공통" -> "공통"으로만 수정)
  const data = {
    "React": {
      "이해": "리액트의 문법을 이해하고, 컴포넌트를 적절히 컨테이너화하여 구조적으로 작성할 수 있다.",
      "활용": "useState, useEffect, useCallback 등 다양한 훅을 활용해 동적인 기능을 구현할 수 있다."
    },
    "Next.js": {
      "이해": "SSR과 CSR의 차이를 이해하고, 상황에 맞게 적절히 적용할 수 있다.",
      "활용": "타입스크립트 문법을 준수하여 컴포넌트를 작성하고, 이를 제어하는 컨테이너를 구성할 수 있다."
    },
    "JavaScript": {
      "이해": "비동기 처리 방식을 이해하고, 이를 기반으로 자바스크립트 코드를 작성할 수 있다.",
      "활용": "HTML 기반 웹페이지에서 모달 창과 같은 인터랙티브 기능을 구현할 수 있다."
    },
    "TypeScript": {
      "이해": "타입 선언을 강조하는 자바스크립트로 인식하고, 문법에 맞게 코드를 작성할 수 있다.",
      "활용": "Tmap API를 활용해 지도를 표시하고, 실제 차량 경로와 인포윈도우를 제공할 수 있다."
    },
    "HTML5": {
      "이해": "HTML 코드를 작성하고, JavaScript 및 CSS 파일과 연결해 사용할 수 있다.",
      "활용": "타임리프(Thymeleaf)를 활용하여 동적인 웹페이지를 구성할 수 있다."
    },
    "CSS3": {
      "이해": "다양한 선택자를 이해하고, 이를 활용해 스타일링 작업을 할 수 있다.",
      "활용": "HTML로 구성한 페이지를 hover, active, cursor 등의 기능으로 시각적으로 개선할 수 있다."
    },
    "Java": {
      "이해": "객체지향 언어임을 이해하고 클래스를 구성할 수 있다.",
      "활용": "스프링 프레임워크와 스프링 부트를 활용하여 효율적으로 기능을 구현할 수 있다."
    },
    "Python": {
      "이해": "동적 타입 언어의 특성을 인지하고, 상황에 맞게 코드를 작성할 수 있다.",
      "활용": "PyTorch와 TensorFlow를 활용하여 머신러닝 및 딥러닝 학습 모델을 구현하였다."
    },
    "Spring Boot": {
      "이해": "객체지향 설계 원칙(SOLID)을 이해하고, 의존성을 주입하여 코드를 작성할 수 있다.",
      "활용": "공통 기능을 정의하고 서비스를 구성한 뒤, 컨트롤러를 통해 애플리케이션 흐름을 제어하였다."
    },
    "JPA/Hibernate": {
      "이해": "ORM(Object Relational Mapping) 개념을 이해하고, 엔티티와 데이터베이스를 매핑할 수 있다.",
      "활용": "JPA/Hibernate를 활용하여 CRUD 기능을 구현할 수 있다."
    },
    "REST API": {
      "이해": "REST 아키텍처 스타일을 기반으로, 자원(Resource)을 URI로 표현하고 HTTP 메서드를 활용해 클라이언트와 서버 간 데이터를 주고받을 수 있다.",
      "활용": "회원, 게시판, 파일 등의 데이터를 주고받는 API를 설계하고 구현하여 프론트엔드와 서버 간 통신을 구현하였다."
    },
    "MySQL": {
      "이해": "관계형 데이터베이스의 구조를 이해하고, 기본 SQL 문법을 작성할 수 있다.",
      "활용": "MySQL을 활용하여 테이블을 설계하고, 데이터를 저장하고 회원 상태를 수정하였다."
    },
    "AWS": {
      "이해": "클라우드 환경에서 인스턴스, 스토리지, 네트워크 등의 리소스를 제공하는 AWS의 개념을 이해하고, EC2를 활용해 우분투 기반의 작업 환경을 구성할 수 있다.",
      "활용": "EC2 인스턴스에 애플리케이션을 배포하고, PM2를 이용해 Node.js 서버를 프로세스 관리하며 무중단 실행 환경을 구축하였다."
    },
    "GitHub Pages": {
      "이해": "정적 웹사이트 호스팅의 개념을 이해할 수 있다.",
      "활용": "GitHub Pages를 활용하여 포트폴리오 페이지를 배포하였다."
    },
    "Docker": {
      "이해": "컨테이너 기반 가상화 기술의 개념을 이해하고, 애플리케이션을 이미지로 패키징하여 이식성과 확장성을 확보할 수 있다.",
      "활용": "Docker Desktop 환경에서 MySQL 컨테이너를 실행하여 개발 환경을 구축하였다. 우분투 기반 Docker 이미지를 빌드하여 애플리케이션을 컨테이너화하고, 실행 환경을 일관되게 유지하면서 배포하였다."
    },
    "Docker Hub": {
      "이해": "컨테이너 이미지를 공유 및 배포하는 레지스트리의 개념을 이해하였다.",
      "활용": "Docker Hub를 통해 빌드한 이미지를 업로드하고, 서버에서 가져와 실행하였다."
    },
    "Git": {
      "이해": "분산 버전 관리 시스템의 개념을 이해하고, 브랜치 전략을 사용할 수 있다.",
      "활용": "Git을 활용하여 코드 버전 관리, 브랜치 생성, 병합 등을 수행하였다."
    },
    "GitHub": {
      "이해": "Git 원격 저장소의 역할을 이해하고, 협업 도구로 활용할 수 있다.",
      "활용": "GitHub을 통해 프로젝트를 관리하고, 브랜치 정책과 PR 리뷰 프로세스를 적용하여 안정적인 협업 환경을 구축하였다."
    },
    "VSCode": {
      "이해": "가볍고 빠른 개발 도구임을 이해하고, 다양한 확장 기능을 설치해 활용할 수 있다.",
      "활용": "VSCode를 활용해 AI 서버를 구축하고, 이를 연계하여 React와 Next.js 기반의 프로젝트를 개발하였다."
    },
    "IntelliJ": {
      "이해": "자바와 스프링 개발에 잘 맞는 개발 도구임을 이해하고 사용할 수 있다.",
      "활용": "IntelliJ에서 Gradle을 사용해 Spring Boot 프로젝트를 개발하고 테스트하였다."
    },
    "YOLO API": {
      "이해": "객체 탐지(Object Detection) 알고리즘의 기본 원리를 이해하였다.",
      "활용": "YOLO API를 활용하여 낙상 감지 모델을 구현하고, 웹캠 기반 실시간 예측을 수행하였다."
    },
    "Tmap API": {
      "이해": "Tmap API의 기본 원리를 이해하고, 위치 기반 서비스 구현에 활용할 수 있다.",
      "활용": "Tmap API를 활용하여 지도 표시, 경로 탐색, 병원 위치 마커 및 인포윈도우 기능을 구현하였다."
    }
  };

  function render(skill) {
    const item = data[skill];
    detail.innerHTML = item ? `
      <div class="skill-detail-card">
        <h4>${skill}</h4>
        <ul>
          <li><strong>이해</strong> – ${item["이해"]}</li>
          <li><strong>활용</strong> – ${item["활용"]}</li>
        </ul>
      </div>
    ` : `
      <div class="skill-detail-card">
        <h4>${skill}</h4>
        <p>준비된 설명이 없습니다.</p>
      </div>
    `;
    detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // 클릭/키보드 접근성
  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.skill');
    if (!btn) return;
    const skill = btn.dataset.skill;
    render(skill);
  });
  container.addEventListener('keydown', (e) => {
    const btn = e.target.closest('.skill');
    if (!btn) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      render(btn.dataset.skill);
    }
  });

  // 초기값 자동 표시를 원하면 주석 해제
  // render("JavaScript");
})();
