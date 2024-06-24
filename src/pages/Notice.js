export default function Notice(root) {
  root.innerHTML = `
            <div class="notice">  
              <div class="notice__bar">
              <div class="notice__label">공지사항</div> 
                <div class="notice__search">
                  <input type="text" class="inputText notice__input" placeholder="검색어를 입력해주세요.">
                  <svg class="search_icon" fill="#000000" height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 502.173 502.173" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M494.336,443.646L316.402,265.713c20.399-31.421,30.023-68.955,27.189-106.632 C340.507,118.096,322.783,79.5,293.684,50.4C261.167,17.884,217.984,0,172.023,0c-0.222,0-0.445,0.001-0.668,0.001 C125.149,0.176,81.837,18.409,49.398,51.342c-66.308,67.316-65.691,176.257,1.375,242.85 c29.112,28.907,67.655,46.482,108.528,49.489c37.579,2.762,75.008-6.867,106.343-27.21l177.933,177.932 c5.18,5.18,11.984,7.77,18.788,7.77s13.608-2.59,18.789-7.769l13.182-13.182C504.695,470.862,504.695,454.006,494.336,443.646z M480.193,467.079l-13.182,13.182c-2.563,2.563-6.73,2.561-9.292,0L273.914,296.456c-1.936-1.937-4.497-2.929-7.074-2.929 c-2.044,0-4.098,0.624-5.858,1.898c-60.538,43.788-143.018,37.3-196.118-15.425C5.592,221.146,5.046,124.867,63.646,65.377 c28.67-29.107,66.949-45.222,107.784-45.376c0.199,0,0.392-0.001,0.591-0.001c40.617,0,78.785,15.807,107.52,44.542 c53.108,53.108,59.759,135.751,15.814,196.509c-2.878,3.979-2.441,9.459,1.032,12.932l183.806,183.805 C482.755,460.35,482.755,464.517,480.193,467.079z"></path> <path d="M259.633,84.449c-48.317-48.316-126.935-48.316-175.253,0c-23.406,23.406-36.296,54.526-36.296,87.627 c0,33.102,12.89,64.221,36.296,87.627S138.906,296,172.007,296c33.102,0,64.222-12.891,87.627-36.297 C307.951,211.386,307.951,132.767,259.633,84.449z M245.492,245.561C225.863,265.189,199.766,276,172.007,276 c-27.758,0-53.856-10.811-73.484-30.44c-19.628-19.628-30.438-45.726-30.438-73.484s10.809-53.855,30.438-73.484 c20.262-20.263,46.868-30.39,73.484-30.39c26.61,0,53.227,10.133,73.484,30.39C286.011,139.112,286.011,205.042,245.492,245.561z "></path> <path d="M111.017,153.935c1.569-5.296-1.452-10.861-6.747-12.43c-5.294-1.569-10.86,1.451-12.429,6.746 c-8.73,29.459-0.668,61.244,21.04,82.952c1.952,1.952,4.512,2.929,7.071,2.929s5.118-0.977,7.071-2.928 c3.905-3.906,3.905-10.238,0-14.143C110.506,200.544,104.372,176.355,111.017,153.935z"></path> <path d="M141.469,94.214c-10.748,4.211-20.367,10.514-28.588,18.735c-3.905,3.906-3.905,10.238,0,14.143 c1.952,1.952,4.512,2.929,7.071,2.929s5.118-0.977,7.07-2.929c6.26-6.26,13.575-11.057,21.741-14.255 c5.143-2.015,7.678-7.816,5.664-12.959C152.413,94.735,146.611,92.202,141.469,94.214z"></path> </g> </g> </g> </g></svg>
                  </input>
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
