export default function Notice(root) {
  root.innerHTML = `
            <div class="notice">  
              <div class="notice__bar">
              <div class="notice__label">공지사항</div> 
                <div class="notice__search">
                  <input type="text" class="inputText notice__input" placeholder="검색어를 입력해주세요." />
                </div>
                <input type="button" value="등록" class="btn btn--notice"/>
              </div>
            <div class="notice__container">
            </div>
        </div>
        <div class="noticeModal__card">
        </div>
        `;

  const noticeContainer=document.querySelector('.notice__container');
  const noticeModal=document.querySelector('.noticeModal__card');

  //카드 제목, 이미지, 이미지alt 값을 불러와서 html로 리턴해주는 함수
  function createCard(cardData){
        const cardDatastr=JSON.stringify(cardData);

        return `
          <div class="notice__card" card-data='${cardDatastr}'>
            <div class="card__img">
            <img src="${cardData.imgUrl}" alt="${cardData.imgAlt}"/>
            </div>
            <div class="card__title notice__title">
            <p>${cardData.title}</p>
            </div>
        </div>
        `;
  }

   // 배열에 들어있는 카드 제목, 이미지, 이미지 alt값을 불러와서 카드를 추가하는 함수
  function addCards(container, cardsData){
    let cards='';
    for(let cardData of cardsData){
      cards+=createCard(cardData)
    }
    container.innerHTML=cards;
    
    const cardElements=container.querySelectorAll('.notice__card');

    //모든 공지 카드의 요소를 하나씩 가져옴, 카드를 클릭하면 해당 카드에 대한 ShowModal 함수 호출
    cardElements.forEach((card)=>{
      card.addEventListener('click',()=>{
        showModal(card);
      });
    });
  }

  //클릭한 카드의 정보를 가져와 모달로 출력시키는 함수
  function showModal(card){
    //JSON문자열을 객체로 변환시키기 위한 parse
    const cardData=JSON.parse(card.getAttribute('card-data'));

      noticeModal.innerHTML= `
      <div class="modal--bgWhite"> 
        <div class="modal__bb"></div>
        <div class="modal__inner">
          <div class="noticeModal__bar">
          <p class="noticeModal__title">${cardData.title}</p>
          <p class="noticeModal__date">2024-06-25:00:00</p>
          <div>
          <div class="modal__content">
            <div class="noticeModal__img">
            <img src="${cardData.imgUrl}" alt="${cardData.imgAlt}"/>
            </div>
            <div class="noticeModal__content">${cardData.content}</div>
          </div>
            <div class="btn btn--notice--cancel">닫기</div>
        </div>
      </div>
    `;

    let closeBtn=document.querySelector('.btn--notice--cancel');
    
    //닫기 버튼 눌렀을 때 현재 출력되는 모달 숨기기  
    closeBtn.addEventListener('click',()=>{
    console.log('btn close')
    noticeModal.classList.add('modal__hidden')
    });
    
    //숨기기 로직이 끝난 후 hidden 클래스를 remove 시켜야 정상작동 
    noticeModal.classList.remove('modal__hidden')
  }
    
  

  // 카드 데이터 객체 (임시)
  const cardData=[
    {title:'이굿위크 이벤트 공지사항', imgUrl:'/public/temp-image.jpg', imgAlt:'puppy' , content:'이거 데이터 언제 다 만들지'},
    {title:'강아지 귀엽네요', imgUrl:'/public/temp-image.jpg', imgAlt:'puppy', content: '지피티 힘내라.. 야무지게 만들어줘'},
    {title:'장바구니 서비스 점검 일정', imgUrl:'/public/temp-image.jpg', imgAlt:'puppy', 
    content: '데이터 길면 어떻게 나오는지 확인하려고 쓰는거임 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 ...더보기 데이터 길면 어떻게 나오는지 확인하려고 쓰는거임 동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 ...더보기'
    },
    {title:'연차 및 복지 혜택 안내', imgUrl:'/public/temp-image.jpg', imgAlt:'puppy', content: '연차 사용 관련 안내: 연차는 최대 30일까지 사용 가능하며, 사용 계획이나 추가 정보가 필요하시면 HR팀에 문의해 주세요.'},
    {title:'받고', imgUrl:'/public/temp-image.jpg', imgAlt:'puppy', content: '지피티 힘내라.. 야무지게 만들어줘'},
    {title:'저메추', imgUrl:'/public/temp-image.jpg', imgAlt:'puppy', content: '지피티 힘내라.. 야무지게 만들어줘'},
    {title:'card7 test', imgUrl:'/public/temp-image.jpg', imgAlt:'puppy', content: '지피티 힘내라.. 야무지게 만들어줘'},
    {title:'card8 test', imgUrl:'/public/temp-image.jpg', imgAlt:'puppy', content: '지피티 힘내라.. 야무지게 만들어줘'},
    {title:'card9 test', imgUrl:'/public/temp-image.jpg', imgAlt:'puppy', content: '지피티 힘내라.. 야무지게 만들어줘'},
    {title:'card10 test', imgUrl:'/public/temp-image.jpg', imgAlt:'puppy', content: '지피티 힘내라.. 야무지게 만들어줘'},
    {title:'card11 test', imgUrl:'/public/temp-image.jpg', imgAlt:'puppy', content: '지피티 힘내라.. 야무지게 만들어줘'},
    {title:'데이터 넣어야지..', imgUrl:'/public/temp-image.jpg', imgAlt:'puppy', content: '지피티 힘내라.. 야무지게 만들어줘'},
  ];

  addCards(noticeContainer, cardData);
}
