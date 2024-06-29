import renderLayout from './utils/common';
import Home from '/src/pages/Home/Home.js';

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
const route = () => {
  const path = window.location.pathname;
  const root = document.querySelector('#root');

  // Layout 렌더링 적용
  renderLayout();

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
