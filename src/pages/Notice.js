import { useModal } from '/src/js/common';

export default function Notice(root) {
  root.innerHTML = `
            <div class="notice">  
              <div class="notice__bar">
              <div class="notice__label">공지사항</div> 
                <div class="notice__search">
                  <input type="text" class="inputText notice__input" placeholder="검색어를 입력해주세요.">
                  <a href=""><svg class="notice__searchIcon" fill="currentColor" height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 502.173 502.173" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M494.336,443.646L316.402,265.713c20.399-31.421,30.023-68.955,27.189-106.632 C340.507,118.096,322.783,79.5,293.684,50.4C261.167,17.884,217.984,0,172.023,0c-0.222,0-0.445,0.001-0.668,0.001 C125.149,0.176,81.837,18.409,49.398,51.342c-66.308,67.316-65.691,176.257,1.375,242.85 c29.112,28.907,67.655,46.482,108.528,49.489c37.579,2.762,75.008-6.867,106.343-27.21l177.933,177.932 c5.18,5.18,11.984,7.77,18.788,7.77s13.608-2.59,18.789-7.769l13.182-13.182C504.695,470.862,504.695,454.006,494.336,443.646z M480.193,467.079l-13.182,13.182c-2.563,2.563-6.73,2.561-9.292,0L273.914,296.456c-1.936-1.937-4.497-2.929-7.074-2.929 c-2.044,0-4.098,0.624-5.858,1.898c-60.538,43.788-143.018,37.3-196.118-15.425C5.592,221.146,5.046,124.867,63.646,65.377 c28.67-29.107,66.949-45.222,107.784-45.376c0.199,0,0.392-0.001,0.591-0.001c40.617,0,78.785,15.807,107.52,44.542 c53.108,53.108,59.759,135.751,15.814,196.509c-2.878,3.979-2.441,9.459,1.032,12.932l183.806,183.805 C482.755,460.35,482.755,464.517,480.193,467.079z"></path> <path d="M259.633,84.449c-48.317-48.316-126.935-48.316-175.253,0c-23.406,23.406-36.296,54.526-36.296,87.627 c0,33.102,12.89,64.221,36.296,87.627S138.906,296,172.007,296c33.102,0,64.222-12.891,87.627-36.297 C307.951,211.386,307.951,132.767,259.633,84.449z M245.492,245.561C225.863,265.189,199.766,276,172.007,276 c-27.758,0-53.856-10.811-73.484-30.44c-19.628-19.628-30.438-45.726-30.438-73.484s10.809-53.855,30.438-73.484 c20.262-20.263,46.868-30.39,73.484-30.39c26.61,0,53.227,10.133,73.484,30.39C286.011,139.112,286.011,205.042,245.492,245.561z "></path> <path d="M111.017,153.935c1.569-5.296-1.452-10.861-6.747-12.43c-5.294-1.569-10.86,1.451-12.429,6.746 c-8.73,29.459-0.668,61.244,21.04,82.952c1.952,1.952,4.512,2.929,7.071,2.929s5.118-0.977,7.071-2.928 c3.905-3.906,3.905-10.238,0-14.143C110.506,200.544,104.372,176.355,111.017,153.935z"></path> <path d="M141.469,94.214c-10.748,4.211-20.367,10.514-28.588,18.735c-3.905,3.906-3.905,10.238,0,14.143 c1.952,1.952,4.512,2.929,7.071,2.929s5.118-0.977,7.07-2.929c6.26-6.26,13.575-11.057,21.741-14.255 c5.143-2.015,7.678-7.816,5.664-12.959C152.413,94.735,146.611,92.202,141.469,94.214z"></path> </g> </g> </g> </g></svg> </a>
                  </input>
                </div>
                <input type="button" value="등록" class="btn btn--notice"/>
              </div>
            <div class="notice__container">
            </div>
            <div class="notice__modalCard">
            </div>
        </div>
        `;

  const noticeContainer = document.querySelector('.notice__container');
  const noticeModal = document.querySelector('.notice__modalCard');

  // 카드 id, 제목, 이미지 데이터를 불러와서 카드를 생성하는 함수
  function createCard(cardData) {
    return `
          <div class="notice__card" data-id='${cardData.id}'>
            <div class="card__img">
            <img src="${cardData.imgs}" alt="${cardData.imgAlt}"/>
            </div>
            <div class="card__title notice__title">
            <p>${cardData.title}</p>
            </div>
        </div>
        `;
  }

  // 데이터에 들어있는 카드의 갯수 만큼 카드를 추가하는 함수
  function addCards(container, cardsData) {
    let cards = '';
    for (let cardData of cardsData) {
      cards += createCard(cardData);
    }
    container.innerHTML = cards;

    const cardElements = container.querySelectorAll('.notice__card');

    // 데이터 객체의 id와 카드의 id가 일치하면 해당 id의 모달 내용 출력
    cardElements.forEach((card) => {
      card.addEventListener('click', () => {
        const cardId = card.getAttribute('data-id');
        const data = cardsData.find((el) => el.id == cardId);
        renderModal(data);
        useModal([{ btn: 'notice__card', modal: 'notice__modalCard' }]);
      });
    });
  }

  // 클릭한 카드의 정보를 가진 모달을 생성하는 함수
  function renderModal(data) {
    noticeModal.innerHTML = ` 
      <div class="modal modal--bgWhite notice__modal"> 
        <div class="modal__bb"></div>
        <div class="modal__inner notice__modalInner">
          <div class="notice__modalBar">
          <p class="notice__modalTitle">${data.title}</p>
          <p class="notice__modalDate">${data.date}</p>
          <div>
          <div class="modal__content">
            <div class="notice__modalImg">
            <img src="${data.imgs}" alt="${data.imgAlt}"/>
            </div>
            <div class="notice__modalContent">${data.content}</div>
          </div>
          <div class="btn btn--notice--cancel modalClose">닫기</div>
        </div>
      </div>
    `;
  }

  // 카드 데이터 객체 (임시)
  const cardData = [
    {
      id: 1,
      date: '2024-06-26',
      title: '새로운 업데이트 공지',
      content:
        ' 내용이 길어졌을 때 스크롤이 발생하는지 확인하기 위함입니다. 2024년 6월 26일에 새로운 업데이트가 진행됩니다.2024년 6월 26일에 새로운 업데이트가 진행됩2024년 6월 26일에 새로운 업데이트가 진행됩2024년 6월 26일에 새로운 업데이트가 진행됩2024년 6월 26일에 새로운 업데이트가 진행됩2024년 6월 26일에 새로운 업데이트가 진행됩2024년 6월 26일에 새로운 업데이트가 진행됩2024년 6월 26일에 새로운 업데이트가 진행됩2024년 6월 26일에 새로운 업데이트가 진행됩2024년 6월 26일에 새로운 업데이트가 진행됩2024년 6월 26일에 새로운 업데이트가 진행됩2024년 6월 26일에 새로운 업데이트가 진행됩2024년 6월 26일에 새로운 업데이트가 진행됩2024년 6월 26일에 새로운 업데이트가 진행됩2024년 6월 26일에 새로운 업데이트가 진행됩',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 2,
      date: '2024-06-25',
      title: '정기 점검 안내',
      content: '2024년 6월 25일에 정기 점검이 있을 예정입니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 3,
      date: '2024-06-24',
      title: '서비스 개선 사항',
      content: '2024년 6월 24일에 서비스 개선 사항이 적용됩니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 4,
      date: '2024-06-23',
      title: '이벤트 소식',
      content: '2024년 6월 23일부터 새로운 이벤트가 시작됩니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 5,
      date: '2024-06-22',
      title: '보안 업데이트 공지',
      content: '2024년 6월 22일에 보안 업데이트가 진행됩니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 6,
      date: '2024-06-21',
      title: '긴급 점검 안내',
      content: '2024년 6월 21일에 긴급 점검이 있을 예정입니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 7,
      date: '2024-06-20',
      title: '고객센터 운영 시간 변경',
      content: '2024년 6월 20일부터 고객센터 운영 시간이 변경됩니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 8,
      date: '2024-06-19',
      title: '서비스 일시 중단 안내',
      content: '2024년 6월 19일에 서비스가 일시 중단됩니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 9,
      date: '2024-06-18',
      title: '신규 기능 추가 안내',
      content: '2024년 6월 18일에 신규 기능이 추가됩니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 10,
      date: '2024-06-17',
      title: '서버 이전 작업 공지',
      content: '2024년 6월 17일에 서버 이전 작업이 있습니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 11,
      date: '2024-06-16',
      title: '정기 점검 안내',
      content: '2024년 6월 16일에 정기 점검이 있을 예정입니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 12,
      date: '2024-06-15',
      title: '서비스 개선 사항',
      content: '2024년 6월 15일에 서비스 개선 사항이 적용됩니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 13,
      date: '2024-06-14',
      title: '이벤트 소식',
      content: '2024년 6월 14일부터 새로운 이벤트가 시작됩니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 14,
      date: '2024-06-13',
      title: '보안 업데이트 공지',
      content: '2024년 6월 13일에 보안 업데이트가 진행됩니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 15,
      date: '2024-06-12',
      title: '긴급 점검 안내',
      content: '2024년 6월 12일에 긴급 점검이 있을 예정입니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 16,
      date: '2024-06-11',
      title: '고객센터 운영 시간 변경',
      content: '2024년 6월 11일부터 고객센터 운영 시간이 변경됩니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 17,
      date: '2024-06-10',
      title: '서비스 일시 중단 안내',
      content: '2024년 6월 10일에 서비스가 일시 중단됩니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 18,
      date: '2024-06-09',
      title: '신규 기능 추가 안내',
      content: '2024년 6월 9일에 신규 기능이 추가됩니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 19,
      date: '2024-06-08',
      title: '서버 이전 작업 공지',
      content: '2024년 6월 8일에 서버 이전 작업이 있습니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 20,
      date: '2024-06-07',
      title: '정기 점검 안내',
      content: '2024년 6월 7일에 정기 점검이 있을 예정입니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 21,
      date: '2024-06-06',
      title: '서비스 개선 사항',
      content: '2024년 6월 6일에 서비스 개선 사항이 적용됩니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 22,
      date: '2024-06-05',
      title: '이벤트 소식',
      content: '2024년 6월 5일부터 새로운 이벤트가 시작됩니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 23,
      date: '2024-06-04',
      title: '보안 업데이트 공지',
      content: '2024년 6월 4일에 보안 업데이트가 진행됩니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 24,
      date: '2024-06-03',
      title: '긴급 점검 안내',
      content: '2024년 6월 3일에 긴급 점검이 있을 예정입니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 25,
      date: '2024-06-02',
      title: '고객센터 운영 시간 변경',
      content: '2024년 6월 2일부터 고객센터 운영 시간이 변경됩니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 26,
      date: '2024-06-01',
      title: '서비스 일시 중단 안내',
      content: '2024년 6월 1일에 서비스가 일시 중단됩니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 27,
      date: '2024-05-31',
      title: '신규 기능 추가 안내',
      content: '2024년 5월 31일에 신규 기능이 추가됩니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 28,
      date: '2024-05-30',
      title: '서버 이전 작업 공지',
      content: '2024년 5월 30일에 서버 이전 작업이 있습니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 29,
      date: '2024-05-29',
      title: '정기 점검 안내',
      content: '2024년 5월 29일에 정기 점검이 있을 예정입니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 30,
      date: '2024-05-28',
      title: '서비스 개선 사항',
      content: '2024년 5월 28일에 서비스 개선 사항이 적용됩니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 31,
      date: '2024-05-27',
      title: '이벤트 소식',
      content: '2024년 5월 27일부터 새로운 이벤트가 시작됩니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 32,
      date: '2024-05-26',
      title: '보안 업데이트 공지',
      content: '2024년 5월 26일에 보안 업데이트가 진행됩니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 33,
      date: '2024-05-25',
      title: '긴급 점검 안내',
      content: '2024년 5월 25일에 긴급 점검이 있을 예정입니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 34,
      date: '2024-05-24',
      title: '고객센터 운영 시간 변경',
      content: '2024년 5월 24일부터 고객센터 운영 시간이 변경됩니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 35,
      date: '2024-05-23',
      title: '서비스 일시 중단 안내',
      content: '2024년 5월 23일에 서비스가 일시 중단됩니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 36,
      date: '2024-05-22',
      title: '신규 기능 추가 안내',
      content: '2024년 5월 22일에 신규 기능이 추가됩니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 37,
      date: '2024-05-21',
      title: '서버 이전 작업 공지',
      content: '2024년 5월 21일에 서버 이전 작업이 있습니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 38,
      date: '2024-05-20',
      title: '정기 점검 안내',
      content: '2024년 5월 20일에 정기 점검이 있을 예정입니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 39,
      date: '2024-05-19',
      title: '서비스 개선 사항',
      content: '2024년 5월 19일에 서비스 개선 사항이 적용됩니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 40,
      date: '2024-05-18',
      title: '이벤트 소식',
      content: '2024년 5월 18일부터 새로운 이벤트가 시작됩니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 41,
      date: '2024-05-17',
      title: '보안 업데이트 공지',
      content: '2024년 5월 17일에 보안 업데이트가 진행됩니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 42,
      date: '2024-05-16',
      title: '긴급 점검 안내',
      content: '2024년 5월 16일에 긴급 점검이 있을 예정입니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 43,
      date: '2024-05-15',
      title: '고객센터 운영 시간 변경',
      content: '2024년 5월 15일부터 고객센터 운영 시간이 변경됩니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 44,
      date: '2024-05-14',
      title: '서비스 일시 중단 안내',
      content: '2024년 5월 14일에 서비스가 일시 중단됩니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 45,
      date: '2024-05-13',
      title: '신규 기능 추가 안내',
      content: '2024년 5월 13일에 신규 기능이 추가됩니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 46,
      date: '2024-05-12',
      title: '서버 이전 작업 공지',
      content: '2024년 5월 12일에 서버 이전 작업이 있습니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 47,
      date: '2024-05-11',
      title: '정기 점검 안내',
      content: '2024년 5월 11일에 정기 점검이 있을 예정입니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 48,
      date: '2024-05-10',
      title: '서비스 개선 사항',
      content: '2024년 5월 10일에 서비스 개선 사항이 적용됩니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 49,
      date: '2024-05-09',
      title: '이벤트 소식',
      content: '2024년 5월 9일부터 새로운 이벤트가 시작됩니다.',
      imgs: '/public/temp-image.jpg',
    },
    {
      id: 50,
      date: '2024-05-08',
      title: '보안 업데이트 공지',
      content: '2024년 5월 8일에 보안 업데이트가 진행됩니다.',
      imgs: '/public/temp-image.jpg',
    },
  ];
  addCards(noticeContainer, cardData);
}
