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
  <div class="notice"> 
  </div>
    `;
  const notiContainer = document.querySelector('.notice')

  // notice api 요청 
  function fetchData(page, append=false, search=''){
  axios.get(`/api/notice/list`,{
    params:{
      page:page,
      itemsPerPage:itemsPerPage,
      search:searchQuery
    }
  })
    .then(response=>{
      //무한스크롤 페이징 처리된 데이터
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
        img: {url:data.img, text: data.title, dataId: data.id}})
      return card.render()
    }).join('');

  }

  // 공지사항 카드가 추가된 공지사항 페이지를 그려주는 함수, 무한스크롤 로직 제어 포함
  function addNoticeCard(container, cardData, append){

    const noticeCard = new Card({
      page :{title:'공지사항',
      searchArea:[noticeSearch.render() + noticeUpload.render()],
      content:`
        ${createCards(cardData)}
        `
      }});

  //append 상태가 false, 초기로드 시 카드 데이터 9개만 생성
  if(!append){
      container.innerHTML=`${noticeCard.render()}`;
    }else{
      //append 상태를 true로 변경하여 스크롤 시 새로운 데이터를  추가하도록 함
      container.querySelector('.page_content').innerHTML+=createCards(cardData)
    }

    //무한 스크롤
    const imgCards = notiContainer.querySelectorAll('.card.card_img')
    const lastCard = Array.from(imgCards).slice(-3); 
    console.log(lastCard)

    lastCard.forEach((card)=>{
      const observer = new IntersectionObserver((entries)=>{
        if(entries[0].isIntersecting){
          observer.unobserve(card) //재요청 하지 않을 데이터
          currentPage++;
          itemsPerPage=3;
          console.log('hello Observer')
          fetchData(currentPage, true);
        }
      },{
          root:null,
          threshold:0.5
      });
      observer.observe(card)
      })

    //검색
    const searchInput = notiContainer.querySelector('.notice__search.input');
    
    //검색 키워드 입력 후 엔터를 눌렀을 때  키워드에 해당하는 목록을 불러오는 함수
    searchInput.addEventListener('keyup',(e)=>{
      if(e.key === 'Enter'){
        const searchKeyword = searchInput.value.trim()
        if(!searchKeyword !== ''){
          console.log('Enter key pressed! Search keyword:', searchKeyword);
        currentPage =1;
        searchQuery=searchKeyword;
        fetchData(currentPage, false, searchKeyword)
        }
      }
    })

    //검색 키워드 입력 후 돋보기 버튼을 눌렀을 때  키워드에 해당하는 목록을 불러오는 함수
    const searchBtn=notiContainer.querySelector('.input_searchIcon')
      searchBtn.addEventListener('click',(e)=>{
        const searchKeyword = searchInput.value.trim()
        if (searchKeyword !== '') {
          console.log('clicked! Search keyword:', searchKeyword);
          currentPage = 1;
          searchQuery=searchKeyword;
          fetchData(currentPage, false, searchKeyword);
        }
    });
}
  
  fetchData(currentPage)


  // 검색 보류
  
  // if(searchInput){
  //   console.log('searchinput 확인')
  //   searchInput.addEventListener('input', (e)=>{
  //     searchQuery = e.target.value;
  //     currentPage=1;
  //     fetchData(currentPage, searchQuery);
  //   });
  // }


  // const notiModal=new Modal({
  //   name:'notice__modal', 
  //   size:'md', 
  //   trigger:'notice__card', 
  //   buttons:[{label:'닫기', 
  //     classList:'btn--notice--close modalClose'}], 
  //     content: `<p class="notice__modalTitle">${cardData[0].title}</p>
  //     <p class="notice__modalDate">${cardData[0].date}</p>
  //       <div class="notice__modalImg">
  //       <img src="${cardData[0].img}"/>
  //       </div>
  //       <div class="notice__modalContent">${cardData[0].content}</div>`
  // });



  // // 클릭한 카드의 정보를 가진 모달을 생성하는 함수
  // function renderModal() {
  //   const cardElements =document.querySelectorAll('.notice__card');

  //   cardElements.forEach((card) => {
  //     card.addEventListener('click', (e) => {
  //       const cardId = e.currentTarget.getAttribute('data-id');
  //       const data = cardData.find((el) => el.id == cardId);
        
  //       const noticeModalContent = renderNoticeModal(data)
         
  //         const noticeModalContainer = document.querySelector('.notice__modalCard');
  //         noticeModalContainer.innerHTML=notiModal.render(); 
  //         notiModal.useModal();
          
  //     });
  //   });
  // }
  //renderModal();
  

}
