const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = '/src/components/Table/Table.css';
document.head.appendChild(link);
import { useModal } from '../js/common.js';

// 임직원 리스트 데이터 html 생성
export default function Employee(root) {
  const employeeHtml = employee
    .map(
      (employee) => `
          <li data-id="${employee.userId}" class="listTable__tr listTable__tr--hover modalDetail">
            <div class="listTable__td employee__listTableTd employee__checkbox"><input type="checkbox" /></div>
            <div class="listTable__td employee__listTableTd employee__userID">${employee.userId}</div>
            <div class="listTable__td employee__listTableTd employee__profile">
              <div class="listTable__td employee__listTableTd employee__img"><img src=${employee.img} class="profile__image--small"></div>
              <div class="listTable__td employee__listTableTd employee__name">${employee.name}</div>
            </div>
            <div class="listTable__td employee__listTableTd employee__dept">${employee.dept}</div>
            <div class="listTable__td employee__listTableTd employee__position">${employee.position}</div>
            <div class="listTable__td employee__listTableTd employee__email">${employee.email}</div>
            <div class="listTable__td employee__listTableTd employee__phone">${employee.phone}</div>
          </li>
      `
    )
    .join('');

  // 임직원 리스트 기본 테이블 + 모달창
  root.innerHTML = `

      <div class="listTable employee__listTable">
      <ul class="listTable__thead employee__listTableThead">
        <li class="listTable__tr ">
        <div class="listTable__th employee__listTableTh employee__checkbox"><input type="checkbox" /></div>
        <div class="listTable__th employee__listTableTh employee__userID">사원번호</div>
        <div class="listTable__th employee__listTableTh employee__name">이름</div>
        <div class="listTable__th employee__listTableTh employee__dept">부서</div>
        <div class="listTable__th employee__listTableTh employee__position">직급</div>
        <div class="listTable__th employee__listTableTh employee__email">이메일</div>
        <div class="listTable__th employee__listTableTh employee__phone">전화번호</div>
        </li>
      </ul>
      <ul class="listTable__tbody employee__list">
        ${employeeHtml}
      </ul>
      </div>

  `;
}

// DB 샘플
const employee = [
  {
    userId: '001',
    name: '박보검',
    position: '대표',
    email: 'ceo@77cm.com',
    password: 'CEO12345',
    phone: '010-7107-6358',
    birth: '1980-02-16',
    dept: 'C-level',
    leftVaca: '13일',
    admin: false,
    joinDate: null,
    img: '/public/profile-default.png',
  },
  {
    userId: '002',
    name: '김대영',
    position: '부장',
    email: 'nyun@77cm.com',
    password: '7SnBRP9a',
    phone: '010-4756-2128',
    birth: '1959-03-04',
    dept: '영업팀',
    leftVaca: '3일',
    admin: false,
    joinDate: null,
    img: '/public/profile-default.png',
  },
  {
    userId: '003',
    name: '배하은',
    position: '과장',
    email: 'mineunyeong@77cm.com',
    password: '50TslBc3',
    phone: '010-2767-9609',
    birth: '1986-12-21',
    dept: '인사팀',
    leftVaca: '9일',
    admin: false,
    joinDate: null,
    img: '/public/profile-default.png',
  },
  {
    userId: '004',
    name: '송진',
    position: '대리',
    email: 'gimjunyeong@77cm.com',
    password: 'ZuM6Qr6i',
    phone: '010-9687-8227',
    birth: '1955-03-02',
    dept: '개발팀',
    leftVaca: '1일',
    admin: false,
    joinDate: null,
    img: '/public/profile-default.png',
  },
  {
    userId: '005',
    name: '박지영',
    position: '차장',
    email: 'seoyeonbag@77cm.com',
    password: 'Q1YRZWgN',
    phone: '010-4344-9545',
    birth: '1996-11-04',
    dept: '개발팀',
    leftVaca: '9일',
    admin: false,
    joinDate: null,
    img: '/public/profile-default.png',
  },
  {
    userId: '006',
    name: '김해민',
    position: '대리',
    email: 'ni@77cm.com',
    password: '6Flj6fwI',
    phone: '010-1606-4149',
    birth: '1994-01-02',
    dept: '개발팀',
    leftVaca: '3일',
    admin: true,
    joinDate: null,
    img: '/public/profile-default.png',
  },
  {
    userId: '007',
    name: '유현수',
    position: '차장',
    email: 'seojunbag@77cm.com',
    password: 'z85RpnyD',
    phone: '010-6440-7770',
    birth: '1962-04-08',
    dept: '마케팅팀',
    leftVaca: '17일',
    admin: true,
    joinDate: null,
    img: '/public/profile-default.png',
  },
  {
    userId: '008',
    name: '김민채',
    position: '대리',
    email: 'hayun94@77cm.com',
    password: '1aSMpkBs',
    phone: '010-4119-4551',
    birth: '200-08-19',
    dept: '마케팅팀',
    leftVaca: '3일',
    admin: false,
    joinDate: null,
    img: '/public/profile-default.png',
  },
  {
    userId: '009',
    name: '이규성',
    position: '과장',
    email: 'osugja@77cm.com',
    password: '4NUPD6Ll',
    phone: '010-4464-3177',
    birth: '1962-09-18',
    dept: '인사팀',
    leftVaca: '3일',
    admin: true,
    joinDate: null,
    img: '/public/profile-default.png',
  },
  {
    userId: '010',
    name: '시아준수',
    position: '대리',
    email: 'hyeonjubag@77cm.com',
    password: 'c33LaWLU',
    phone: '010-3458-3972',
    birth: '1955-06-24',
    dept: '재무팀',
    leftVaca: '9일',
    admin: false,
    joinDate: null,
    img: '/public/profile-default.png',
  },
  {
    userId: '011',
    name: '이수영',
    position: '대리',
    email: 'hayungim@77cm.com',
    password: 'o5CtMasb',
    phone: '010-3772-4380',
    birth: '1962-03-30',
    dept: '개발팀',
    leftVaca: '19일',
    admin: false,
    joinDate: null,
    img: '/public/profile-default.png',
  },
  {
    userId: '012',
    name: '장선영',
    position: '부장',
    email: 'jeonghoseo@77cm.com',
    password: 'RKn3lXnp',
    phone: '010-9672-4406',
    birth: '1958-01-22',
    dept: '마케팅팀',
    leftVaca: '4일',
    admin: true,
    joinDate: null,
    img: '/public/profile-default.png',
  },
  {
    userId: '013',
    name: '이미숙',
    position: 'CTO',
    email: 'anjunyeong@77cm.com',
    password: 'sqf1fqEj',
    phone: '010-2594-5588',
    birth: '1992-10-12',
    dept: 'C-level',
    leftVaca: '12일',
    admin: true,
    joinDate: null,
    img: '/public/profile-default.png',
  },
  {
    userId: '014',
    name: '허지우',
    position: '사원',
    email: 'egim@77cm.com',
    password: 'v2ERt9LD',
    phone: '010-3615-1216',
    birth: '1992-07-07',
    dept: '영업팀',
    leftVaca: '15일',
    admin: true,
    joinDate: null,
    img: '/public/profile-default.png',
  },
];


export default function ListTable() {
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

export class EmployeeTableRows extends HTMLElement {
  constructor(props = {}) {
    super();
    this.defaultProfileImg = 'https://i.imgur.com/KM82VtW.png';
    const { employees } = props;
    this.render(employees);
  }

  render(employees) {
    if (!employees) {
      this.innerHTML = '데이터가 없습니다.';
    }

    this.innerHTML = compile(/* HTML */ `{{#each employees}}
      <tr>
        <td>
          <div class="c-checkbox">
            <input type="checkbox" class="c-checkbox__input" />
            <label></label>
          </div>
        </td>
        <td>
          {{#if profileImg}}
          <img src="{{profileImg}}" alt="프로필 사진" />
          {{else}}
          <img src="${this.defaultProfileImg}" alt="프로필 사진" />
          {{/if}}
        </td>
        <td>{{name}}</td>
        <td>{{email}}</td>
        <td>{{phone}}</td>
        <td>{{position}}</td>
      </tr>
      {{/each}}`)({ employees: employees });
  }

  connectedCallback() {
    this.attachEventListeners();
  }

  // 이벤트 리스너 추가, 체크박스 전체 선택
  attachEventListeners = () => {
    this.addEventListener('change', (e) => {
      if (e.target.id === 'selectAll') {
        const checkboxes = document.querySelectorAll('.c-checkbox__input');
        checkboxes.forEach((checkbox) => {
          checkbox.checked = e.target.checked;
        });
      }
    });
  };
}
