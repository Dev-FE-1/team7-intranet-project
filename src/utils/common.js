import Header from '/src/layouts/Header/Header.js';
import Navbar from '/src/layouts/Navbar/Navbar.js';

// Layout 사용 로직
export function renderLayout() {
  document.querySelector('.navbar').innerHTML = Navbar();
  document.querySelector('.header').innerHTML = Header();
}

// 로그인 여부 확인 로직
export function checkLogin() {
  return false;
}
