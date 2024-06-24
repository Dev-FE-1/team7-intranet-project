export default function Notice(root) {
  root.innerHTML = `
            <div class='notice'>
            <div class="notice__label">공지사항</div>   
              <div class="notice__right">
                <div class="notice__search">
                  <input type="text" class="inputText notice__inputText" placeholder="검색어를 입력해주세요." />
                </div>
                <input type="button" value="등록" class="btn btn--notice"/>
              </div>
            <div class="notice__container">
            </div>
        </div>`;
    
  const noticeContainer=document.querySelector('.notice__container');

  //카드 제목, 이미지, 이미지alt 값을 불러와서 html로 리턴해주는 함수
  function createCard(title, imgUrl, imgContent,){
    return `
          <div class="notice__card">
            <div class="card__img">
            <img src="${imgUrl}" alt="${imgContent}"/>
            </div>
            <div class="card__title notice__title">
            <p>${title}</p>
            </div>
          </div>`;
  }
   // 배열에 들어있는 카드 제목, 이미지, 이미지 alt값을 불러와서 카드를 추가하는 함수
  function addCards(container, cardsData){
    let cards='';

    for(let cardData of cardsData){
      cards+=createCard(cardData.title, cardData.imgUrl, cardData.imgContent)
    }

    container.innerHTML=cards;
  }

  // 카드 데이터 객체
  const cardData=[
    {title:'이굿위크 이벤트 공지사항', imgUrl:'/public/temp-image.jpg', imgContent:'puppy'},
    {title:'강아지 귀엽네요', imgUrl:'/public/temp-image.jpg', imgContent:'puppy'},
    {title:'배고프다', imgUrl:'/public/temp-image.jpg', imgContent:'puppy'},
    {title:'점메추', imgUrl:'/public/temp-image.jpg', imgContent:'puppy'},
    {title:'받고', imgUrl:'/public/temp-image.jpg', imgContent:'puppy'},
    {title:'저메추', imgUrl:'/public/temp-image.jpg', imgContent:'puppy'},
    {title:'card7 test', imgUrl:'/public/temp-image.jpg', imgContent:'puppy'},
    {title:'card8 test', imgUrl:'/public/temp-image.jpg', imgContent:'puppy'},
    {title:'card9 test', imgUrl:'/public/temp-image.jpg', imgContent:'puppy'},
    {title:'card10 test', imgUrl:'/public/temp-image.jpg', imgContent:'puppy'},
    {title:'card11 test', imgUrl:'/public/temp-image.jpg', imgContent:'puppy'},
    {title:'데이터 넣어야지..', imgUrl:'/public/temp-image.jpg', imgContent:'puppy'},
  ];

  addCards(noticeContainer, cardData);
}
