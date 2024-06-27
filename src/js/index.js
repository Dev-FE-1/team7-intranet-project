import Home from '/src/pages/Home.js';
import Notice from '/src/pages/Notice.js';
import Vacation from '/src/pages/Vacation.js';
import Employee from '/src/pages/Employee.js';
import { renderNav } from './common';

const app = () => {
  init();
  route();
};

// 초기화 함수
const init = () => {
  ui();
  window.addEventListener('popstate', route);
  document.querySelector('body').addEventListener('click', navigatePage);
};

// UI 로직 함수
const ui = () => {
  renderNav();
};

// body에 위치한 메뉴 탭을 눌렀을 때 URL을 변경시키는 함수
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
const route = () => {
  const path = window.location.pathname;
  const root = document.querySelector('#root');

  switch (path) {
    case '/':
      Home(root);
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
};

// DOM 컨텐츠의 로딩이 완료되면 app 함수 실행
document.addEventListener('DOMContentLoaded', app);
