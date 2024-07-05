import './Employee.css';
import Card from '../../components/Card/Card.js';
import Table from '../../components/Table/Table.js';
import Pagination from '../../components/Pagination/Pagination.js';
import Button from '../../components/Button/Button.js';

export default function Employee(root) {
  fetch('/api/employee/list?dataLength=15')
    .then((response) => response.json())
    .then((data) => {
      const employeeList = data['data'];
      const table = new Table({
        headers: ['사원번호', '이름', '부서', '직급', '이메일', '전화번호'],
        data: employeeList.map((emp) => [
          emp.userId,
          `<div class="name_column">
        <div class="thumbnail"><img src="${emp.img}" class="thumbnail" ></div> 
        <div class="name">${emp.name}</div>
          </div>`,
          emp.dept,
          emp.position,
          emp.email,
          emp.phone,
        ]),
        classList: 'table_employee',
        rowClass: 'row_employee ${data.emp.userId}',
      });

      const pagination = new Pagination({
        totalCnt: employeeList.length,
        currentPage: 1,
        dataPerPage: 15,
        pagingPerPage: 5,
      });

      const card = new Card({
        page: {
          title: '휴가/외출 관리',
          content: `
            <div class="listTable">${table.render()}</div>
            <div class="pagination">${pagination.render()}</div>
            `,
        },
      });

      root.innerHTML = `<div>${card.render()}</div>`;
    })

    .catch((error) => {
      console.error('Error:', error);
    });
}
