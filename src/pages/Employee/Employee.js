import axios from 'axios';
import Card from '../../components/Card/Card.js';
import Table from '../../components/Table/Table.js';
import Pagination from '../../components/Pagination/Pagination.js';
import Input from '../../components/Input/Input.js';
import Modal from '../../components/Modal/Modal.js';
import './Employee.css';

export default function Employee(root) {
  // 전체 임직원 호출API
  fetch('/api/employee/list')
    .then((response) => response.json())
    .then((data) => {
      const employeeList = data['data'];

      // 공지사항 페이지 상단 이름 검색
      const employeeSearch = new Input({
        type: 'search',
        className: 'employee_search',
        placeholder: '이름을 입력하세요.',
      });

      // dataPerPage에 맞도록 임직원목록 데이터 수정
      function divideEmployeeList(list, dataPerPage) {
        return Array.from(
          { length: Math.ceil(list.length / dataPerPage) },
          (_, index) =>
            list.slice(index * dataPerPage, (index + 1) * dataPerPage)
        );
      }

      // currentPage에 맞는 임직원목록 페이지 출력
      function updateEmployeeTableList(
        dataPerPage,
        currentPage,
        isFirstRender = false
      ) {
        const currentPageData = divideEmployeeList(employeeList, dataPerPage)[
          currentPage - 1
        ];

        // 임직원 테이블 작성
        const table = new Table({
          headers: ['사원번호', '이름', '부서', '직급', '이메일', '전화번호'],
          data: currentPageData.map((emp) => ({
            id: emp.userId,
            name: `<div class="name_column">
              <div class="thumbnail"><img src="${
                emp.img ? emp.img : 'public/assets/images/profile-default.png'
              }" class="thumbnail" ></div>
              <div class="name">${emp.name}</div>
            </div>`,
            dept: emp.dept,
            position: emp.position,
            email: `<div class="email">${emp.email}</div>`,
            phone: emp.phone,
            dataId: emp.userId,
          })),
          classList: 'table_employee',
          rowClass: 'employee_detail',
        });

        document.querySelector('#employeeList').innerHTML = table.render();
        addTableRowClickEvents(currentPageData);
      }

      // 카드 내 테이블, 페이지네이션 렌더링
      const pagination = new Pagination({
        totalCnt: employeeList.length,
        currentPage: 1,
        dataPerPage: 15,
        pagingPerPage: 5,
        updatePageData: (dataPerPage, currentPage) => {
          updateEmployeeTableList(dataPerPage, currentPage);
        },
      });

      // 페이지 UI 통일 카드
      const card = new Card({
        page: {
          title: '임직원 목록',
          searchArea: `<div class="listTable">${employeeSearch.render()}</div>`,
          content: `
            <div id="employeeList" class="listTable"></div>
            <div class="pagination_container">${pagination.render()}</div>
          `,
        },
      });

      // 카드 렌더링
      root.innerHTML = `${card.render()}`;

      // 페이지네이션 실행 및 첫 페이지 데이터 로드
      pagination.usePagination();
      updateEmployeeTableList(
        pagination.dataPerPage,
        pagination.currentPage,
        true
      );

      // 모달 생성 (최초 1회)
      const employeeModal = new Modal({
        name: 'employee_modal',
        title: '직원 정보',
        size: 'md',
        buttons: [
          { label: '닫기', type: 'light', classList: 'modalClose' },
          { label: '수정', classList: 'modalEdit' },
        ],
        content: '', // 초기 내용은 비워둠
      });

      root
        .querySelector('.listTable')
        .insertAdjacentHTML('beforeend', employeeModal.render());

      function addTableRowClickEvents(currentPageData) {
        document
          .querySelectorAll('.table_employee .employee_detail')
          .forEach((tr) => {
            tr.addEventListener('click', function () {
              let index = this.getAttribute('data-id');
              const employee = currentPageData.find(
                (emp) => emp.userId == index
              );

              // 직원 모달창 인풋 생성
              const employeeInputs = [
                {
                  type: 'text',
                  className: 'user_id',
                  label: '사원번호',
                  value: `${employee.userId}`,
                },
                {
                  type: 'text',
                  className: 'user_name',
                  label: '이름',
                  value: `${employee.name}`,
                },
                {
                  type: 'text',
                  className: 'user_dept',
                  label: '부서',
                  value: `${employee.dept}`,
                },
                {
                  type: 'text',
                  className: 'user_position',
                  label: '직급',
                  value: `${employee.position}`,
                },
                {
                  type: 'date',
                  className: 'user_birth',
                  label: '생년월일',
                  value: `${employee.birth}`,
                },
                {
                  type: 'email',
                  className: 'user_email',
                  label: '이메일',
                  value: `${employee.email}`,
                },
                {
                  type: 'tel',
                  className: 'user_phone',
                  label: '전화번호',
                  value: `${employee.phone}`,
                },
              ];

              const inputsHTML = employeeInputs
                .map(
                  (input) =>
                    `<div class="employeeForm_group">
                <label for="${input.className}">${input.label}</label>
                ${new Input(input).render()}
              </div>`
                )
                .join('');

              // 모달 내용 업데이트
              employeeModal.update({
                name: 'employee_modal',
                title: '직원 정보',
                size: 'md',
                buttons: [
                  { label: '닫기', type: 'light', classList: 'modalClose' },
                  { label: '수정', classList: 'modalEdit' },
                ],
                content: `
                <div class="modal_employeeImage">
                  <div class="employeeImage uploadImage">
                    <img src=${
                      employee.img
                        ? employee.img
                        : 'public/assets/images/profile-default.png'
                    } class="employeeImage uploadImage" />
                        <div class="imageOverlay">
                          <button class="deleteImage">삭제</button>
                    </div>
                  </div>    
                </div>
                <form class="employeeForm">
                  ${inputsHTML}
                </form>
              `,
                dataId: employee.userId, // 추가
              });
              // 이미지 업로드 이벤트 추가
              const uploadImage = document.querySelector('.uploadImage img');
              let uploadedFile = null;

              uploadImage.addEventListener('click', () => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.addEventListener('change', (event) => {
                  const file = event.target.files[0];
                  if (file) {
                    uploadedFile = file;
                    const reader = new FileReader();
                    reader.onload = (e) => {
                      uploadImage.src = e.target.result;
                      uploadImage.style.objectFit = 'cover';
                      uploadImage.style.width = '300px';
                      uploadImage.style.height = '300px';
                    };
                    reader.readAsDataURL(file);
                  }
                });
                input.click();
              });

              // 수정 버튼 클릭 시 이미지 업로드
              document
                .querySelector('.modalEdit')
                .addEventListener('click', () => {
                  if (uploadedFile) {
                    if (
                      confirm('프로필 사진이 수정됩니다. 계속하시겠습니까?')
                    ) {
                      const formData = new FormData();
                      formData.append('image', uploadedFile);

                      axios
                        .post('/api/employee/uploadImage', formData, {
                          headers: {
                            'Content-Type': 'multipart/form-data',
                          },
                        })
                        .then((response) => {
                          console.log('Image uploaded successfully');
                          // 모달 닫기
                          const modal = document.querySelector('.modal'); // 모달의 클래스나 ID에 맞게 수정
                        })
                        .catch((error) => {
                          console.error('Error uploading image:', error);
                        });
                    }
                  } else {
                    alert('이미지를 선택하세요.');
                  }
                });
              // 모달 오픈
              employeeModal.useModal();
            });
          });
      }

      // 첫 페이지 데이터 로드 후 클릭 이벤트 추가
      addTableRowClickEvents(
        divideEmployeeList(employeeList, pagination.dataPerPage)[0]
      );
    })

    // API 에러 처리
    .catch((error) => {
      console.error('Error:', error);
    });
}
