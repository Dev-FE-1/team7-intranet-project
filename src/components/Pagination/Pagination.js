import './pagination.css';
// Pagination({totalCnt:video_list.length, dataPerPage:10, pagingPerPage:5, data:video_list});
let currentPage=1;
export default function Pagination(Props) {
  // totalCnt:데이터의 갯수 (예시 adminlist_length)
  // dataperPage: 한 페이지에 보여질 데이터의 갯수
  // pagingPerPage: 한 페이지에 보여질 페이지네이션의 갯수
  // data: 데이터 배열 (예시 adminlist)
  const {totalCnt, dataPerPage, pagingPerPage, data, pagingContainer}=Props;
  
  renderPagination(totalCnt, currentPage);
  showList(currentPage);

  // 전체 데이터 갯수와 갱신되는 현재 페이지 수를 받아 페이지네이션을 렌더링 하는 함수
  function renderPagination(totalCnt, currentPage) {
    // 전체 페이지 수
    const totalCount = Math.ceil(totalCnt / dataPerPage); 
    // 현재페이지가 속한 페이지 그룹
    let pageGroup = Math.ceil(currentPage/pagingPerPage) 
    // 현재페이지가 속한 마지막 페이지
    let lastPage = Math.min(pageGroup * pagingPerPage, totalCount)
    // 현재페이지가 속한 첫 번째 페이지
    let firstPage = Math.max((pageGroup - 1) * pagingPerPage + 1, 1);

    let pagingHtml=`
    <ul class="pagination">
      <li class="btn btn--first" id="first"><a href="#">처음</a></li>
      <li class="pagination_arrow" id="prev"><a href="#">◀</a></li>
      <div class="paging"></div>
      <li class="pagination_arrow" id="next"><a href="#">▶</a></li>
      <li class="btn btn--end" id="last"><a href="#">마지막</a></li>
    </ul>
    <div class="list_container"><div>
    `; 
    
    //렌더링 되는 페이지네이션 UI를 위치시킬 컨테이너 
      const paginationContainer = document.querySelector('.pagination_container')
      paginationContainer.innerHTML=pagingHtml

      let pagingSection = ''
      for(let i = firstPage; i <= lastPage; i++){
        pagingSection+=`
        <li class="pagination_num ${i === currentPage ? 'active' : ''}" data-id="${i}"><a href="#">${i}</a></li>
        `;
      }
      
      // 클릭 가능한 페이징 값 pagigHtml 내 Paging 요소에 넣어주기
      document.querySelector('.paging').innerHTML=pagingSection;

      // 처음, 이전, 다음, 마지막 버튼 클릭 시 가야하는 페이지 계산
      document.getElementById('first').addEventListener('click', ()=>{gotoPage(1)})
      document.getElementById('prev').addEventListener('click', ()=>{gotoPage(Math.max(firstPage - 1, 1))})
      document.getElementById('next').addEventListener('click', ()=>{gotoPage(Math.min(lastPage + 1, totalCount))})
      document.getElementById('last').addEventListener('click', ()=>{gotoPage(totalCount)})

      //페이지네이션 요소 클릭 시 해당 요소에 해당하는 페이지, 목록 출력
      const paginationItems=document.querySelectorAll('.pagination_num')
      paginationItems.forEach((item)=>{
        item.addEventListener('click', (e)=>{
        let pageNum = Number(e.currentTarget.getAttribute('data-id'));
          gotoPage(pageNum)
        });
      });
  }
  // function showList(page){
  //   const listContainer = document.querySelector('.list_container'); // 데이터 목록을 표시할 컨테이너

  //   if(listContainer!==null){
  //   const startIdx = (page - 1) * dataPerPage;
  //   const endIdx = Math.min(startIdx + dataPerPage, totalCnt);
  //   const pageData = data.slice(startIdx, endIdx);

  //   let listHtml = '<ul>';
  //   pageData.forEach(item => {
  //     listHtml += `<li>${item.TITLE} - ${item.WRITE_DATE}</li>`;
  //   });
  //   listHtml += '</ul>';
  //   console.log(listHtml)
  //   listContainer.innerHTML = listHtml;
  //   }
  //   else{
  //     console.log('List container not found');
  //   }
  // }

 //현재 페이지 업데이트, 갱신 된 현재 페이지 기준으로 다시 렌더링
  function gotoPage(page){
  if (page < 1 || page > totalCnt) return;
  currentPage=page;
  renderPagination(totalCnt, currentPage);
  //showList(currentPage)
  }
}