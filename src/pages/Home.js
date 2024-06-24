export default function Home(root) {
  root.innerHTML = `<div class="home">
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
      <div class="home__infoBox">
        <p class="home__workInfo">오늘은 아직 근무를 시작하지 않았어요.</p>
      </div>
      <button class="home__workBtn btn"><svg class="playIcon" width="20" height="20" viewBox="0 0 34 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M11.5 6.4248V23.9248L26.9688 15.1748L11.5 6.4248Z" fill="currentColor"/></svg>근무 시작</button>
    </div>
  </div>
</div>`;

  setInterval(getTime, 1000);
  getTime();
}

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

  document.querySelector('.home__time').innerHTML = `${hour}:${minute}`;
  document.querySelector('.home__second').innerHTML = `:${second}`;
};
