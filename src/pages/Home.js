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
          <p class="home__greet">안녕하세요, OOO님!</ㅔ>
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
      <div class="home__notWorkInfo">
        <p class="home__workText">오늘은 아직 근무를 시작하지 않았어요.</p>
        <button class="home__workBtn btn"><svg class="playIcon" width="20" height="20" viewBox="0 0 34 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.5 6.4248V23.9248L26.9688 15.1748L11.5 6.4248Z" fill="currentColor"/></svg>근무 시작</button>
      </div>
      </div>
    </div>
  </div>
</div>`;

  // // 시간 데이터를 1초에 1번씩 실행
  // setInterval(timeRender, 1000);
  // timeRender();

  // 근무 시작/종료 버튼에 이벤트 적용
  document
    .querySelector('.home__workBox')
    .addEventListener('click', workBtnHandler);
}

// 근무 상태를 관리하기 위한 임시 배열
const work = [false];

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

// 시간 데이터를 현재 시간 카드에 렌더링하는 함수
const timeRender = () => {
  document.querySelector('.home__time').innerHTML = `${getTime().hour}:${
    getTime().minute
  }`;
  document.querySelector('.home__second').innerHTML = `:${getTime().second}`;
};

// 근무 시작, 종료 버튼 클릭 시 동작하는 핸들러 함수
const workBtnHandler = (event) => {
  // 현재 클릭한 요소가 workCard 내의 button이 아니라면 return
  if (!event.target.closest('button')) return;

  // 근무 상태에 맞게 카드 내용을 변경시키는 로직
  document.querySelector('.home__workBox').innerHTML = work[0]
    ? `<div class="home__notWorkInfo">
  <p class="home__workText">오늘은 아직 근무를 시작하지 않았어요.</p>
  <button class="home__workBtn btn"><svg class="home__workIcon" width="20" height="20" viewBox="0 0 34 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.5 6.4248V23.9248L26.9688 15.1748L11.5 6.4248Z" fill="currentColor"/></svg>근무 시작</button>
</div>`
    : `<div class="home__workInfo">
        <p class="home__workStatus"><span class="home__workEmoji">🧑‍💻</span> 근무 중</p>
        <p class="home__workText">${getTime().hour}:${
        getTime().minute
      }부터 진행 중</p>
      <button class="home__workBtn btn"><svg class="home__workIcon" width="20" height="20" viewBox="0 0 30 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M7.5 22.5V7.5H22.5V22.5H7.5Z" fill="currentColor"/></svg>근무 종료</button>
      </div>`;

  // 근무 상태 임시 배열 토글
  work[0] = !work[0];
};
