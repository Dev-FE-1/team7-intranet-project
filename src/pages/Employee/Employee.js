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

      // 임직원 테이블 작성
      const table = new Table({
        headers: ['사원번호', '이름', '부서', '직급', '이메일', '전화번호'],
        data: employeeList.map((emp) => ({
          id: emp.userId,
          name: `<div class="name_column">
            <div class="thumbnail"><img src="${
              emp.img ? emp.img : 'public/assets/images/profile-default.png'
            }" class="thumbnail" ></div>
            <div class="name">${emp.name}</div>
          </div>`,
          dept: emp.dept,
          position: emp.position,
          email: emp.email,
          phone: emp.phone,
          dataId: emp.userId,
        })),
        classList: 'table_employee',
        rowClass: 'employee_detail',
      });

      // 카드 내 테이블, 페이지네이션 렌더링
      const pagination = new Pagination({
        totalCnt: employeeList.length,
        currentPage: 1,
        dataPerPage: 15,
        pagingPerPage: 5,
      });

      // 페이지 UI 통일 카드
      const card = new Card({
        page: {
          title: '임직원 목록',
          searchArea: `<div class="listTable">${employeeSearch.render()}</div>`,
          content: `
            <div class="listTable">${table.render()}</div>
            <div class="pagination">${pagination.render()}</div>
          `,
        },
      });

      // 카드 렌더링
      root.innerHTML = `${card.render()}`;

      // 클릭한 직원의 인덱스를 찾아 모달창에 데이터 전달
      document.querySelectorAll('tr').forEach((tr) => {
        tr.addEventListener('click', function () {
          let index = this.getAttribute('data-id');
          const employee = employeeList.find((emp) => emp.userId == index);

          // 직원 모달창 인풋 생성
          const employeeinputs = [
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

          const inputsHTML = employeeinputs
            .map(
              (input) =>
                `<div class="employeeForm_group">
              <label for="${input.className}">${input.label}</label>
              ${new Input(input).render()}
            </div>`
            )
            .join('');

          // 모달 생성
          const employeeModal = new Modal({
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
                </div>
              </div>
              <form class="employeeForm">
                ${inputsHTML}
              </form>
            `,
          });

          // 모달 렌더링
          root
            .querySelector('.listTable')
            .insertAdjacentHTML('beforeend', employeeModal.render());

          // 모달 오픈
          employeeModal.useModal();
        });
      });
    })

    // API 에러 처리
    .catch((error) => {
      console.error('Error:', error);
    });
}
