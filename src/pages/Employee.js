import { useModal } from '../js/common.js';

// 임직원 리스트 데이터 html 생성
export default function Employee(root) {
  const employeeHtml = employee
    .map(
      (employee) => `
          <li data-id="${employee.userId}" class="listTable__tr listTable__tr--hover modalDetail">
            <div class="listTable__td employee__checkbox"><input type="checkbox" /></div>
            <div class="listTable__td employee__userID">${employee.userId}</div>
            <div class="listTable__td employee__profile">
              <div class="listTable__td employee__img"><img src=${employee.img} class="profile__image--small"></div>
              <div class="listTable__td employee__name">${employee.name}</div>
            </div>
            <div class="listTable__td employee__dept">${employee.dept}</div>
            <div class="listTable__td employee__position">${employee.position}</div>
            <div class="listTable__td employee__email">${employee.email}</div>
            <div class="listTable__td employee__phone">${employee.phone}</div>
          </li>
      `
    )
    .join('');

  // 임직원 리스트 기본 테이블 + 모달창
  root.innerHTML = `
    <div class="employee">
      <div class="employee__title">직원목록
      </div>
      <div class="employee__search">
      <input type="text" class="inputText employee__input" placeholder="검색어를 입력해주세요.">
      <svg class="search_icon" fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 502.173 502.173" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M494.336,443.646L316.402,265.713c20.399-31.421,30.023-68.955,27.189-106.632 C340.507,118.096,322.783,79.5,293.684,50.4C261.167,17.884,217.984,0,172.023,0c-0.222,0-0.445,0.001-0.668,0.001 C125.149,0.176,81.837,18.409,49.398,51.342c-66.308,67.316-65.691,176.257,1.375,242.85 c29.112,28.907,67.655,46.482,108.528,49.489c37.579,2.762,75.008-6.867,106.343-27.21l177.933,177.932 c5.18,5.18,11.984,7.77,18.788,7.77s13.608-2.59,18.789-7.769l13.182-13.182C504.695,470.862,504.695,454.006,494.336,443.646z M480.193,467.079l-13.182,13.182c-2.563,2.563-6.73,2.561-9.292,0L273.914,296.456c-1.936-1.937-4.497-2.929-7.074-2.929 c-2.044,0-4.098,0.624-5.858,1.898c-60.538,43.788-143.018,37.3-196.118-15.425C5.592,221.146,5.046,124.867,63.646,65.377 c28.67-29.107,66.949-45.222,107.784-45.376c0.199,0,0.392-0.001,0.591-0.001c40.617,0,78.785,15.807,107.52,44.542 c53.108,53.108,59.759,135.751,15.814,196.509c-2.878,3.979-2.441,9.459,1.032,12.932l183.806,183.805 C482.755,460.35,482.755,464.517,480.193,467.079z"></path> <path d="M259.633,84.449c-48.317-48.316-126.935-48.316-175.253,0c-23.406,23.406-36.296,54.526-36.296,87.627 c0,33.102,12.89,64.221,36.296,87.627S138.906,296,172.007,296c33.102,0,64.222-12.891,87.627-36.297 C307.951,211.386,307.951,132.767,259.633,84.449z M245.492,245.561C225.863,265.189,199.766,276,172.007,276 c-27.758,0-53.856-10.811-73.484-30.44c-19.628-19.628-30.438-45.726-30.438-73.484s10.809-53.855,30.438-73.484 c20.262-20.263,46.868-30.39,73.484-30.39c26.61,0,53.227,10.133,73.484,30.39C286.011,139.112,286.011,205.042,245.492,245.561z "></path> <path d="M111.017,153.935c1.569-5.296-1.452-10.861-6.747-12.43c-5.294-1.569-10.86,1.451-12.429,6.746 c-8.73,29.459-0.668,61.244,21.04,82.952c1.952,1.952,4.512,2.929,7.071,2.929s5.118-0.977,7.071-2.928 c3.905-3.906,3.905-10.238,0-14.143C110.506,200.544,104.372,176.355,111.017,153.935z"></path> <path d="M141.469,94.214c-10.748,4.211-20.367,10.514-28.588,18.735c-3.905,3.906-3.905,10.238,0,14.143 c1.952,1.952,4.512,2.929,7.071,2.929s5.118-0.977,7.07-2.929c6.26-6.26,13.575-11.057,21.741-14.255 c5.143-2.015,7.678-7.816,5.664-12.959C152.413,94.735,146.611,92.202,141.469,94.214z"></path> </g> </g> </g> </g></svg>
      </input>
      </div>

      <div class="listTable">
      <ul class="listTable__thead">
        <li class="listTable__tr ">
        <div class="listTable__th employee__checkbox"><input type="checkbox" /></div>
        <div class="listTable__th employee__userID">사원번호</div>
        <div class="listTable__th employee__name">이름</div>
        <div class="listTable__th employee__dept">부서</div>
        <div class="listTable__th employee__position">직급</div>
        <div class="listTable__th employee__email">이메일</div>
        <div class="listTable__th employee__phone">전화번호</div>
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


    <div class="modal employee__detailModal modal--none">
      <div class="modal__bb"></div>
      <div class="modal__inner">
      <p class="modal__title">직원 정보</p>
      <div class="modal__content">
        <div class="modal__sub">
        <div class="modal__employeeImage">
          <div class="modal__employeeImage--basic">
          <img
          src=${employee[22].img}
          class="profile__image profile__image--modal" />
          <div class="modal__employeeImage--overlay">
            <button class="modal__editButton">+</button>
                </div>
              </div>
            </div>
            <form class="employee__form">
              <div class="employee__form--group">
                <label for="employee__userID">사원번호</label>
                <input readonly type="text" id="employee-id" value=${employee[0].userId} />
              </div>
              <div class="employee__form--group">
                <label for="employee__name">이름</label>
                <input readonly type="text" id="employee-name" value=${employee[0].name} />
              </div>
              <div class="employee__form--group">
                <label for="employee__dept">부서</label>
                <input readonly type="text" id="employee-dept" value=${employee[0].dept} />
              </div>
              <div class="employee__form--group">
                <label for="employee__position">직급</label>
                <input readonly type="text" id="employee-position" value=${employee[0].position} />
              </div>
              <div class="employee__form--group">
                <label for="employee__birth">생년월일</label>
                <input type="date" id="employee-birth" value=${employee[0].birth} />
              </div>
              <div class="employee__form--group">
                <label for="employee__email">이메일</label>
                <input readonly type="email" id="employee-email" value=${employee[0].email} />
              </div>
              <div class="employee__form--group">
                <label for="employee__phone">전화번호</label>
                <input type="tel" id="employee-phone" value=${employee[0].phone} />
              </div>
              <div class="employee__form--group">
                <label for="employee__date">입사일</label>
                <input readonly type="date" id="employee-date" value=${employee[0].joinDate}  />
              </div>
            </form>
          </div>
          <div class="modal__btns">
            <button class="btn btn--light modalClose">취소</button>
            <button class="btn">수정</button>
          </div>
        </div>
      </div>
    </div>
  `;

  // 모달 옵션
  const modalOpen = [{ btn: 'modalDetail', modal: 'employee__detailModal' }];
  useModal(modalOpen);
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
    img: '/server/images/profile/001.jpg',
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
    img: '/server/images/profile/002.jpg',
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
    img: '/server/images/profile/003.jpg',
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
    img: '/server/images/profile/004.jpg',
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
    img: '/server/images/profile/005.jpg',
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
    img: '/server/images/profile/006.jpg',
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
    img: '/server/images/profile/007.jpg',
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
    img: '/server/images/profile/008.jpg',
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
    img: '/server/images/profile/009.jpg',
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
    img: '/server/images/profile/010.jpg',
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
    img: '/server/images/profile/011.jpg',
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
    img: '/server/images/profile/012.jpg',
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
    img: '/server/images/profile/013.jpg',
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
    img: '/server/images/profile/014.jpg',
  },
  {
    userId: '015',
    name: '나현숙',
    position: '대리',
    email: 'seohyeon93@77cm.com',
    password: '7HSYnwSg',
    phone: '010-2130-7575',
    birth: '1980-06-24',
    dept: '개발팀',
    leftVaca: '6일',
    admin: true,
    joinDate: null,
    img: '/server/images/profile/015.jpg',
  },
  {
    userId: '016',
    name: '문상훈',
    position: '사원',
    email: 'yunyeweon@77cm.com',
    password: 'Om7R9dyu',
    phone: '010-504-2283',
    birth: '1977-07-02',
    dept: '인사팀',
    leftVaca: '18일',
    admin: true,
    joinDate: null,
    img: '/server/images/profile/016.jpg',
  },
  {
    userId: '017',
    name: '선우정아',
    position: '대리',
    email: 'caeweoncoe@77cm.com',
    password: '3Te2Mq7p',
    phone: '010-7498-3547',
    birth: '1984-08-20',
    dept: '영업팀',
    leftVaca: '13일',
    admin: false,
    joinDate: null,
    img: '/server/images/profile/017.jpg',
  },
  {
    userId: '018',
    name: '강준호',
    position: '과장',
    email: 'sanghun89@77cm.com',
    password: '3DlebUnL',
    phone: '010-4197-3243',
    birth: '1998-01-09',
    dept: '재무팀',
    leftVaca: '3일',
    admin: false,
    joinDate: null,
    img: '/server/images/profile/018.jpg',
  },
  {
    userId: '019',
    name: '차민지',
    position: '부장',
    email: 'ngim@77cm.com',
    password: '0AOEn1jR',
    phone: '010-9593-5475',
    birth: '1978-10-20',
    dept: '개발팀',
    leftVaca: '15일',
    admin: true,
    joinDate: null,
    img: '/server/images/profile/019.jpg',
  },
  {
    userId: '020',
    name: '나주원',
    position: '대리',
    email: 'xjeon@77cm.com',
    password: 'Hb9tAYrf',
    phone: '010-6799-2799',
    birth: '1961-11-17',
    dept: '개발팀',
    leftVaca: '19일',
    admin: false,
    joinDate: null,
    img: '/server/images/profile/020.jpg',
  },
  {
    userId: '021',
    name: '박서현',
    position: '과장',
    email: 'bagminjun@77cm.com',
    password: 'u3I0MQCw',
    phone: '010-5853-7865',
    birth: '1995-09-05',
    dept: '인사팀',
    leftVaca: '6일',
    admin: true,
    joinDate: null,
    img: '/server/images/profile/021.jpg',
  },
  {
    userId: '022',
    name: '이미숙',
    position: 'COO',
    email: 'wgo@77cm.com',
    password: '4XaxgV3v',
    phone: '010-4765-6954',
    birth: '1975-10-28',
    dept: 'C-level',
    leftVaca: '11일',
    admin: false,
    joinDate: null,
    img: '/server/images/profile/022.jpg',
  },
  {
    userId: '023',
    name: '고미경',
    position: '부장',
    email: 'xryu@77cm.com',
    password: '1WUWrJIi',
    phone: '010-4470-9567',
    birth: '1973-07-21',
    dept: '마케팅팀',
    leftVaca: '12일',
    admin: false,
    joinDate: null,
    img: '/server/images/profile/023.jpg',
  },
  {
    userId: '024',
    name: '이지은',
    position: '차장',
    email: 'tgang@77cm.com',
    password: 'bK0E4Rzv',
    phone: '010-2778-8439',
    birth: '1976-08-17',
    dept: '개발팀',
    leftVaca: '4일',
    admin: true,
    joinDate: null,
    img: '/server/images/profile/024.jpg',
  },
  {
    userId: '025',
    name: '김성민',
    position: '차장',
    email: 'yi@77cm.com',
    password: '7CiJSDWt',
    phone: '010-1441-3557',
    birth: '1996-08-25',
    dept: '개발팀',
    leftVaca: '13일',
    admin: false,
    joinDate: null,
    img: '/server/images/profile/025.jpg',
  },
  {
    userId: '026',
    name: '박건우',
    position: '차장',
    email: 'boram86@77cm.com',
    password: 'fn3v8Zac',
    phone: '010-8324-6723',
    birth: '1989-10-18',
    dept: '인사팀',
    leftVaca: '6일',
    admin: true,
    joinDate: null,
    img: '/server/images/profile/026.jpg',
  },
  {
    userId: '027',
    name: '박순옥',
    position: '차장',
    email: 'goyeongmi@77cm.com',
    password: '0GD42Eon',
    phone: '010-8214-6136',
    birth: '1990-06-29',
    dept: '개발팀',
    leftVaca: '11일',
    admin: false,
    joinDate: null,
    img: '/server/images/profile/027.jpg',
  },
  {
    userId: '028',
    name: '김명숙',
    position: '부장',
    email: 'myeongsuggim@77cm.com',
    password: '0Zm5SsO',
    phone: '010-5034-2892',
    birth: '1989-04-06',
    dept: '재무팀',
    leftVaca: '4일',
    admin: false,
    joinDate: null,
    img: '/server/images/profile/028.jpg',
  },
  {
    userId: '029',
    name: '이명숙',
    position: '과장',
    email: 'seojun87@77cm.com',
    password: 'H2K6RKyu',
    phone: '010-9739-3409',
    birth: '1988-11-10',
    dept: '재무팀',
    leftVaca: '10일',
    admin: true,
    joinDate: null,
    img: '/server/images/profile/029.jpg',
  },
  {
    userId: '030',
    name: '송건우',
    position: '부장',
    email: 'yejingim@77cm.com',
    password: 'ScN8AhM1',
    phone: '010-5689-5619',
    birth: '1978-07-05',
    dept: '영업팀',
    leftVaca: '6일',
    admin: true,
    joinDate: null,
    img: '/server/images/profile/030.jpg',
  },
  {
    userId: '031',
    name: '김영수',
    position: '사원',
    email: 'ujinhan@77cm.com',
    password: 'On7o2NFv',
    phone: '010-9481-7783',
    birth: '1992-08-12',
    dept: '재무팀',
    leftVaca: '7일',
    admin: true,
    joinDate: null,
    img: '/server/images/profile/031.jpg',
  },
  {
    userId: '032',
    name: '김진우',
    position: '차장',
    email: 'ieunyeong@77cm.com',
    password: 'pR1ztAgw',
    phone: '010-4796-9810',
    birth: '1967-05-20',
    dept: '인사팀',
    leftVaca: '9일',
    admin: false,
    joinDate: null,
    img: '/server/images/profile/032.jpg',
  },
  {
    userId: '033',
    name: '김순옥',
    position: '대리',
    email: 'syun@77cm.com',
    password: 'Gce1RskH',
    phone: '010-3850-2513',
    birth: '1996-06-25',
    dept: '개발팀',
    leftVaca: '7일',
    admin: true,
    joinDate: null,
    img: '/server/images/profile/033.jpg',
  },
  {
    userId: '034',
    name: '이명자',
    position: '차장',
    email: 'msin@77cm.com',
    password: 'h0JP5hGE',
    phone: '010-5461-1126',
    birth: '1990-08-30',
    dept: '마케팅팀',
    leftVaca: '18일',
    admin: true,
    joinDate: null,
    img: '/server/images/profile/034.jpg',
  },
  {
    userId: '035',
    name: '차준호',
    position: '과장',
    email: 'seungmin66@77cm.com',
    password: '4WILRuEe',
    phone: '010-9212-3988',
    birth: '1987-07-31',
    dept: '개발팀',
    leftVaca: '13일',
    admin: true,
    joinDate: null,
    img: '/server/images/profile/035.jpg',
  },
  {
    userId: '036',
    name: '김채원',
    position: '대리',
    email: 'jangsugja@77cm.com',
    password: '86MQEGbj',
    phone: '010-4393-2348',
    birth: '1982-05-21',
    dept: '마케팅팀',
    leftVaca: '20일',
    admin: false,
    joinDate: null,
    img: '/server/images/profile/036.jpg',
  },
  {
    userId: '037',
    name: '김영식',
    position: 'CHO',
    email: 'yunjunho@77cm.com',
    password: 'CgU32Myw',
    phone: '010-7859-1096',
    birth: '1979-06-03',
    dept: 'C-level',
    leftVaca: '0일',
    admin: false,
    joinDate: null,
    img: '/server/images/profile/037.jpg',
  },
  {
    userId: '038',
    name: '전영환',
    position: '차장',
    email: 'isangceol@77cm.com',
    password: '6GtqDzDp',
    phone: '010-3573-6983',
    birth: '1965-08-14',
    dept: '마케팅팀',
    leftVaca: '8일',
    admin: true,
    joinDate: null,
    img: '/server/images/profile/038.jpg',
  },
  {
    userId: '039',
    name: '류은지',
    position: '대리',
    email: 'hwangareum@77cm.com',
    password: '2mySwyg9',
    phone: '010-3290-8158',
    birth: '1974-08-14',
    dept: '개발팀',
    leftVaca: '17일',
    admin: true,
    joinDate: null,
    img: '/server/images/profile/039.jpg',
  },
  {
    userId: '040',
    name: '허영진',
    position: '차장',
    email: 'caeweonji@77cm.com',
    password: 'jv5vOQb8',
    phone: '010-5350-8026',
    birth: '1971-01-10',
    dept: '개발팀',
    leftVaca: '16일',
    admin: false,
    joinDate: null,
    img: '/server/images/profile/040.jpg',
  },
  {
    userId: '041',
    name: '최은지',
    position: 'CFO',
    email: 'rgim@77cm.com',
    password: '3OU0Veci',
    phone: '010-4794-3458',
    birth: '1996-05-03',
    dept: 'C-level',
    leftVaca: '10일',
    admin: false,
    joinDate: null,
    img: '/server/images/profile/041.jpg',
  },
  {
    userId: '042',
    name: '임지훈',
    position: '사원',
    email: 'si@77cm.com',
    password: 'w91pH0Gd',
    phone: '010-6460-5331',
    birth: '1956-08-20',
    dept: '재무팀',
    leftVaca: '10일',
    admin: false,
    joinDate: null,
    img: '/server/images/profile/042.jpg',
  },
  {
    userId: '043',
    name: '김은주',
    position: '과장',
    email: 'vbag@77cm.com',
    password: 'Tn9TTvLj',
    phone: '010-8430-8897',
    birth: '1974-07-11',
    dept: '인사팀',
    leftVaca: '20일',
    admin: true,
    joinDate: null,
    img: '/server/images/profile/043.jpg',
  },
  {
    userId: '044',
    name: '김서연',
    position: '사원',
    email: 'sunja80@77cm.com',
    password: 'J4jM4VSp',
    phone: '010-2434-8517',
    birth: '1964-11-02',
    dept: '인사팀',
    leftVaca: '10일',
    admin: true,
    joinDate: null,
    img: '/server/images/profile/044.jpg',
  },
  {
    userId: '045',
    name: '김승현',
    position: '대리',
    email: 'gimyeeun@77cm.com',
    password: '0my6Pcmc',
    phone: '010-5555-2735',
    birth: '1966-06-19',
    dept: '인사팀',
    leftVaca: '14일',
    admin: false,
    joinDate: null,
    img: '/server/images/profile/045.jpg',
  },
  {
    userId: '046',
    name: '박상호',
    position: '사원',
    email: 'jia30@77cm.com',
    password: 'yfH9Up4n',
    phone: '010-2516-5342',
    birth: '1986-05-01',
    dept: '마케팅팀',
    leftVaca: '4일',
    admin: true,
    joinDate: null,
    img: '/server/images/profile/046.jpg',
  },
  {
    userId: '047',
    name: '박옥순',
    position: '부장',
    email: 'coegyeongja@77cm.com',
    password: 'kb29MDup',
    phone: '010-6028-3294',
    birth: '1957-10-17',
    dept: '마케팅팀',
    leftVaca: '13일',
    admin: true,
    joinDate: null,
    img: '/server/images/profile/047.jpg',
  },
  {
    userId: '048',
    name: '김민재',
    position: '차장',
    email: 'myeongjanam@77cm.com',
    password: 'o9WPJaFH',
    phone: '010-5668-3822',
    birth: '1996-03-04',
    dept: '개발팀',
    leftVaca: '15일',
    admin: false,
    joinDate: null,
    img: '/server/images/profile/048.jpg',
  },
  {
    userId: '049',
    name: '박정남',
    position: '대리',
    email: 'gimareum@77cm.com',
    password: '6KKVzXAa',
    phone: '010-2862-7517',
    birth: '1954-01-31',
    dept: '재무팀',
    leftVaca: '14일',
    admin: false,
    joinDate: null,
    img: '/server/images/profile/049.jpg',
  },
  {
    userId: '050',
    name: '진정남',
    position: '차장',
    email: 'heoeungyeong@77cm.com',
    password: 'TP35sPo7',
    phone: '010-7346-9942',
    birth: '1958-08-04',
    dept: '인사팀',
    leftVaca: '8일',
    admin: true,
    joinDate: null,
    img: '/server/images/profile/050.jpg',
  },
  {
    userId: '051',
    name: '박광수',
    position: '부장',
    email: 'tjeong@77cm.com',
    password: 'lY3tMTjv',
    phone: '010-7053-7343',
    birth: '1972-05-28',
    dept: '인사팀',
    leftVaca: '19일',
    admin: false,
    joinDate: null,
    img: '/public/profile-default.png',
  },
  {
    userId: '052',
    name: '이정훈',
    position: '부장',
    email: 'bi@77cm.com',
    password: 'k9yVn4gC',
    phone: '010-4796-6827',
    birth: '1966-03-20',
    dept: '인사팀',
    leftVaca: '16일',
    admin: true,
    joinDate: null,
    img: '/public/profile-default.png',
  },
  {
    userId: '053',
    name: '김지연',
    position: '과장',
    email: 'gimmiyeong@77cm.com',
    password: '5KIpsVfH',
    phone: '010-4153-7263',
    birth: '1967-05-09',
    dept: '마케팅팀',
    leftVaca: '6일',
    admin: false,
    joinDate: null,
    img: '/public/profile-default.png',
  },
  {
    userId: '054',
    name: '김진우',
    position: '차장',
    email: 'yujin09@77cm.com',
    password: 'J317pQhw',
    phone: '010-4282-3310',
    birth: '1988-01-07',
    dept: '마케팅팀',
    leftVaca: '9일',
    admin: true,
    joinDate: null,
    img: '/public/profile-default.png',
  },
  {
    userId: '055',
    name: '송지훈',
    position: '사원',
    email: 'jihyeon56@77cm.com',
    password: 'WHpM8Nqg',
    phone: '010-1992-4763',
    birth: '1963-10-20',
    dept: '개발팀',
    leftVaca: '13일',
    admin: false,
    joinDate: null,
    img: '/public/profile-default.png',
  },
  {
    userId: '056',
    name: '김승현',
    position: '부장',
    email: 'misuggo@77cm.com',
    password: '9mPHNCqK',
    phone: '010-4603-6641',
    birth: '1996-07-28',
    dept: '마케팅팀',
    leftVaca: '6일',
    admin: true,
    joinDate: null,
    img: '/public/profile-default.png',
  },
  {
    userId: '057',
    name: '오정식',
    position: '부장',
    email: 'jeongho04@77cm.com',
    password: 'x2WpV6Id',
    phone: '010-5734-4126',
    birth: '1964-08-12',
    dept: '마케팅팀',
    leftVaca: '0일',
    admin: true,
    joinDate: null,
    img: '/public/profile-default.png',
  },
  {
    userId: '058',
    name: '이수민',
    position: '과장',
    email: 'sanghyeon41@77cm.com',
    password: 'PkRTA1Bh',
    phone: '010-3148-6023',
    birth: '1987-10-24',
    dept: '영업팀',
    leftVaca: '16일',
    admin: false,
    joinDate: null,
    img: '/public/profile-default.png',
  },
  {
    userId: '059',
    name: '손정희',
    position: '대리',
    email: 'jeongja41@77cm.com',
    password: '4XyakaXx',
    phone: '010-4947-1414',
    birth: '1964-09-05',
    dept: '마케팅팀',
    leftVaca: '2일',
    admin: false,
    joinDate: null,
    img: '/public/profile-default.png',
  },
  {
    userId: '060',
    name: '서주원',
    position: '차장',
    email: 'gimmyeongsug@77cm.com',
    password: '1FkntKgk',
    phone: '010-2754-6715',
    birth: '1984-07-25',
    dept: '마케팅팀',
    leftVaca: '15일',
    admin: true,
    joinDate: null,
    img: '/public/profile-default.png',
  },
  {
    userId: '061',
    name: '양현주',
    position: '차장',
    email: 'seunghyeon15@77cm.com',
    password: '0aTW9HTt',
    phone: '010-4125-2285',
    birth: '1959-01-20',
    dept: '영업팀',
    leftVaca: '4일',
    admin: false,
    joinDate: null,
    img: '/public/profile-default.png',
  },
  {
    userId: '062',
    name: '김은영',
    position: '차장',
    email: 'mgim@77cm.com',
    password: 'GO2l4XbI',
    phone: '010-6939-3328',
    birth: '1963-01-16',
    dept: '마케팅팀',
    leftVaca: '14일',
    admin: true,
    joinDate: null,
    img: '/public/profile-default.png',
  },
  {
    userId: '063',
    name: '이현우',
    position: '대리',
    email: 'seohyeon77@77cm.com',
    password: '9SuGVPym',
    phone: '010-5773-4721',
    birth: '1979-11-30',
    dept: '마케팅팀',
    leftVaca: '13일',
    admin: false,
    joinDate: null,
    img: '/public/profile-default.png',
  },
  {
    userId: '064',
    name: '허성수',
    position: '차장',
    email: 'minjunhan@77cm.com',
    password: 'yo4Sz0Vr',
    phone: '010-3324-7576',
    birth: '1960-02-19',
    dept: '인사팀',
    leftVaca: '17일',
    admin: false,
    joinDate: null,
    img: '/public/profile-default.png',
  },
  {
    userId: '065',
    name: '이수민',
    position: '사원',
    email: 'seonghunno@77cm.com',
    password: '7QEuhVvT',
    phone: '010-5984-4826',
    birth: '1984-09-01',
    dept: '영업팀',
    leftVaca: '9일',
    admin: false,
    joinDate: null,
    img: '/public/profile-default.png',
  },
  {
    userId: '066',
    name: '이예원',
    position: '사원',
    email: 'soncunja@77cm.com',
    password: 'vl9RcZd7',
    phone: '010-705-2729',
    birth: '1980-09-29',
    dept: '영업팀',
    leftVaca: '13일',
    admin: true,
    joinDate: null,
    img: '/public/profile-default.png',
  },
  {
    userId: '067',
    name: '고현주',
    position: '대리',
    email: 'seongsu66@77cm.com',
    password: 'q3U9Q2Xu',
    phone: '010-1902-9125',
    birth: '1979-04-20',
    dept: '마케팅팀',
    leftVaca: '9일',
    admin: true,
    joinDate: null,
    img: '/public/profile-default.png',
  },
];
