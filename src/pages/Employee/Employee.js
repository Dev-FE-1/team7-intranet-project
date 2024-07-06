import Card from '../../components/Card/Card.js';
import Table from '../../components/Table/Table.js';
import Pagination from '../../components/Pagination/Pagination.js';
import Button from '../../components/Button/Button.js';
import Modal from '../../components/Modal/Modal.js';
import './Employee.css';

export default function Employee(root) {
  // 전체 임직원 호출API
  fetch('/api/employee/list')
    .then((response) => response.json())
    .then((data) => {
      const employeeList = data['data'];

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
        rowClass: 'employeeDetail',
      });

      // 페이지 15명씩 1페이지 분할
      const pagination = new Pagination({
        totalCnt: employeeList.length,
        currentPage: 1,
        dataPerPage: 15,
        pagingPerPage: 5,
      });
      // 페이지 UI 통일 카드
      // 카드 내 테이블, 페이지네이션 렌더링
      const card = new Card({
        page: {
          title: '휴가/외출 관리',
          content: `
            <div class="listTable">${table.render()}</div>
            <div class="pagination">${pagination.render()}</div>
            `,
        },
      });
      // 카드 렌더링
      root.innerHTML = `<div>${card.render()}</div>`;
    })
    // API 에러 처리
    .catch((error) => {
      console.error('Error:', error);
    });

  // const employeeModalContent = `
  //   <div class="employee_modal">
  //     <div class="modal_employeeImage">
  //       <div class="employeeImage">
  //         <img src=${data[0].img} class="employeeImage uploadImage" />
  //       </div>
  //     </div>
  //     <form class="employeeForm"></form>
  //       <div class="employeeForm_group">
  //         <label for="employee_userID">사원번호</label>
  //         <input readonly type="text" id="employee_id" value='${data[0].userId}' />
  //       </div>
  //       <div class="employeeForm_group">
  //         <label for="employee_name">이름</label>
  //         <input readonly type="text" id="employee_name" value=${data[0].name} />
  //       </div>
  //       <div class="employeeForm_group">
  //         <label for="employee_dept">부서</label>
  //         <input readonly type="text" id="employee_dept" value=${data[0].dept} />
  //       </div>
  //       <div class="employeeForm_group">
  //         <label for="employee_position">직급</label>
  //         <input readonly type="text" id="employee_position" value=${data[0].position} />
  //       </div>
  //       <div class="employeeForm_group">
  //         <label for="employee_birth">생년월일</label>
  //         <input type="date" id="employee_birth" value=${data[0].birth} />
  //       </div>
  //       <div class="employeeForm_group">
  //         <label for="employee_email">이메일</label>
  //         <input readonly type="email" id="employee_email" value=${data[0].email} />
  //       </div>
  //       <div class="employeeForm_group">
  //         <label for="employee_phone">전화번호</label>
  //         <input type="tel" id="employee_phone" value=${data[0].phone} />
  //       </div>
  //     </form>
  //   </div>
  // `;

  // document.querySelectorAll('.employeeDetail').forEach((row, index) => {
  //   row.setAttribute('data-id', employeeList[index].userId);
  // });

  // const employeeModal = new Modal({
  //   name: 'modal_employee',
  //   buttons: [
  //     { label: '닫기', type: 'button', classList: 'modalClose' },
  //     { label: '저장', type: 'submit', classList: 'modalSave' },
  //   ],
  //   title: '사원 정보',
  //   content: employeeModalContent,
  // });

  // <div>${employeeModal.render()}</div>;

  // document.querySelector('.name').addEventListener('click', (e) => {
  //   e.preventDefault();
  //   employeeModal.useModal();
  // });
}
