import './pagination.css';

//const{페이지네이션을 감싸는 컨테이너 클래스, 목록 전체 갯수, 한 페이지에 보여줄 목록의 갯수, 한 페이지에 보여줄 페이지네이션 갯수, 목록 데이터}
//사용예시
//<div class = "pagination_test">     --> 페이지네이션을 감싸는 컨테이너 클래스를 작업 중인 페이지에서 제작
//</div>
//const pagination페이지명 = new Pagination({Props값 넣어서 선언})

class Pagination {
  constructor(Props) {
    const { pagingClass, totalCnt, dataPerPage, pagingPerPage, data} = Props;

    this.pagingClass = pagingClass;
    this.totalCnt = totalCnt;
    this.dataPerPage = dataPerPage;
    this.pagingPerPage = pagingPerPage;
    this.data = data;

    this.currentPage=1; //페이지 초기값
    this.renderPagination(this.currentPage);
    //this.showList(1);
  }

  //화면에 표시될 데이터 값에 맞게 페이지네이션을 렌더링 시켜주는 함수
  renderPagination(currentPage) {
    let totalCount = Math.ceil(this.totalCnt / this.dataPerPage); //8
    let pageGroup = Math.ceil(currentPage / this.pagingPerPage); //1
    let lastPage = Math.min(pageGroup * this.pagingPerPage, totalCount); //5
    let firstPage = Math.max((pageGroup - 1) * this.pagingPerPage + 1, 1); //1

    let pagingHtml = `
      <ul class="pagination">
        <li class="btn btn--first" id="first"><a href="#">처음</a></li>
        <li class="pagination_arrow" id="prev"><a href="#">◀</a></li>`;

    for (let i = firstPage; i <=lastPage; i++) {
      console.log(i, currentPage)
      pagingHtml += `
        <li class="pagination_num ${i === currentPage ? 'active' : ''}" data-id="${i}"><a href="#">${i}</a></li>
      `;
    }

    pagingHtml += `
        <li class="pagination_arrow" id="next"><a href="#">▶</a></li>
        <li class="btn btn--end" id="last"><a href="#">마지막</a></li>
      </ul>
    `;

    document.querySelector(this.pagingClass).innerHTML = pagingHtml;

    //첫번재 페이지로 이동
    document.getElementById('first').addEventListener('click', () => { 
      this.gotoPage(1) },{capture: true});
    //이전 그룹으로 이동 
    document.getElementById('prev').addEventListener('click', () => {
      const prevGroupLastPage = Math.max(currentPage - this.pagingPerPage, 1);
      this.gotoPage(prevGroupLastPage),{capture: true};
    });

    // 다음 그룹으로 이동
    document.getElementById('next').addEventListener('click', (e) => {
      console.log(e)
      const nextGroupFirstPage = currentPage + this.pagingPerPage
      this.gotoPage(nextGroupFirstPage <= totalCount ? nextGroupFirstPage : totalCount);
    }),{capture: true};
    
    // 마지막 페이지로 이동
    document.getElementById('last').addEventListener('click', (e) => {
      console.log(e) 
      this.gotoPage(totalCount)}),true;
    
    // 페이지네이션 숫자를 클릭하면 해당 숫자 페이지로 이동시킴
    document.querySelectorAll('.pagination_num').forEach(page => {
      page.addEventListener('click', (e) => {
        console.log(e)
      let pageNum = Number(e.currentTarget.getAttribute('data-id'));
      this.gotoPage(pageNum);
      });
    }, true);
  }

  //목록 불러오기 테스트용 
  // showList(page) {
  //   const listContainer = document.querySelector('.list_container');

  //   if (listContainer !== null) {
  //     const startIdx = (page - 1) * this.dataPerPage;
  //     const endIdx = Math.min(startIdx + this.dataPerPage, this.totalCnt);
  //     const pageData = this.data.slice(startIdx, endIdx);

  //     let listHtml = '<ul>';
  //     pageData.forEach(item => {
  //       listHtml += `<li>${item.TITLE} - ${item.WRITE_DATE}</li>`;
  //     });
  //     listHtml += '</ul>';

  //     listContainer.innerHTML = listHtml;
  //   } else {
  //     console.log('List container not found');
  //   }
  // }

  //페이지네이션 내 버튼을 클릭했을 때 버튼 액션에 해당하는 페이지 값을 얻어와서 페이지네이션 렌더링
  gotoPage(page) {
    const totalCount = Math.ceil(this.totalCnt / this.dataPerPage);
    if (page < 1 || page > totalCount) return;
    this.renderPagination(page);
    //this.showList(page);
  }
}

export default Pagination;
