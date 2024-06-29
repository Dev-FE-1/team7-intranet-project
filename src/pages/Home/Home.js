export default function Home(root) {
  root.innerHTML = `<div class="home">
  <div class="home__firstLine">
    <div class="home__profileCard card">
      <div class="home__textBox">
        <div class="home__today">
          <p class="home__week">${getToday().week}</p>
          <p class="home__date">${getToday().today}</p>
        </div>
        <div class="home__welcome">
          <p class="home__greet">안녕하세요, OOO님!</p>
          <p class="home__goodDay">오늘도 좋은 하루 보내세요!</p>
        </div>
      </div>
      <div class="home__profileBox">
        <img class="home__profileImg" src="/public/profile-default-mint.png" alt="profile" />
        <span class="home__dept">OO부 OOO</span>
      </div>
    </div>
    <div class="home__workCard card card--fill">
      <div class="home__timeBox">
        <p class="home__time">00:00</p>
        <div class="home__timeText">
          <p class="home__now">현재 시간</p>
          <p class="home__second">:00</p>
        </div>
      </div>
      <div class="home__workBox">
        <div class="home__workInfo">
          <p class="home__workText">오늘은 아직 근무를 시작하지 않았어요.</p>
        </div>
        <button class="home__workBtn btn"><svg class="playIcon" width="20" height="20" viewBox="0 0 34 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.5 6.4248V23.9248L26.9688 15.1748L11.5 6.4248Z" fill="currentColor"/></svg>근무 시작</button>
      </div>
    </div>
  </div>
  <div class="home__secondLine">
    <div class="home__noticeListCard card">
      <div class="home__labelMore">
        <p class="home__noticeLabel">공지사항</p>
        <a class="home__moreNotice" href="/notice">더보기 ></a>
      </div>
      <div class="home__noticeList">

      </div>
    </div>
  </div>

  <div class="home__workModal modal modal--none">
      <div class="modal__bb"></div>
      <div class="modal__inner">
        <p class="modal__title">알 림</p>
        <div class="modal__content">
          <div class="home__modalText modal__contentText">
          <p class="home__workQuestion">
            근무를 시작하시겠습니까?
          </p>
        </div>
      </div>
      <div class="modal__btns">
        <button class="btn btn--light modalClose">취소</button>
        <button class="home__workConfirm btn modalClose">확인</button>
      </div>
    </div>
  </div>

  <div class="home__noticeModal modal modal--bgWhite modal--none"> 
        <div class="modal__bb"></div>
        <div class="home__noticeModalInner modal__inner">
          
        </div>
      </div>
</div>`;

  // 시간 데이터를 1초에 1번씩 실행
  setInterval(renderTime, 1000);
  renderTime();

  // 근무 시작/종료 확인 모달에 이벤트 적용
  document
    .querySelector('.home__workConfirm')
    .addEventListener('click', workModalBtnHandler);

  // 공지사항 목록 렌더링
  renderNotice();
}

// 시간 데이터를 현재 시간 카드에 렌더링하는 함수
const renderTime = () => {
  document.querySelector('.home__time').innerHTML = `${getTime().hour}:${
    getTime().minute
  }`;
  document.querySelector('.home__second').innerHTML = `:${getTime().second}`;
};

// 근무 상태에 맞게 카드 내용을 렌더링하는 함수
const renderWork = () => {
  if (work[0]) {
    document.querySelector('.home__workInfo').innerHTML = `
    <p class="home__workStatus"><span class="home__workEmoji">🧑‍💻</span> 근무 중</p>
    <p class="home__workText">${getTime().hour}:${
      getTime().minute
    }부터 진행 중</p>`;

    document.querySelector(
      '.home__workBtn'
    ).innerHTML = `<button class="home__workBtn btn">
    <svg
      class="home__workIcon"
      width="20"
      height="20"
      viewBox="0 0 30 30"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7.5 22.5V7.5H22.5V22.5H7.5Z" fill="currentColor" />
    </svg>
    근무 종료
  </button>`;
  } else {
    document.querySelector('.home__workInfo').innerHTML = `
    <p class="home__workText">오늘은 아직 근무를 시작하지 않았어요.</p>`;

    document.querySelector('.home__workBtn').innerHTML = `
    <button class="home__workBtn btn">
    <svg
      class="home__workIcon"
      width="20"
      height="20"
      viewBox="0 0 34 30"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.5 6.4248V23.9248L26.9688 15.1748L11.5 6.4248Z"
        fill="currentColor"
      />
    </svg>
    근무 시작
  </button>;
  `;
  }
};

// 근무 상태에 맞게 근무 확인 모달 내용을 렌더링하는 함수
const renderWorkModal = () => {
  document.querySelector('.home__modalText').innerHTML = work[0]
    ? `<p class="home__workQuestion">
            근무를 종료하시겠습니까?
          </p>`
    : `<p class="home__workQuestion">
            근무를 시작하시겠습니까?
          </p>`;
};

// 최근 공지사항 목록에 공지사항 카드를 렌더링하는 함수
const renderNotice = () => {
  document.querySelector('.home__noticeList').innerHTML = notices
    .map(
      (n) =>
        `<div class="home__noticeCard card card--img" data-id=${n.id}>
          <div class="home__noticeImg card__img">
            <img src="/public/temp-image.jpg" alt="notice" />
          </div>
            <div class="home__noticeTitle card__title">
              <p>공지입니다.</p>
            </div>
          </div>
      </div>`
    )
    .join('');

  const noticeCards = document.querySelectorAll('.home__noticeCard');

  noticeCards.forEach((noticeCard) => {
    noticeCard.addEventListener('click', (e) => {
      const cardId = e.currentTarget.getAttribute('data-id');
      const data = notices.find((el) => el.id == cardId);
      renderNoticeModal(data);
    });
  });
};

// 공지사항 모달 내용을 렌더링하는 함수
const renderNoticeModal = (data) => {
  document.querySelector('.home__noticeModalInner').innerHTML = `
    <div class="home__noticeModalBar">
      <p class="home__noticeModalTitle">${data.title}</p>
      <p class="home__noticeModalDate">${data.date}</p>
    </div>
    <div class="home__noticeModalContent modal__content">
      <div class="home__noticeModalImg">
      <img src="${data.imgs}" alt="${data.imgAlt}"/>
      </div>
      <div class="home__noticeModalText">${data.content}</div>
    </div>
    <button class="home__noticeModalBtn btn modalClose">닫기</button>
  `;
};

// 날짜, 요일 데이터를 반환하는 함수
const getToday = () => {
  const date = new Date();
  const weekArray = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];

  return {
    week: weekArray[date.getDay()],
    today: `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`,
  };
};

// 시간 데이터를 반환하는 함수
const getTime = () => {
  const now = new Date();
  const hour = now.getHours().toString().padStart(2, '0');
  const minute = now.getMinutes().toString().padStart(2, '0');
  const second = now.getSeconds().toString().padStart(2, '0');

  return { hour: hour, minute: minute, second: second };
};

// 근무 시작, 종료 확인 모달에서 확인 버튼 클릭 시 동작하는 핸들러 함수
const workModalBtnHandler = () => {
  // 근무 상태 임시 배열 토글
  work[0] = !work[0];

  renderWork();
  renderWorkModal();
};

// 근무 상태를 관리하기 위한 임시 배열
const work = [false];

// (가장 최근 3개) 공지사항 목록을 관리하기 위한 임시 배열
const notices = [
  {
    id: 1,
    date: '2024-06-26',
    title: '새로운 업데이트 공지',
    content: '2024년 6월 26일에 새로운 업데이트가 진행됩니다.',
    imgs: '/public/temp-image.jpg',
  },
  {
    id: 2,
    date: '2024-06-25',
    title: '정기 점검 안내',
    content:
      '2024년 6월 25일에 정기 점검이 있을 예정입니다.2024년 6월 25일에 정기 점검이 있을 예정입니다.2024년 6월 25일에 정기 점검이 있을 예정입니다.2024년 6월 25일에 정기 점검이 있을 예정입니다.2024년 6월 25일에 정기 점검이 있을 예정입니다.2024년 6월 25일에 정기 점검이 있을 예정입니다.2024년 6월 25일에 정기 점검이 있을 예정입니다.2024년 6월 25일에 정기 점검이 있을 예정입니다.2024년 6월 25일에 정기 점검이 있을 예정입니다.2024년 6월 25일에 정기 점검이 있을 예정입니다.2024년 6월 25일에 정기 점검이 있을 예정입니다.2024년 6월 25일에 정기 점검이 있을 예정입니다.2024년 6월 25일에 정기 점검이 있을 예정입니다.2024년 6월 25일에 정기 점검이 있을 예정입니다.2024년 6월 25일에 정기 점검이 있을 예정입니다.2024년 6월 25일에 정기 점검이 있을 예정입니다.2024년 6월 25일에 정기 점검이 있을 예정입니다.2024년 6월 25일에 정기 점검이 있을 예정입니다.2024년 6월 25일에 정기 점검이 있을 예정입니다.2024년 6월 25일에 정기 점검이 있을 예정입니다.2024년 6월 25일에 정기 점검이 있을 예정입니다.2024년 6월 25일에 정기 점검이 있을 예정입니다.2024년 6월 25일에 정기 점검이 있을 예정입니다.2024년 6월 25일에 정기 점검이 있을 예정입니다.',
    imgs: '/public/temp-image.jpg',
  },
  {
    id: 3,
    date: '2024-06-24',
    title: '서비스 개선 사항',
    content: '2024년 6월 24일에 서비스 개선 사항이 적용됩니다.',
    imgs: '/public/temp-image.jpg',
  },
];
