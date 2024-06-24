export default function Home(root) {
  root.innerHTML = `<div class="home">
  <div class="home__profileCard card">
    <div class="home__textBox">
      <div class="home__today">
        <span class="home__week"></span>
        <span class="home__date"></span>
      </div>
      <div class="home__welcome">
        <span class="home__greet"></span>
        <span class="home__goodDay"></span>
      </div>
    </div>
    <div class="home__profileBox">
      <img src="/public/profile-default.png" alt="profile" />
      <span class="home__dept"></span>
    </div>
  </div>
</div>`;
}

// 날짜, 요일 관련 데이터를 반환하는 함수
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
    date: `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`,
  };
};
