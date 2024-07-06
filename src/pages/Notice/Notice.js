import axios from 'axios';
import Button from '/src/components/Button/Button.js';
import Card from '/src/components/Card/Card';
import Modal from '/src/components/Modal/Modal.js';
import Input from '/src/components/Input/Input.js';
import './Notice.css';


export default function Notice(root) {
  //공지사항 페이지 상단 검색란
  const noticeSearch=new Input({
    type:'search',
    className:'notice__search', 
    placeholder:'검색어를 입력하세요.'})

  //공지사항 페이지 상단 등록 버튼
  const noticeUpload=new Button({
    label:'등록', 
    classList:'btn--notice'})

  //초기 페이지
  let currentPage = 1;
  let itemsPerPage = 9;
  let searchQuery='';

  root.innerHTML = `
  <div class="notice"></div>
  <div class="modalContainer"></div>
  `;

  const notiContainer = document.querySelector('.notice')

  // notice api 요청 
  function fetchData(page, append=false, search=''){
    if(!append){
      notiContainer.innerHTML = ''
    }else{
      const skeletonHtml = createSkeleton(itemsPerPage)
      notiContainer.querySelector('.page_content').insertAdjacentHTML('beforeend', skeletonHtml)
    }

  axios.get(`/api/notice/list`,{
    params:{
      page:page,
      itemsPerPage:itemsPerPage,
      search:searchQuery
    }
  })
    .then(response=>{
      let cardData = response.data.data; 

      addNoticeCard(notiContainer, cardData, append);

    }).catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  // 데이터에 들어있는 카드의 갯수 만큼 카드를 추가하는 함수
  function createCards(cardData) {
    return cardData.map((data)=>{
      let card = new Card({
        img: {url:data.img, 
        text: data.title},
        dataId: data.noticeId
      });
      return card.render()
    }).join('');
  }

  function createSkeleton(num){
    let skeletons = ''
    for(let i=0;i<num;i++){
      skeletons += `<div class="skeleton-card skeleton"></div>`
    }
    return skeletons;
  }
  
  // 공지사항 카드가 추가된 공지사항 페이지를 그려주는 함수
  function addNoticeCard(container, cardData, append){
    let isData=true
    const noticeCard = new Card({
      page :{title:'공지사항',
      searchArea:[noticeSearch.render() + noticeUpload.render()],
      content:`
        ${createCards(cardData)}
        `
      }});

    //append 상태이면 새로운 목록을 불러오는 상태이므로 스켈레톤을 지우고 다음 목록을 가져옴
    if(!append){
      container.innerHTML=`${noticeCard.render()}`;
    }else{
      container.querySelector('.page_content').insertAdjacentHTML('beforeend', createCards(cardData));

      const skeletons = container.querySelectorAll('.skeleton-card')
        skeletons.forEach((skeleton)=>{
          setTimeout(()=>skeleton.remove(),300)
        })
      }

     //더 이상 카드 데이터가 없으면 false
    if(cardData.length<itemsPerPage){
      isData=false;
    }


    //공지사항 상세 내용을 확인할 수 있는 모달 함수
    let allCard = container.querySelectorAll('.card.card_img')

    allCard.forEach((card)=>{
      card.addEventListener('click',(e)=>{
        if (card) {
          const cardId = card.getAttribute('data-id');
          let data = cardData.find((el) => Number(el.noticeId) === Number(cardId));
          if (data) {
            const noticeModal = new Modal({
              name: 'notice_modal',
              size: 'md',
              buttons: [{ label: '닫기', classList: 'btn--notice--close modalClose' }],
              content: `<p class="notice__modalTitle">${data.title}</p>
                        <p class="notice__modalDate">${data.date}</p>
                        <div class="notice__modalImg">
                          <img src="${data.img}" alt="${data.title}"/>
                        </div>
                        <div class="notice__modalContent">${data.content}</div>`
            });
            document.querySelector('.modalContainer').innerHTML = noticeModal.render();
            noticeModal.useModal();
          }
        }
      })
    })

    //무한 스크롤
    const lastCard = Array.from(allCard).slice(-1)
    lastCard.forEach((card)=>{
      const observer = new IntersectionObserver((entries)=>{
        if(entries[0].isIntersecting && isData){
          observer.unobserve(card)
          currentPage++;
          itemsPerPage=9;
          console.log('hello Observer')
          //서버에 다음 목록 요청
          fetchData(currentPage, true);
        }else{
          card.classList.remove('Visible')
        }
      },{
        root:null,
        threshold:0.7
      })
      //감시할 카드(뷰 포트 내 마지막 카드)
      observer.observe(card)
    })
  }

  fetchData(currentPage)
}
