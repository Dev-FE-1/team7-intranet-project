export default function Employee(root) {
  const employeeHtml = employee
    .map(
      (employee) => `
          <li class="listTable__tr listTable__tr--hover modalDetail">
            <div class="listTable__th employee--checkbox"><input type="checkbox" /></div>
            <div class="listTable__th employee--userID">${employee.userId}</div>
            <div class="listTable__th employee--name"><img src="/public/001.png" class="profile__image--small">${employee.name}</div>
            <div class="listTable__th employee--dept">${employee.dept}</div>
            <div class="listTable__th employee--position">${employee.position}</div>
            <div class="listTable__th employee--email">${employee.email}</div>
            <div class="listTable__th employee--phone">${employee.phone}</div>
          </li>
      `
    )
    .join('');

  root.innerHTML = `
    <div class="employee">
      <div class="employee__title">직원목록</div>
      <div class="employee__search">
        <input class="inputText" type="text" name="name" placeholder="이름을 입력해주세요."/>
        <span class="material-icons employee__search">search</span>
      </div>
 
      <div class="listTable">
        <ul class="listTable__thead">
          <li class="listTable__tr">
            <div class="listTable__th employee--checkbox"><input type="checkbox" /></div>
            <div class="listTable__th employee--userID">사원번호</div>
            <div class="listTable__th employee--name">이름</div>
            <div class="listTable__th employee--dept">부서</div>
            <div class="listTable__th employee--position">직급</div>
            <div class="listTable__th employee--email">이메일</div>
            <div class="listTable__th employee--phone">전화번호</div>
          </li>
        </ul>
        <ul class="listTable__tbody employee__list">
          ${employeeHtml}
        </ul>
      </div>

      <div class="employee__pagination">
        <ul class="pagination">
          <li class="btn pagination__btn">처음</li>
          <li class="pagination__arrow">◀</li>
          <li class="pagination__num">1</li>
          <li class="pagination__num">2</li>
          <li class="pagination__num">3</li>
          <li class="pagination__num">4</li>
          <li class="pagination__num">5</li>
          <li class="pagination__arrow">▶</li>
          <li class="btn pagination__btn">마지막</li>
        </ul>
      </div>


    <div class="modal" style="display: none">
      <div class="modal__bb"></div>
      <div class="modal__inner">
        <p class="modal__title">직원 정보</p>
        <div class="modal__content">
          <div class="modal__sub">
            <div class="modal__employeeImage">
              <img
                src=${employee[0].profile_image}
                class="profile__image profile__image--modal" />
          </div>
            <form class="employee__form">
              <div class="employee__form--group">
                <label for="employee--userID">사원번호</label>
                <input type="text" id="employee-id" value=${employee[0].userId} />
              </div>
              <div class="employee__form--group">
                <label for="employee--name">이름</label>
                <input type="text" id="employee-name" value=${employee[0].name} />
              </div>
              <div class="employee__form--group">
                <label for="employee--dept">부서</label>
                <input type="text" id="employee-dept" value=${employee[0].dept} />
              </div>
              <div class="employee__form--group">
                <label for="employee--position">직급</label>
                <input type="text" id="employee-position" value=${employee[0].position} />
              </div>
              <div class="employee__form--group">
                <label for="employee--birth">생년월일</label>
                <input type="date" id="employee-birth" value=${employee[0].birth} />
              </div>
              <div class="employee__form--group">
                <label for="employee--email">이메일</label>
                <input type="email" id="employee-email" value=${employee[0].email} />
              </div>
              <div class="employee__form--group">
                <label for="employee--phone">전화번호</label>
                <input type="tel" id="employee-phone" value=${employee[0].phone} />
              </div>
              <div class="employee__form--group">
                <label for="employee--date">입사일</label>
                <input type="date" id="employee-date" value=${employee[0].joinDate} />
              </div>
            </form>
          </div>
          <div class="modal__btns">
            <button class="btn btn--light">취소</button>
            <button class="btn">수정</button>
          </div>
        </div>
      </div>
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
    profile_image: null,
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
    profile_image: null,
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
    profile_image: null,
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
    profile_image: null,
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
    profile_image: null,
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
    profile_image: null,
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
    profile_image: null,
  },
  {
    userId: '008',
    name: '김민채',
    position: '대리',
    email: 'hayun94@77cm.com',
    password: '1aSMpkBs',
    phone: '010-4119-4551',
    birth: '2000-08-19',
    dept: '마케팅팀',
    leftVaca: '3일',
    admin: false,
    joinDate: null,
    profile_image: null,
  },
  {
    userId: '009',
    name: '다니엘라',
    position: '과장',
    email: 'osugja@77cm.com',
    password: '4NUPD6Ll',
    phone: '010-4464-3177',
    birth: '1962-09-18',
    dept: '인사팀',
    leftVaca: '3일',
    admin: true,
    joinDate: null,
    profile_image: null,
  },
  {
    userId: '010',
    name: '제이슨 로버트',
    position: '대리',
    email: 'hyeonjubag@77cm.com',
    password: 'c33LaWLU',
    phone: '010-3458-3972',
    birth: '1955-06-24',
    dept: '재무팀',
    leftVaca: '9일',
    admin: false,
    joinDate: null,
    profile_image: null,
  },
];
