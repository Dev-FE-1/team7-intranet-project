// hearers = 속성명 (table header)
// data = JSON 데이터
// classList = 테이블 추가 클래스
// rowClass = 각 항 클래스 추가

import './Table.css';

export default class Table {
  constructor(props) {
    this.headers = props.headers;
    this.data = props.data;
    this.classList = props.classList || '';
    this.rowClass = props.rowClass || '';
  }

  render() {
    const headerHTML = this.headers
      .map((header) => `<th>${header}</th>`)
      .join('');
    const rowsHTML = this.data
      .map(
        (row) =>
          `<tr class="${this.rowClass}">${Object.values(row)
            .map((value) => `<td>${value}</td>`)
            .join('')}</tr>`
      )
      .join('');

    return `
      <table class="table ${this.classList}">
        <thead>
          <tr>${headerHTML}</tr>
        </thead>
        <tbody>
          ${rowsHTML}
        </tbody>
      </table>
    `;
  }
}
