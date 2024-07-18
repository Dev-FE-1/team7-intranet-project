import "./Pagination.css";

//const{목록 전체 갯수, 초기 페이지(기본값 1), 한 페이지에 보여줄 목록의 갯수, 한 페이지에 보여줄 페이지네이션 갯수, 목록 데이터}
//사용예시
//<div class = "pagination_test">     --> 페이지네이션을 감싸는 컨테이너 클래스를 작업 중인 페이지에서 제작
//</div>
//const pagination페이지명 = new Pagination({Props값 넣어서 선언})

class Pagination {
  constructor(props) {
    const { totalCnt, currentPage, dataPerPage, pagingPerPage } = props; // constructor에서 props를 직접 구조분해할당 해주는 것이 좋습니다.

    this.totalCnt = Number(totalCnt);
    this.currentPage = Number(currentPage) || 1;
    this.dataPerPage = Number(dataPerPage);
    this.pagingPerPage = Number(pagingPerPage);
  }

  //데이터 값에 맞게 페이지네이션을 렌더링 시켜주는 함수
  render() {
    //전체 목록 갯수에 따라서 보여질 페이지네이션
    let totalCount = Math.ceil(this.totalCnt / this.dataPerPage); // let을 사용한 이유가 무엇인가요?
    //페이지네이션 그룹
    let pageGroup = Math.ceil(this.currentPage / this.pagingPerPage);
    //그룹 내 마지막 페이지
    let lastPage = Math.min(pageGroup * this.pagingPerPage, totalCount);
    //그룹 내 첫번째 페이지
    let firstPage = Math.max((pageGroup - 1) * this.pagingPerPage + 1, 1);

    // 함수화 해보기
    function createPaginationHtml(currentPage, firstPage, lastPage) {
      const createPageButton = (
        content,
        className,
        id = null,
        dataId = null
      ) => {
        const idAttr = id ? ` id="${id}"` : "";
        const dataIdAttr = dataId !== null ? ` data-id="${dataId}"` : "";
        return `<li class="${className}"${idAttr}${dataIdAttr}>${content}</li>`;
      };

      const pageButtons = [
        createPageButton("처음", "pagination_btn btn--first", "first"),
        createPageButton("◀", "pagination_arrow", "prev"),
        ...Array.from({ length: lastPage - firstPage + 1 }, (_, i) => {
          const pageNum = firstPage + i;
          return createPageButton(
            pageNum,
            `pagination_num ${pageNum === currentPage ? "active" : ""}`,
            null,
            pageNum
          );
        }),
        createPageButton("▶", "pagination_arrow", "next"),
        createPageButton("마지막", "pagination_btn btn--end", "last"),
      ];

      return `<ul class="pagination">${pageButtons.join("")}</ul>`;
    }
    return createPaginationHtml(this.currentPage, firstPage, lastPage);
  }

  //이전, 다음, 처음, 마지막 버튼을 클릭했을 때 해당하는 페이지로 이동시키는 함수
  usePagination() {
    let totalCount = Math.ceil(this.totalCnt / this.dataPerPage);
    let pageGroup = Math.ceil(this.currentPage / this.pagingPerPage);

    //첫번재 페이지로 이동
    document.getElementById("first").addEventListener("click", (e) => {
      this.gotoPage(1);
    });
    //이전 그룹으로 이동
    document.getElementById("prev").addEventListener("click", (e) => {
      const prevGroupLastPage = Math.max(
        (pageGroup - 1) * this.pagingPerPage,
        1
      );
      this.gotoPage(prevGroupLastPage);
    });

    // 다음 그룹으로 이동
    document.getElementById("next").addEventListener("click", (e) => {
      const nextGroupFirstPage = pageGroup * this.pagingPerPage + 1;
      this.gotoPage(
        nextGroupFirstPage <= totalCount ? nextGroupFirstPage : totalCount
      );
    });

    // 마지막 페이지로 이동
    document.getElementById("last").addEventListener("click", (e) => {
      this.gotoPage(totalCount);
    });

    // 페이지네이션 숫자를 클릭하면 해당 숫자 페이지로 이동시킴
    document.querySelectorAll(".pagination_num").forEach((page) => {
      page.addEventListener("click", (e) => {
        let pageNum = Number(e.currentTarget.getAttribute("data-id"));
        this.gotoPage(pageNum);
      });
    });
  }

  //페이지네이션 내 버튼을 클릭했을 때 버튼 액션에 해당하는 페이지 값을 얻어와서 페이지네이션 렌더링
  gotoPage(page) {
    const totalCount = Math.ceil(this.totalCnt / this.dataPerPage);
    if (page < 1 || page > totalCount) return;
    this.currentPage = page;
    document.querySelector(".pagination_container").innerHTML =
      this.render(page);
    this.usePagination();
  }

  getCurrentPage() {
    return this.currentPage;
  }
}

export default Pagination;
