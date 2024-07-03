import Button from '/src/components/Button/Button.js';
import Card from '../../components/Card/Card';
import Modal from '/src/components/Modal/Modal.js';
import Input from '/src/components/Input/Input.js';

import './Notice.css';
export default function Notice(root) {
  // 카드 데이터 객체 (임시)
  const cardData = [
    {
      id: 1,
      date: '2024-06-26',
      title: '새로운 업데이트 공지',
      content:
        ' 내용이 길어졌을 때 스크롤이 발생하는지 확인하기 위함입니다. 2024년 6월 26일에 새로운 업데이트가 진행됩니다.2024년 6월 26일에 새로운 업데이트가 진행됩2024년 6월 26일에 새로운 업데이트가 진행됩2024년 6월 26일에 새로운 업데이트가 진행됩2024년 6월 26일에 새로운 업데이트가 진행됩2024년 6월 26일에 새로운 업데이트가 진행됩2024년 6월 26일에 새로운 업데이트가 진행됩2024년 6월 26일에 새로운 업데이트가 진행됩2024년 6월 26일에 새로운 업데이트가 진행됩2024년 6월 26일에 새로운 업데이트가 진행됩2024년 6월 26일에 새로운 업데이트가 진행됩2024년 6월 26일에 새로운 업데이트가 진행됩2024년 6월 26일에 새로운 업데이트가 진행됩2024년 6월 26일에 새로운 업데이트가 진행됩2024년 6월 26일에 새로운 업데이트가 진행됩',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 2,
      date: '2024-06-25',
      title: '정기 점검 안내',
      content: '2024년 6월 25일에 정기 점검이 있을 예정입니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 3,
      date: '2024-06-24',
      title: '서비스 개선 사항',
      content: '2024년 6월 24일에 서비스 개선 사항이 적용됩니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 4,
      date: '2024-06-23',
      title: '이벤트 소식',
      content: '2024년 6월 23일부터 새로운 이벤트가 시작됩니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 5,
      date: '2024-06-22',
      title: '보안 업데이트 공지',
      content: '2024년 6월 22일에 보안 업데이트가 진행됩니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 6,
      date: '2024-06-21',
      title: '긴급 점검 안내',
      content: '2024년 6월 21일에 긴급 점검이 있을 예정입니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 7,
      date: '2024-06-20',
      title: '고객센터 운영 시간 변경',
      content: '2024년 6월 20일부터 고객센터 운영 시간이 변경됩니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 8,
      date: '2024-06-19',
      title: '서비스 일시 중단 안내',
      content: '2024년 6월 19일에 서비스가 일시 중단됩니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 9,
      date: '2024-06-18',
      title: '신규 기능 추가 안내',
      content: '2024년 6월 18일에 신규 기능이 추가됩니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 10,
      date: '2024-06-17',
      title: '서버 이전 작업 공지',
      content: '2024년 6월 17일에 서버 이전 작업이 있습니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 11,
      date: '2024-06-16',
      title: '정기 점검 안내',
      content: '2024년 6월 16일에 정기 점검이 있을 예정입니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 12,
      date: '2024-06-15',
      title: '서비스 개선 사항',
      content: '2024년 6월 15일에 서비스 개선 사항이 적용됩니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 13,
      date: '2024-06-14',
      title: '이벤트 소식',
      content: '2024년 6월 14일부터 새로운 이벤트가 시작됩니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 14,
      date: '2024-06-13',
      title: '보안 업데이트 공지',
      content: '2024년 6월 13일에 보안 업데이트가 진행됩니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 15,
      date: '2024-06-12',
      title: '긴급 점검 안내',
      content: '2024년 6월 12일에 긴급 점검이 있을 예정입니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 16,
      date: '2024-06-11',
      title: '고객센터 운영 시간 변경',
      content: '2024년 6월 11일부터 고객센터 운영 시간이 변경됩니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 17,
      date: '2024-06-10',
      title: '서비스 일시 중단 안내',
      content: '2024년 6월 10일에 서비스가 일시 중단됩니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 18,
      date: '2024-06-09',
      title: '신규 기능 추가 안내',
      content: '2024년 6월 9일에 신규 기능이 추가됩니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 19,
      date: '2024-06-08',
      title: '서버 이전 작업 공지',
      content: '2024년 6월 8일에 서버 이전 작업이 있습니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 20,
      date: '2024-06-07',
      title: '정기 점검 안내',
      content: '2024년 6월 7일에 정기 점검이 있을 예정입니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 21,
      date: '2024-06-06',
      title: '서비스 개선 사항',
      content: '2024년 6월 6일에 서비스 개선 사항이 적용됩니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 22,
      date: '2024-06-05',
      title: '이벤트 소식',
      content: '2024년 6월 5일부터 새로운 이벤트가 시작됩니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 23,
      date: '2024-06-04',
      title: '보안 업데이트 공지',
      content: '2024년 6월 4일에 보안 업데이트가 진행됩니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 24,
      date: '2024-06-03',
      title: '긴급 점검 안내',
      content: '2024년 6월 3일에 긴급 점검이 있을 예정입니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 25,
      date: '2024-06-02',
      title: '고객센터 운영 시간 변경',
      content: '2024년 6월 2일부터 고객센터 운영 시간이 변경됩니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 26,
      date: '2024-06-01',
      title: '서비스 일시 중단 안내',
      content: '2024년 6월 1일에 서비스가 일시 중단됩니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 27,
      date: '2024-05-31',
      title: '신규 기능 추가 안내',
      content: '2024년 5월 31일에 신규 기능이 추가됩니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 28,
      date: '2024-05-30',
      title: '서버 이전 작업 공지',
      content: '2024년 5월 30일에 서버 이전 작업이 있습니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 29,
      date: '2024-05-29',
      title: '정기 점검 안내',
      content: '2024년 5월 29일에 정기 점검이 있을 예정입니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 30,
      date: '2024-05-28',
      title: '서비스 개선 사항',
      content: '2024년 5월 28일에 서비스 개선 사항이 적용됩니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 31,
      date: '2024-05-27',
      title: '이벤트 소식',
      content: '2024년 5월 27일부터 새로운 이벤트가 시작됩니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 32,
      date: '2024-05-26',
      title: '보안 업데이트 공지',
      content: '2024년 5월 26일에 보안 업데이트가 진행됩니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 33,
      date: '2024-05-25',
      title: '긴급 점검 안내',
      content: '2024년 5월 25일에 긴급 점검이 있을 예정입니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 34,
      date: '2024-05-24',
      title: '고객센터 운영 시간 변경',
      content: '2024년 5월 24일부터 고객센터 운영 시간이 변경됩니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 35,
      date: '2024-05-23',
      title: '서비스 일시 중단 안내',
      content: '2024년 5월 23일에 서비스가 일시 중단됩니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 36,
      date: '2024-05-22',
      title: '신규 기능 추가 안내',
      content: '2024년 5월 22일에 신규 기능이 추가됩니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 37,
      date: '2024-05-21',
      title: '서버 이전 작업 공지',
      content: '2024년 5월 21일에 서버 이전 작업이 있습니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 38,
      date: '2024-05-20',
      title: '정기 점검 안내',
      content: '2024년 5월 20일에 정기 점검이 있을 예정입니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 39,
      date: '2024-05-19',
      title: '서비스 개선 사항',
      content: '2024년 5월 19일에 서비스 개선 사항이 적용됩니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 40,
      date: '2024-05-18',
      title: '이벤트 소식',
      content: '2024년 5월 18일부터 새로운 이벤트가 시작됩니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 41,
      date: '2024-05-17',
      title: '보안 업데이트 공지',
      content: '2024년 5월 17일에 보안 업데이트가 진행됩니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 42,
      date: '2024-05-16',
      title: '긴급 점검 안내',
      content: '2024년 5월 16일에 긴급 점검이 있을 예정입니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 43,
      date: '2024-05-15',
      title: '고객센터 운영 시간 변경',
      content: '2024년 5월 15일부터 고객센터 운영 시간이 변경됩니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 44,
      date: '2024-05-14',
      title: '서비스 일시 중단 안내',
      content: '2024년 5월 14일에 서비스가 일시 중단됩니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 45,
      date: '2024-05-13',
      title: '신규 기능 추가 안내',
      content: '2024년 5월 13일에 신규 기능이 추가됩니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 46,
      date: '2024-05-12',
      title: '서버 이전 작업 공지',
      content: '2024년 5월 12일에 서버 이전 작업이 있습니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 47,
      date: '2024-05-11',
      title: '정기 점검 안내',
      content: '2024년 5월 11일에 정기 점검이 있을 예정입니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 48,
      date: '2024-05-10',
      title: '서비스 개선 사항',
      content: '2024년 5월 10일에 서비스 개선 사항이 적용됩니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 49,
      date: '2024-05-09',
      title: '이벤트 소식',
      content: '2024년 5월 9일부터 새로운 이벤트가 시작됩니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
    {
      id: 50,
      date: '2024-05-08',
      title: '보안 업데이트 공지',
      content: '2024년 5월 8일에 보안 업데이트가 진행됩니다.',
      imgs: '/public/assets/images/temp-image.jpg',
    },
  ];
  
  const noticeSearch=new Input({type:'search', className:'notice__input', placeholder:'검색어를 입력하세요.'})
  const noticeUpload=new Button({label:'등록', classList:'btn--notice'})
  const noticeCard = new Card({page :{title:'공지사항', searchArea:noticeSearch.render(), content:noticeUpload.render()}})

  root.innerHTML = `
    <div class="notice">  
      ${noticeCard.render()}
        <div class="notice__container"></div>
        <div class="notice__modalCard"></div>
    </div>
      `;

  const noticeContainer = document.querySelector('.notice__container');
  const noticeModal = document.querySelector('.notice__modalCard');
  
  // 카드 id, 제목, 이미지 데이터를 불러와서 카드를 생성하는 함수
  function createCard(cardData) {
    const card1 = new Card({img: {url:cardData.imgs, text: cardData.title},})
    return `
          <div class="notice__card" data-id='${cardData.id}'>
          ${card1.render()}
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
  }

  // 클릭한 카드의 정보를 가진 모달을 생성하는 함수
  function renderModal() {
    const cardElements =document.querySelectorAll('.notice__card');
    // 데이터 객체의 id와 카드의 id가 일치하면 해당 id의 모달 내용 출력
    cardElements.forEach((card) => {
      card.addEventListener('click', () => {
        const cardId = card.getAttribute('data-id');
        const data = cardData.find((el) => el.id == cardId);
        
        const noticeModalContent = `<div class="notice__modalBar">
          <p class="notice__modalTitle">${data.title}</p>
          <p class="notice__modalDate">${data.date}</p>
          <div>
          <div class="modal__content">
            <div class="notice__modalImg">
            <img src="${data.imgs}" alt="${data.imgAlt}"/>
            </div>
            <div class="notice__modalContent">${data.content}</div>
          </div>`
          ;
          const notiModal=new Modal({name:'notice__modal', size:'lg', trigger:'notice__card', title:data.title, buttons:[{label:'닫기', classList:'modalClose', content:noticeModalContent}]})
          noticeModal.innerHTML = notiModal.render()
          notiModal.useModal()
      });
    });
  }
  
  addCards(noticeContainer, cardData);
  renderModal();
}
