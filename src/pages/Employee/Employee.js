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

      //공지사항 페이지 상단 검색란
      const employeeSearch = new Input({
        type: 'search',
        className: 'employee_search',
        placeholder: '이름을 입력하세요.',
      });

      // 모달용 임시 데이터 = 모달 내 불러오는 동적 데이터로 변환 필요
      const sampleData = [
        {
          userId: '7',
          name: '김민지',
          position: '차장',
          email: 'seojunbag@77cm.co.kr',
          password: '1234',
          phone: '010-6440-7770',
          birth: '1962-04-08',
          dept: '마케팅팀',
          leftVaca: 17,
          admin: false,
          img: '/server/images/profile/22.jpg',
        },
      ];

      // 직원 모달창 인풋 생성
      const employeeinputs = [
        {
          type: 'text',
          className: 'user_id',
          label: '사원번호',
          value: sampleData[0].userId,
        },
        {
          type: 'text',
          className: 'user_name',
          label: '이름',
          value: sampleData[0].name,
        },
        {
          type: 'text',
          className: 'user_dept',
          label: '부서',
          value: sampleData[0].dept,
        },
        {
          type: 'text',
          className: 'user_position',
          label: '직급',
          value: sampleData[0].position,
        },
        {
          type: 'date',
          className: 'user_birth',
          label: '생년월일',
          value: sampleData[0].birth,
        },
        {
          type: 'email',
          className: 'user_email',
          label: '이메일',
          value: sampleData[0].email,
        },
        {
          type: 'tel',
          className: 'user_phone',
          label: '전화번호',
          value: sampleData[0].phone,
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
      const modal = new Modal({
        name: 'employee_modal', // 모달 클래스명 String (*필수값)
        title: '직원 정보',
        size: 'md',
        buttons: [
          { label: '닫기', type: 'light', classList: 'modalClose' },
          { label: '수정', classList: 'modalClose' },
        ],
        classList: 'employee_modal',
        content: `<div class="employee_modal">
          <div class="modal_employeeImage">
            <div class="employeeImage uploadImage">
          <img src=${sampleData[0].img} class="employeeImage uploadImage" />
            </div>
          </div>
          <form class="employeeForm">
            ${inputsHTML}
          </form>
        </div>
        `,
      });

      // 페이지 UI 통일 카드
      const card = new Card({
        page: {
          title: '임직원 목록',
          searchArea: `<div class="listTable">${employeeSearch.render()}</div>`,
          content: `
            <div class="listTable">${table.render()}</div>
            <div class="employeeModal">${modal.render()}</div>
            <div class="pagination">${pagination.render()} </div>
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

  // // 이미지 업로드 함수 - 서버 업로드 필요
  // const uploadImage = document.querySelector('.uploadImage');

  // uploadImage.addEventListener('click', () => {
  //   const input = document.createElement('input');
  //   input.type = 'file';
  //   input.accept = 'image/*';
  //   input.addEventListener('change', (event) => {
  //     const file = event.target.files[0];
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       uploadImage.src = e.target.result;
  //       uploadImage.style.objectFit = 'cover';
  //       uploadImage.style.width = '300px';
  //       uploadImage.style.height = '300px';
  //     };
  //     reader.readAsDataURL(file);
  //   });
  //   input.click();
  // });
}
