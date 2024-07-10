import Card from '/src/components/Card/Card';
import Modal from '/src/components/Modal/Modal';
import axios from 'axios';
import { getDate, getTime } from '/src/utils/getDateTime.js';
import './Home.css';

export default async function Home(root, userInfo) {
  // interval ID를 관리하기 위한 변수
  let intervalId = null;

  // 로그인한 사용자의 정보
  const { name, img, dept, work } = userInfo;

  // 현재 로그인한 사용자의 근무 상태 값
  const workStatus = [work];

  // 최근 공지사항 목록 API 요청 후 데이터 저장
  const { data: newestNotice } = await noticeListApi();

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
      <p class="home_greet">안녕하세요, ${name}님!</p>
      <p class="home_goodDay">오늘도 좋은 하루 보내세요!</p>
    </div>
  </div>
  <div class="home_profileBox">
    <img class="home_profileImg" src=${
      img ? img : '/public/assets/images/profile-default-mint.png'
    } alt="profile" />
    <span class="home_dept">${dept} ${name}</span>
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
    ${renderWorkStatus(workStatus[0])}
  </div>
  `,
    fill: true,
  });

  // 최근 공지사항 목록 Card 컴포넌트
  const noticeListCard = new Card({
    classList: 'home_noticeListCard',
    page: {
      title: '공지사항',
      content: `
      <a class="home_moreNotice" href="/notice">더보기 ></a>
      <div class="home_noticeList">
        ${newestNotice
          .map((nn, idx) => {
            const noticeCard = new Card({
              classList: 'home_noticeCard',
              img: {
                url: nn.img,
                text: nn.title,
              },
              dataId: nn.noticeId,
            });

            return noticeCard.render();
          })
          .join('')}
      </div>
      `,
    },
  });

  // 근무 알림 Modal 컴포넌트
  const homeModal = new Modal({
    name: 'home_workModal',
    title: '알 림',
    content: '정말 근무를 시작하시겠습니까?',
    buttons: [
      { label: '취소', type: 'light', classList: 'home_workCancel modalClose' },
      { label: '확인', classList: 'home_workConfirm' },
    ],
  });

  // // 공지사항 상세정보 Modal 컴포넌트
  // const noticeModal = new Modal({
  //   name: 'home_noticeModal',
  //   size: 'md',
  //   buttons: [{ label: '닫기', classList: 'home_noticeCancel modalClose' }],
  //   content: `<p class="home_noticeDate"></p>
  //               <div class="home_noticeImg">
  //               </div>
  //             <div class="home_noticeContent"></div>`,
  // });

  // Home 메인 페이지에 컴포넌트를 추가하는 로직
  root.innerHTML = `<div class="home">${profileCard.render()}
  ${workCard.render()}
  ${noticeListCard.render()}
  ${homeModal.render()}</div>`;

  // 현재 시간을 나타내기 위한 로직
  checkWorkCardExist();
  intervalId = setInterval(checkWorkCardExist, 1000);
  window.addEventListener('beforeunload', () => clearInterval(intervalId));

  // 근무 카드에 위치한 근무 버튼과 모달의 확인 버튼에 이벤트를 추가하는 로직
  document.querySelector('.home_workBtn')
    ? document.querySelector('.home_workBtn').addEventListener('click', () => {
        if (workStatus[0] === 'NOT') {
          homeModal.update({
            name: 'home_workModal',
            title: '알 림',
            content: '정말 근무를 시작하시겠습니까?',
            buttons: [
              {
                label: '취소',
                type: 'light',
                classList: 'home_workCancel modalClose',
              },
              { label: '확인', classList: 'home_workConfirm' },
            ],
          });
        } else {
          homeModal.update({
            name: 'home_workModal',
            title: '알 림',
            content: '정말 근무를 종료하시겠습니까?',
            buttons: [
              {
                label: '취소',
                type: 'light',
                classList: 'home_workCancel modalClose',
              },
              { label: '확인', classList: 'home_workConfirm' },
            ],
          });
        }
        homeModal.useModal();

        const workConfirm = document.querySelector('.home_workConfirm');

        if (workConfirm) {
          workConfirm.addEventListener('click', async () => {
            const status = await workApi();

            if (!!status) {
              workStatus[0] = status;

              homeModal.hide();

              document.querySelector(
                '.home_workModal .modal_content'
              ).textContent = '정말 근무를 종료하시겠습니까?';

              reRenderWorkStatus(workStatus[0]);
            }
          });
        }
      })
    : '';

  // 공지사항 목록에 위치한 공지사항 카드를 클릭했을 때 해당하는 상세정보 모달이 나오도록 하는 로직
  document.querySelectorAll('.home_noticeCard').forEach((card) => {
    card.addEventListener('click', async (e) => {
      const dataId = card.getAttribute('data-id');
      const noticeData = await noticeInfoApi(dataId);

      homeModal.update({
        name: 'home_noticeModal',
        size: 'md',
        title: noticeData.title,
        buttons: [{ label: '닫기', classList: 'home_noticeCancel modalClose' }],
        content: `<p class="home_noticeDate">${noticeData.date}</p>
                    <div class="home_noticeImg">
                        <img src="${noticeData.img}" alt="${noticeData.title}"/>
                    </div>
                  <div class="home_noticeContent">${noticeData.content}</div>`,
      });
      homeModal.useModal();
    });
  });
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

// 사용자의 현재 근무 상태에 맞춰 근무 카드를 렌더링하는 로직
const renderWorkStatus = (workStatus) => {
  if (workStatus.split('-')[0] === 'DONE') {
    return `<div class="home_doneWorkInfo">
      <p class="home_workStatus"><span class="home_workEmoji">✅</span> 근무 완료</p>
      <p class="home_workText">${workStatus.split('-')[1]}에 퇴근 완료</p>
    </div>`;
  } else if (workStatus.split('-')[0] === 'ING') {
    return `<div class="home_ingWorkInfo">
      <p class="home_workStatus"><span class="home_workEmoji">🧑‍💻</span> 근무 중</p>
      <p class="home_workText">${workStatus.split('-')[1]}부터 진행 중</p>
    </div>
    <button class="home_workBtn btn btn_primary">
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
    return `<div class="home_workInfo">
      <p class="home_workText">오늘은 아직 근무를 시작하지 않았어요.</p>
    </div>
    <button class="home_workBtn btn btn_primary"><svg class="playIcon" width="20" height="20" viewBox="0 0 34 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.5 6.4248V23.9248L26.9688 15.1748L11.5 6.4248Z" fill="currentColor"/></svg>근무 시작</button>`;
  }
};

// 사용자의 현재 근무 상태에 맞춰 근무 카드를 재렌더링하는 로직
const reRenderWorkStatus = (workStatus) => {
  const workBox = document.querySelector('.home_workBox');

  if (workStatus.split('-')[0] === 'DONE') {
    workBox.innerHTML = `<div class="home_doneWorkInfo">
      <p class="home_workStatus"><span class="home_workEmoji">✅</span> 근무 완료</p>
      <p class="home_workText">${workStatus.split('-')[1]}에 근무 종료</p>
    </div>`;
  } else if (workStatus.split('-')[0] === 'ING') {
    workBox.firstElementChild.innerHTML = `<div class="home_ingWorkInfo">
      <p class="home_workStatus"><span class="home_workEmoji">🧑‍💻</span> 근무 중</p>
      <p class="home_workText">${workStatus.split('-')[1]}부터 진행 중</p>
    </div>`;

    document.querySelector('.home_workBtn').innerHTML = `<svg
    class="home_workIcon"
    width="20"
    height="20"
    viewBox="0 0 30 30"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7.5 22.5V7.5H22.5V22.5H7.5Z" fill="currentColor" />
  </svg>
  근무 종료`;
  } else {
    workBox.firstElementChild.innerHTML = `<div class="home_workInfo">
      <p class="home_workText">오늘은 아직 근무를 시작하지 않았어요.</p>
    </div>`;

    document.querySelector(
      '.home_workBtn'
    ).innerHTML = `<svg class="home_workIcon" width="20" height="20" viewBox="0 0 34 30" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.5 6.4248V23.9248L26.9688 15.1748L11.5 6.4248Z" fill="currentColor"/></svg>근무 시작`;
  }
};

// 근무 시작/종료 API 요청 로직
const workApi = async () => {
  try {
    const res = await axios.post('/api/user/work');
    return res.data.status;
  } catch (err) {
    console.error('API error:', err);
    return false;
  }
};

// 최근 공지사항 목록 API 요청 로직
const noticeListApi = async () => {
  try {
    const res = await axios.get('/api/notice/recent');
    return res.data;
  } catch (err) {
    console.error('API error:', err);
    return false;
  }
};

// 공지사항 상세정보 API 요청 로직
const noticeInfoApi = async (dataId) => {
  try {
    const res = await axios.get(`/api/notice/info?data-id=${dataId}`);
    return res.data.notice;
  } catch (err) {
    console.error('API error:', err);
    return false;
  }
};
