import Header from '/src/layouts/Header/Header.js';
import Navbar from '/src/layouts/Navbar/Navbar.js';

// Layout 사용 로직
export function renderLayout() {
  document.querySelector('.navbar').innerHTML = Navbar();
  document.querySelector('.header').innerHTML = Header();
}

// 로그인 여부 확인 로직
export function checkLogin() {
  console.log(getCookie('userId'));
  return getCookie('userId') ? true : false;
}

// 브라우저의 쿠키 값을 가져오는 로직
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
