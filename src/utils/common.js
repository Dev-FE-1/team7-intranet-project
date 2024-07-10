import axios from 'axios';
import Header from '/src/layouts/Header/Header.js';
import Navbar from '/src/layouts/Navbar/Navbar.js';

// Layout 사용 로직
export function renderLayout(userInfo) {
  if (!document.querySelector('#root')) {
    document.querySelector('#wrap').innerHTML = `
  <nav class="navbar"></nav>
  <div class="container">
    <header class="header"></header>
    <div id="root"></div>
  </div>
`;
  }

  document.querySelector('.navbar').classList.add('navbar_none');

  // 헤더와 네비게이션바 렌더링
  document.querySelector('.navbar').innerHTML = Navbar(userInfo);
  document.querySelector('.header').innerHTML = Header();

  // 헤더에 위치한 메뉴 버튼에 로직 추가
  document.querySelector('.header_menu').addEventListener('click', () => {
    document.querySelector('.navbar').classList.add('navbar_view');
    document
      .querySelector('.navbar_arrow')
      .classList.remove('navbar_arrow_none');
  });

  // 네비게이션바에 위치한 화살표 버튼에 로직 추가
  document.querySelector('.navbar_arrow').addEventListener('click', () => {
    document.querySelector('.navbar').classList.remove('navbar_view');
    document.querySelector('.navbar_arrow').classList.add('navbar_arrow_none');
  });

  // 네비게이션바에 위치한 로그아웃 버튼에 로직 추가
  document.querySelector('.navbar_logoutBtn').addEventListener('click', () => {
    deleteAllCookies();
  });

  // 반응형 웹 환경에서 네비게이션 바를 이용해 라우팅이 일어날 때 네비게이션 바를 넣도록 하는 로직
  document.querySelector('.navbar').addEventListener('click', (e) => {
    if (!e.target.closest('a')) return;

    document.querySelector('.navbar').classList.remove('navbar_view');
    document.querySelector('.navbar_arrow').classList.add('navbar_arrow_none');
  });
}

// 로그인 여부 확인 로직
export function checkLogin() {
  const userId = getCookie('userId');
  return !!userId;
}

// 브라우저의 쿠키 값을 가져오는 로직
export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
}

// 브라우저에 존재하는 모든 쿠키를 삭제하는 로직
export function deleteAllCookies() {
  const cookies = document.cookie.split(';');

  // 모든 쿠키를 순회하며 삭제
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;

    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
  }
}

// 로그인한 회원의 정보에 대해 API 요청하는 로직
export async function userInfoApi() {
  try {
    const res = await axios.get(`/api/user/info`);
    return res.data;
  } catch (err) {
    console.error('API error:', err);
    return false;
  }
}

export function checkAdmin() {
  return getCookie('admin') === 'true' ? true : false;
}
