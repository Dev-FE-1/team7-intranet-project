import Card from '/src/components/Card/Card';
import Modal from '/src/components/Modal/Modal';
import Button from '/src/components/Button/Button';
import { getDate, getTime } from '/src/utils/getDateTime.js';
import './Home.css';

export default function Home(root) {
  // interval ID를 관리하기 위한 변수
  let intervalId = null;

  // 프로필 Card 컴포넌트
  const profileCard = new Card({
    classList: 'home_profileCard',
    content: `
  <div class="home_textBox">
    <div class="home_today">
      <p class="home_week">${getDate().week}</p>
      <p class="home_date">${getDate().today}</p>
    </div>
    <div class="home_welcome">
      <p class="home_greet">안녕하세요, OOO님!</p>
      <p class="home_goodDay">오늘도 좋은 하루 보내세요!</p>
    </div>
  </div>
  <div class="home_profileBox">
    <img class="home_profileImg" src="/public/assets/images/profile-default-mint.png" alt="profile" />
    <span class="home_dept">OO부 OOO</span>
  </div>
`,
  });

  // 근무 Card 컴포넌트
  const workCard = new Card({
    classList: 'home_workCard',
    content: `
  <div class="home_timeBox">
    <p class="home_time">00:00</p>
    <div class="home_timeText">
      <p class="home_now">현재 시간</p>
      <p class="home_second">:00</p>
    </div>
  </div>
  <div class="home_workBox">
    <div class="home_workInfo">
      <p class="home_workText">오늘은 아직 근무를 시작하지 않았어요.</p>
    </div>
    <button class="home_workBtn btn btn_primary"><svg class="playIcon" width="20" height="20" viewBox="0 0 34 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.5 6.4248V23.9248L26.9688 15.1748L11.5 6.4248Z" fill="currentColor"/></svg>근무 시작</button>
  </div>
  `,
    fill: true,
  });

  // 최근 공지사항 목록 Card 컴포넌트
  const noticeListCard = new Card({
    classList: 'home_noticeListCard',
    page: {
      title: '공지사항',
      searchArea: `<a class="home_moreNotice" href="/notice">더보기 ></a>`,
      content: `
    <div class="home_noticeList">
  
    </div>
      `,
    },
  });

  // 근무 알림 Modal 컴포넌트
  const workModal = new Modal({
    name: 'home_workModal',
    title: '알 림',
    content: '정말 근무를 시작하시겠습니까?',
    buttons: [
      { label: '취소', type: 'light', classList: 'home_workCancel modalClose' },
      { label: '확인' },
    ],
  });

  root.innerHTML = `<div class="home">${profileCard.render()}
  ${workCard.render()}
  ${noticeListCard.render()}
  ${workModal.render()}</div>`;

  // 현재 시간을 나타내기 위한 로직
  checkWorkCardExist();
  intervalId = setInterval(checkWorkCardExist, 1000);
  window.addEventListener('beforeunload', () => clearInterval(intervalId));
}

// 현재 페이지에 근무 시간 카드가 존재하는지 확인하는 로직
const checkWorkCardExist = () => {
  if (document.querySelector('.home_timeBox')) {
    updateNowTime();
  }
};

// 근무 카드에 현재 시간 데이터를 노출시키는 로직
const updateNowTime = () => {
  document.querySelector('.home_time').innerHTML = `${getTime().hour}:${
    getTime().minute
  }`;
  document.querySelector('.home_second').innerHTML = `:${getTime().second}`;
};
