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

  //검색, 스크롤 이벤트 발생 시 URL 변경
  function updateURL(page, search){
    const url = new URL(window.location)
    const params = new URLSearchParams(url.search)

    params.set('page' ,page)
    if(search){
      params.set('search', search)
    }else{
      params.delete('search')
    }

    window.history.replaceState({}, '', `${url.pathname}?${params.toString()}`)
  }

  // notice api 요청 
  function fetchData(page, append=false, search=''){
  axios.get(`/api/notice/list?`,{
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
      updateURL(page, search)

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
    let isData=true
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

    //더 이상 카드 데이터가 없으면 false
    if(cardData.length<itemsPerPage){
      isData=false;
    }

    //무한 스크롤
    const imgCards = notiContainer.querySelectorAll('.card.card_img')
    const lastCard = Array.from(imgCards).slice(-1); 

    lastCard.forEach((card)=>{
      //card가 뷰포트에 얼마나 보이는지 감시
      const observer = new IntersectionObserver((entries)=>{
        //뷰포트 내 마지막 요소가 절반 이상 보이면 무한스크롤
          if(entries[0].isIntersecting && isData){
            card.classList.add('Visible')
            observer.unobserve(card) //재요청 하지 않을 데이터
            currentPage++;
            itemsPerPage=3;
            console.log('hello Observer')
            fetchData(currentPage, true);
          }else{
            card.classList.remove('Visible')
          }
      },{
          root:null,  //뷰포트 기준으로 관찰
          threshold:0.7
    });
      setTimeout(()=>{observer.observe(card)},1000)  //스크롤 시 그 다음 카드들을 가져옴
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
        //서버로 검색 키워드, 현재 페이지 전달
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
          //서버로 검색 키워드, 현재 페이지 전달
          searchQuery=searchKeyword;
          fetchData(currentPage, false, searchKeyword);
        }
    });
}
  
  fetchData(currentPage)



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
