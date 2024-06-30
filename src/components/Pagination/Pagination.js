import './pagination.css';
// 예시 Pagination({totalCnt:video_list.length, dataPerPage:10, pagingPerPage:5, data:받아올 목록 데이터, pagingContainer: 페이지네이션 감싸는 컨테이너})
// Pagination({totalCnt:video_list.length, dataPerPage:10, pagingPerPage:5, data:video_list, PagingContainer:'.pagination_container'});
let currentPage=1;
export default function Pagination({totalCnt, dataPerPage, pagingPerPage, data, pagingContainer}) {
  function renderPagination() {
    const totalCount = Math.ceil(totalCnt / dataPerPage); // 전체 페이지 수

    let pageGroup = Math.ceil(currentPage/pagingPerPage)
    let lastPage = Math.min(pageGroup * pagingPerPage, totalCount)
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
    
    //페이지네이션 UI를 위치시킬 컨테이너 
    const paginationContainer = document.querySelector(pagingContainer)
      if(paginationContainer!==null){
        paginationContainer.innerHTML=pagingHtml
        paginationContainer.style.display = 'flex'; // Flexbox 스타일 적용
        paginationContainer.style.justifyContent = 'center'; // 중앙 정렬
        paginationContainer.style.gap = '10px'; // 요소 간 간격 추가

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

      const paginationItems=document.querySelectorAll('.pagination_num')
      paginationItems.forEach((item)=>{
        item.addEventListener('click', (e)=>{
          //console.log(e.currentTarget.getAttribute('data-id'))
        let pageNum = Number(e.currentTarget.getAttribute('data-id'));
          gotoPage(pageNum)
        });
      });
    }else{
      console.log('error')
    }
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

  //현재 페이지 업데이트, 현재 페이지 기준으로 다시 렌더링
  function gotoPage(page){
    if (page < 1 || page > totalCnt) return;
    currentPage=page;
    //console.log(currentPage)
    renderPagination();
    //showList(currentPage)
    }

  renderPagination();
  //showList(currentPage)
}