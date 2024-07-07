import { renderLayout, checkLogin, userInfoApi } from './utils/common';
import Home from '/src/pages/Home/Home.js';
import Notice from '/src/pages/Notice/Notice.js';
import Vacation from '/src/pages/Vacation/Vacation.js';
import Employee from '/src/pages/Employee/Employee.js';
import Login from '/src/pages/Login/Login.js';

const app = () => {
  init();
  route();
};

// 초기화 함수
const init = () => {
  window.addEventListener('popstate', route);
  document.querySelector('body').addEventListener('click', navigatePage);
};

// body의 a태그를 클릭했을 때 URL을 변경시키는 함수
const navigatePage = (event) => {
  if (!event.target.closest('a')) return;
  event.preventDefault();

  const anchor = event.target.closest('a');

  if (anchor && anchor.href) {
    history.pushState(null, null, anchor.href);
    route();
  }
};

// 페이지 이동을 처리하는 함수
const route = async () => {
  const path = window.location.pathname;
  const wrap = document.querySelector('#wrap');

  // 로그인 여부 확인 후 해당 값에 따라 라우팅 처리
  if (checkLogin()) {
    // 로그인한 유저의 정보 API 요청
    const userInfo = await userInfoApi();

    // Layout 렌더링 적용
    renderLayout(userInfo);

    const root = document.querySelector('#root');

    switch (path) {
      case '/':
        Home(root, userInfo);
        break;
      case '/notice':
        Notice(root);
        break;
      case '/vacation':
        Vacation(root);
        break;
      case '/employee':
        Employee(root);
        break;
      default:
        break;
    }
  } else {
    Login(wrap, route);
  }
};

// DOM 컨텐츠의 로딩이 완료되면 app 함수 실행
document.addEventListener('DOMContentLoaded', app);
