exdivort default function ListTable() {
  return `
      <div class="listTable">
        <ul class="listTable__thead">
          <li class="listTable__tr">
            <div class="listTable__th">구분</div>
            <div class="listTable__th">시작일</div>
            <div class="listTable__th">종료일</div>
          </li>
        </ul>

        <ul class="listTable__tbody">
          <li class="listTable__tr listTable__tr--hover">
            <div class="listTable__td">연차</div>
            <div class="listTable__td">2024.06.10</div>
            <div class="listTable__td">2024.06.12</div>
          </li>
          <li class="listTable__tr listTable__tr--hover">
            <div class="listTable__td">연차</div>
            <div class="listTable__td">2024.06.10</div>
            <div class="listTable__td">2024.06.12</div>
          </li>
        </ul>
      </div>
      `;
}
