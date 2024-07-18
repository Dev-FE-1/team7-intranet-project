import axios from "axios";
import Card from "../../components/Card/Card.js";
import Table from "../../components/Table/Table.js";
import Pagination from "../../components/Pagination/Pagination.js";
import Input from "../../components/Input/Input.js";
import Modal from "../../components/Modal/Modal.js";
import "./Employee.css";

export default function Employee(root) {
  let currentParams = getCurrentURLParams();
  let dataPerPage = 0;
  let total = 0;
  fetchData();

  // 하나의 함수에서 처리되는 일이 너무 많습니다.
  // 데이터를 가져오는 부분, 렌더링하는 부분, 이벤트를 추가하는 부분을 분리하여 가독성을 높일 수 있습니다.
  // .then을 async/await로 변경해보세요.

  // 서버에서 데이터를 가지고 오는 것과 UI를 렌더링

  async function fetchData() {
    const data = await fetchData();
    const modal = createModal(data);

    currentParams = getCurrentURLParams();
    const currentPage = currentParams.page;

    fetch(`/api/employee/list${currentPage ? `?page=${currentPage}` : ""}`)
      .then((response) => response.json())
      .then((data) => {
        const employeeList = data["data"];
        dataPerPage = data["dataPerPage"];
        total = data["total"];

        // 공지사항 페이지 상단 이름 검색
        const employeeSearch = new Input({
          type: "search",
          className: "employee_search",
          placeholder: "검색기능 미 구현",
        });

        // 임직원 테이블 작성
        const emlployeeTable = new Table({
          headers: ["사원번호", "이름", "부서", "직급", "이메일", "전화번호"],
          data: employeeList.map((emp) => ({
            id: emp.userId,
            name: `<div class="name_column">
              <div class="thumbnail"><img src="${
                emp.img ? emp.img : "public/assets/images/profile-default.png"
              }" class="thumbnail" ></div>
              <div class="name">${emp.name}</div>
            </div>`,
            dept: emp.dept,
            position: emp.position,
            email: `<div class="email">${emp.email}</div>`,
            phone: emp.phone,
            dataId: emp.userId,
          })),
          classList: "table_employee",
          rowClass: "employee_detail",
        });

        // 카드 내 테이블, 페이지네이션 렌더링
        const pagination = new Pagination({
          totalCnt: total,
          dataPerPage: dataPerPage,
          pagingPerPage: 5,
          currentPage: currentParams.page,
        });

        // 페이지 UI 통일 카드
        const card = new Card({
          page: {
            title: "임직원 목록",
            searchArea: `<div class="listTable">${employeeSearch.render()}</div>`,
            content: `
            <div id="employeeList" class="listTable">${emlployeeTable.render()}</div>
            <div class="pagination_container">${pagination.render()}</div>
          `,
          },
        });

        // 카드 렌더링
        root.innerHTML = `${card.render()}`;
        pagination.usePagination();

        //페이지버튼시 클릭
        document
          .querySelector(".pagination_container")
          .addEventListener("click", (e) => {
            if (e.target !== e.target.closest("li")) return;
            setQueryString({ page: pagination.getCurrentPage() });
            fetchData();
          });

        // 모달 생성 (최초 1회)
        const employeeModal = new Modal({
          name: "employee_modal",
          title: "직원 정보",
          size: "md",
          buttons: [
            { label: "닫기", type: "light", classList: "modalClose" },
            { label: "수정", classList: "modalEdit" },
          ],
          content: "", // 초기 내용은 비워둠
        });

        root
          .querySelector(".listTable")
          .insertAdjacentHTML("beforeend", employeeModal.render());

        // 테이블 클릭 이벤트 추가
        addTableRowClickEvents(employeeList);
        function addTableRowClickEvents(currentPageData) {
          document
            .querySelectorAll(".table_employee .employee_detail")
            .forEach((tr) => {
              tr.addEventListener("click", function () {
                let index = this.getAttribute("data-id");
                const employee = currentPageData.find(
                  (emp) => emp.userId == index,
                );

                // 직원 모달창 인풋 생성
                const employeeInputs = [
                  {
                    type: "text",
                    className: "user_id",
                    label: "사원번호",
                    value: `${employee.userId}`,
                  },
                  {
                    type: "text",
                    className: "user_name",
                    label: "이름",
                    value: `${employee.name}`,
                  },
                  {
                    type: "text",
                    className: "user_dept",
                    label: "부서",
                    value: `${employee.dept}`,
                  },
                  {
                    type: "text",
                    className: "user_position",
                    label: "직급",
                    value: `${employee.position}`,
                  },
                  {
                    type: "date",
                    className: "user_birth",
                    label: "생년월일",
                    value: `${employee.birth}`,
                  },
                  {
                    type: "email",
                    className: "user_email",
                    label: "이메일",
                    value: `${employee.email}`,
                  },
                  {
                    type: "tel",
                    className: "user_phone",
                    label: "전화번호",
                    value: `${employee.phone}`,
                  },
                ];

                const inputsHTML = employeeInputs
                  .map(
                    (input) =>
                      `<div class="employeeForm_group">
                <label for="${input.className}">${input.label}</label>
                ${new Input(input).render()}
              </div>`,
                  )
                  .join("");

                // 모달 내용 업데이트
                employeeModal.update({
                  name: "employee_modal",
                  title: "직원 정보",
                  size: "md",
                  buttons: [
                    { label: "닫기", type: "light", classList: "modalClose" },
                    { label: "수정", classList: "modalEdit" },
                  ],
                  content: `
                <div class="modal_employeeImage">
                  <div class="employeeImage uploadImage">
                    <img src=${
                      employee.img
                        ? employee.img
                        : "public/assets/images/profile-default.png"
                    } class="employeeImage uploadImage" />
                        ${
                          employee.img
                            ? `<div class="imageOverlay">
                          <button class="deleteImage">삭제</button>
                    </div>`
                            : ``
                        } 
                  </div>    
                </div>
                <form class="employeeForm">
                  ${inputsHTML}
                </form>
              `,
                  dataId: employee.userId, // 추가
                });

                // 이미지 업로드 이벤트 추가
                const uploadImage = document.querySelector(".uploadImage img");
                let uploadedFile = null;

                uploadImage.addEventListener("click", () => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.accept = "image/*";
                  input.addEventListener("change", (event) => {
                    const file = event.target.files[0];
                    if (file) {
                      uploadedFile = file;
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        uploadImage.src = e.target.result;
                        uploadImage.style.objectFit = "cover";
                      };
                      reader.readAsDataURL(file);
                    }
                  });
                  input.click();
                });

                // 이미지 삭제 버튼 클릭 시
                employee.img
                  ? document
                      .querySelector(".deleteImage")
                      .addEventListener("click", () => {
                        uploadedFile = null;
                        uploadImage.src =
                          "/public/assets/images/profile-default.png";
                      })
                  : "";

                // 수정 버튼 클릭 시 이미지 업로드
                document
                  .querySelector(".modalEdit")
                  .addEventListener("click", () => {
                    if (
                      confirm("프로필 사진이 수정됩니다. 계속하시겠습니까?")
                    ) {
                      const formData = new FormData();
                      if (uploadedFile) {
                        formData.append("file", uploadedFile);
                      } else {
                        if (employee.img) {
                          const imgPath = employee.img.substring(1);
                          const imgFile = fs.readFileSync(imgPath);
                          formData.append("file", imgFile);
                        } else {
                          formData.append("file", null);
                        }
                      }
                      formData.append("userId", employee.userId);
                      axios
                        .post("/api/notice/employeeUpload", formData, {
                          headers: {
                            "Content-Type": "multipart/form-data",
                          },
                        })
                        .then((response) => {
                          if (response.status === 200) {
                            employeeModal.hide();
                            window.location.reload();
                          }
                        })
                        .catch((error) => {});
                    }
                  });

                // 모달 오픈 로직 (가정)
                employeeModal.useModal();
              });
            });
        }
      })

      // API 에러 처리
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

// 유틸함수로 분리 utils/query.js
//URL쿼리 업데이트
function setQueryString(params) {
  const url = new URL(window.location.href);
  // 업데이트된 쿼리 매개변수로 URL 업데이트
  for (let key in params) {
    url.searchParams.set(key, params[key]);
  }
  // 새로운 URL로 변경
  window.history.pushState({}, "", url.toString());
}

function getCurrentURLParams() {
  // 현재 URL의 쿼리 문자열 가져오기
  const urlParams = new URLSearchParams(window.location.search);
  // URLSearchParams를 객체로 변환
  const params = {};
  for (const [key, value] of urlParams) {
    params[key] = value;
  }

  return params;
}
