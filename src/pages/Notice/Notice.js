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
  
  const noticeCard = new Card({
    page :{title:'공지사항',
    searchArea:[noticeSearch.render() + noticeUpload.render()],
    content:``
    }
  })

  //초기 페이지
  let currentPage = 1;
  let itemsPerPage = 9;
  let searchQuery='';

  root.innerHTML = `
  <div class="notice">${noticeCard.render()}</div>
  <div class="modalContainer"></div>
  <div class="uploadContainer"></div>
  `;

  const notiContainer = document.querySelector('.notice')

  // notice api 요청 
  function fetchData(page, append=false, search=''){
    if(append){
      const skeletonHtml = createSkeleton(itemsPerPage)
      notiContainer.querySelector('.page_content').insertAdjacentHTML('beforeend', skeletonHtml)
    }

    axios.get('/api/notice/list',{
      params:{
        page:page,
        itemsPerPage:itemsPerPage,
        search:searchQuery
      }
    })
      .then(response=>{
        let cardData = response.data.data; 
        addNoticeCard(notiContainer, cardData, append);
        useNoticeModal();
        Search();
      })
      .catch(error => {
      if (error.response && error.response.status === 404) {
        displayNotMessage();
      } else {
        console.error('Server error:', error);
      }
      });

      // 검색 결과가 일치하지 않으면 검색결과가 없습니다 노출
      function displayNotMessage(){
        const returnCard = new Card({
          page :{title:'공지사항',
          searchArea:[noticeSearch.render() + noticeUpload.render()],
          content:`
          <div class="noticenone">검색결과가 없습니다.</div>
            `
          }
        })
        notiContainer.innerHTML=returnCard.render()
      }
  } 

  //공지사항 상세 정보 api 요청
  function contentData(noticeId){
    axios.get(`/api/notice/info`,{
      params:{
        noticeId:noticeId,
      }
    })
      .then(response=>{
        let cardContent = response.data.jsonData.data;
        cardContent = cardContent.find((item)=>Number(item.noticeId) === Number(noticeId))
        if(cardContent){
            //공지사항 상세 내용을 확인할 수 있는 모달 
            const noticeModal = new Modal({
              name: 'notice_modal',
              size: 'md',
              buttons: [{ label: '닫기', classList: 'btn--notice--close modalClose' }],
              content: `<p class="notice__modalTitle">${cardContent.title}</p>
                        <p class="notice__modalDate">${cardContent.date}</p>
                          <div class="notice__modalImg">
                              <img src="${cardContent.img}" alt="${cardContent.title}"/>
                          </div>
                        <div class="notice__modalContent">${cardContent.content}</div>`
              });
              document.querySelector('.modalContainer').innerHTML = noticeModal.render();
              noticeModal.useModal();
        }
      })
      .catch(error =>{
        console.log('contentData Error :', error)
      })
  }

  function fetchUpload(formData){
    axios.post('/api/notice/upload', formData, {
      headers:{
        'Content-Type' : 'multipart/form-data'
      },
    })
    .then(response=>{
      if(response.status === 200){
        alert('공지사항 업로드 완료!')
        fetchData(1)
        document.querySelector('.uploadContainer .modalClose').click();
      }else{
        alert('공지사항 업로드 실패')
      }
    })
    .catch(error =>{
      console.log('fetchUpload Error :', error)
    })
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

  //스켈레톤 생성 함수
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

    //append 상태이면 새로운 목록을 불러오는 상태이므로 스켈레톤을 지우고 다음 목록을 가져옴
    if(!append){
      container.querySelector('.page_content').innerHTML=createCards(cardData);
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

    //무한 스크롤
    let allCard = container.querySelectorAll('.card.card_img')
    const lastCard = Array.from(allCard).slice(-1)
    lastCard.forEach((card)=>{ 
      const observer = new IntersectionObserver((entries)=>{
        if(entries[0].isIntersecting && isData){
          observer.unobserve(card)
          currentPage++;
          itemsPerPage=3;
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

  // 모달 호출 함수
  function useNoticeModal(){
    let allCard = notiContainer.querySelectorAll('.card.card_img')
    allCard.forEach((card)=>{
    card.addEventListener('click',(e)=>{
      if (card) {
        const cardId = card.getAttribute('data-id');
        contentData(cardId)
        }
      })
    })
  }

  // 공지사항 목록 검색 함수
  function Search(){
    const searchInput = notiContainer.querySelector('.notice__search.input')
    const searchBtn = notiContainer.querySelector('.input_searchIcon')

    searchInput.addEventListener('keyup', (e)=>{
      if((e.key) === 'Enter'){
        e.preventDefault()
        const searchKeyword = searchInput.value.trim()
        if(searchKeyword !==''){
          currentPage = 1
          searchQuery = searchKeyword
          fetchData(currentPage, false, searchKeyword)
        }
      }
    })
    searchBtn.addEventListener('click',(e)=>{
      e.preventDefault()
      const searchKeyword = searchInput.value.trim()
      if(searchKeyword !==''){
        currentPage = 1
        searchQuery = searchKeyword
        fetchData(currentPage, false, searchKeyword)
      }
    })
  }

  // 공지사항 등록 로직
    const uploadBtn = notiContainer.querySelector('.btn.btn_primary.btn--notice')

    uploadBtn.addEventListener('click',(e)=>{
      document.querySelector('.modalContainer').innerHTML=``;

      const noticeTitle = new Input({
        type:'text', 
        clssName:'notice_title', 
        placeholder:'제목을 입력하세요.',
        disabled:false, 
        required:true, 
        maxLength:200})
      const noticeContent = new Input({
        type:'bigText',
        className:'notice_content',
        placeholder:'내용을 입력하세요.',
        disabled:false,
        required:true,
        maxLength:200})

      const uploadForm = new Modal({
        name:'notice_upload',
        buttons:[{label:'취소', classList:'btn_light btn--notice--cancel modalClose'}, {label:'확인', classList:'btn--notice--upload'}],
        title:'공지사항 업로드',
        size:'md',
        content:`<div class="notice_form">
                  <div class="noticeTitle_writing">
                    <div class="noticeUploadTitle">제목</div>
                      ${noticeTitle.render()}
                  </div>
                  <div class="noticeContent_writing">
                    <div class="noticeUploadContent">내용</div>
                      <div class="notice_writing">
                      ${noticeContent.render()}
                    </div>
                  </div>
                  <div class="noticeFile_writing">
                    <div class="noticeUploadFile">첨부파일</div>
                      <input type="file" id="notice_file">
                  </div>
                </div>`
      })
      document.querySelector('.uploadContainer').innerHTML=uploadForm.render()
      uploadForm.show()
      document.querySelector('.btn_light.btn--notice--cancel').addEventListener('click',()=>{
        uploadForm.hide()
      })

    document.querySelector('.btn--notice--upload').addEventListener('click',(e)=>{
      const uploadBox = document.querySelector('.notice_form')
      const title = uploadBox.querySelector('.noticeTitle_writing input').value
      const content = uploadBox.querySelector('.noticeContent_writing textarea').value
      const fileInput = uploadBox.querySelector('#notice_file')
      const file = fileInput.files[0]

      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', content)
      formData.append('file', file)

      fetchUpload(formData)
    })
  })
  

  fetchData(currentPage)
}
