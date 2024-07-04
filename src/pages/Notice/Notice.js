import axios from 'axios';
import Button from '/src/components/Button/Button.js';
import Card from '/src/components/Card/Card';
import Modal from '/src/components/Modal/Modal.js';
import Input from '/src/components/Input/Input.js';
import './Notice.css';


export default function Notice(root) {
  const noticeSearch=new Input({type:'search', className:'notice__search', placeholder:'검색어를 입력하세요.'})
  const noticeUpload=new Button({label:'등록', classList:'btn--notice'})

  //초기 페이지
  let currentPage = 1;
  let itemsPerPage = 9;
  let searchQuery='';

  root.innerHTML = `
  <div class="notice"> 
  </div>
  
    `;
  const notiContainer = document.querySelector('.notice')

  function fetchData(page, query=''){
  // notice api 요청 
  axios.get(`/api/notice/list`,{
    params:{
      page:page,
      itemsPerPage:itemsPerPage,
      search:query
    }
  })
    .then(response=>{
      let cardData = response.data;
      cardData=cardData.slice(page, itemsPerPage+1) //9개만 불러옴
      addNoticeCard(notiContainer,cardData);

    }).catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  // 데이터에 들어있는 카드의 갯수 만큼 카드를 추가하는 함수
  function createCards(cardData) {
    return cardData.map((data)=>{
      let card = new Card({img: {url:data.img, text: data.title}})
      return card.render()
    }).join('');
  }

  // 전체 공지사항 감싸는 카드
  function addNoticeCard(container, cardData){
  const noticeCard = new Card({
    page :{title:'공지사항',
    searchArea:[noticeSearch.render() + noticeUpload.render()],
    content:`
      ${createCards(cardData)}
      `
    }})
    container.innerHTML=noticeCard.render();
  }

  fetchData(currentPage)

  // 검색 보류
  // const searchInput = document.querySelector('.notice');
  // console.log(searchInput)
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
