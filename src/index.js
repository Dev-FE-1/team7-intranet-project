import {
  renderLayout,
  checkLogin,
  userInfoApi,
  checkAdmin,
} from "./utils/common";
import Home from "/src/pages/Home/Home.js";
import Notice from "/src/pages/Notice/Notice.js";
import Vacation from "/src/pages/Vacation/Vacation.js";
import Employee from "/src/pages/Employee/Employee.js";
import Login from "/src/pages/Login/Login.js";

const app = () => {
  init();
  route();
};

// 초기화 함수
const init = () => {
  window.addEventListener("popstate", route);
  // TODO, FIXME : body에 이벤트를 등록하는 것은 좋지 않습니다.
  document.querySelector("body").addEventListener("click", navigatePage);
  // 이벤트를 위임하여, 개별 요소에 이벤트를 부착하는 것보다 코드를 간결하게 유지할 수 있습니다.
  // 하지만, body에 이벤트를 등록하면, 이벤트를 항상 구독하고 있어야 하므로 메모리 누수가 발생할 수 있습니다.
  // 이벤트 버블링, 캡처링 그리고 이벤트 위임에 대해 공부해보시는 것을 추천드려요.
};

// body의 a태그를 클릭했을 때 URL을 변경시키는 함수
const navigatePage = (event) => {
  // 사용되는 a 태그에 대한 이벤트만 처리하는 것이 좋습니다.
  // 전체 body에 이벤트를 걸어놓으면, 이벤트 핸들러가 매번 실행되어 성능에 영향을 줄 수 있습니다.

  if (!event.target.closest("a")) return;
  event.preventDefault(); //

  const anchor = event.target.closest("a");

  if (anchor && anchor.href) {
    history.pushState(null, null, anchor.href);
    route();
  }
};

// 페이지 이동을 처리하는 함수
const route = async () => {
  const path = window.location.pathname;
  const wrap = document.querySelector("#wrap");

  // 로그인 여부 확인 후 해당 값에 따라 라우팅 처리
  if (checkLogin()) {
    // 로그인한 유저의 정보 API 요청

    // 페이지 이동 시 마다 요청을 보내는 것은 비효율적이므로, 최초 로그인 시에만 요청을 보내도록 수정해도 좋아보여요.
    // 아니면 혹시 의도된 코드일까요
    const userInfo = await userInfoApi();

    const root = document.querySelector("#root");
    // Layout 렌더링 적용
    renderLayout(userInfo, root); // 루트 요소가 함수 내에서도 필요하므로 인자로 전달

    // 해당 스위치문을 함수로 추출해볼 수도 있겠네요.
    switch (path) {
      case "/":
        Home(root, userInfo);
        break;
      case "/notice":
        Notice(root);
        break;
      case "/vacation":
        Vacation(root);
        break;
      case "/employee":
        if (checkAdmin()) {
          Employee(root);
        } else {
          history.pushState(null, null, "/");
          route();
        }
        break;
      case "/login":
        Login(wrap, route);
        break;
      default:
        history.pushState(null, null, "/");
        route();
        break;
    }
  } else {
    Login(wrap, route);
  }
};

// DOM 컨텐츠의 로딩이 완료되면 app 함수 실행
document.addEventListener("DOMContentLoaded", app);
