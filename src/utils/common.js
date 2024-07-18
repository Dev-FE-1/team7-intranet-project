import axios from "axios";
import Header from "/src/layouts/Header/Header.js";
import Navbar from "/src/layouts/Navbar/Navbar.js";

// 해당 파일의 역할이 무엇인지 불분명합니다.
// 단순히 커먼이라는 이름으로 파일을 만들어서 여러가지 함수를 모아놓는 것은 좋은 방법이지만
// 현제 파일 내부에는, UI 렌더링, 로그인 여부 확인, 쿠키 관련 함수, API 요청 함수 등이 섞여있습니다.
// 비슷한 역할을 하는 함수들을 모아놓는 것이 좋습니다. -> 관심사를 분리해보세요.

// Layout 사용 로직
// 한 함수에 너무 많은 로직이 들어가 있습니다.
export function renderLayout(userInfo) {
  if (!document.querySelector("#root")) {
    document.querySelector("#wrap").innerHTML = `
  <nav class="navbar"></nav>
  <div class="container">
    <header class="header"></header>
    <div id="root"></div>
  </div>
`;
  }

  // 돔 요소를 선택하는 코드가 중복되어 있습니다.
  // 변수로 선언하여 중복을 제거해보세요. 가독성 뿐 아니라 유지보수에도 좋습니다.
  document.querySelector(".navbar").classList.add("navbar_none");

  // 헤더와 네비게이션바 렌더링
  document.querySelector(".navbar").innerHTML = Navbar(userInfo);
  document.querySelector(".header").innerHTML = Header();

  // 헤더에 위치한 메뉴 버튼에 로직 추가
  document.querySelector(".header_menu").addEventListener("click", () => {
    document.querySelector(".navbar").classList.add("navbar_view");
    document.querySelector(".navbar").classList.remove("navbar_none");
    document
      .querySelector(".navbar_arrow")
      .classList.remove("navbar_arrow_none");
  });

  // 네비게이션바에 위치한 화살표 버튼에 로직 추가
  document.querySelector(".navbar_arrow").addEventListener("click", () => {
    document.querySelector(".navbar").classList.add("navbar_none");
    document.querySelector(".navbar").classList.remove("navbar_view");
    document.querySelector(".navbar_arrow").classList.add("navbar_arrow_none");
  });

  // 네비게이션바에 위치한 로그아웃 버튼에 로직 추가
  document.querySelector(".navbar_logoutBtn").addEventListener("click", () => {
    deleteAllCookies();
  });

  // 반응형 웹 환경에서 네비게이션 바를 이용해 라우팅이 일어날 때 네비게이션 바를 넣도록 하는 로직
  document.querySelector(".navbar").addEventListener("click", (e) => {
    if (!e.target.closest("a")) return;

    document.querySelector(".navbar").classList.remove("navbar_view");
    document.querySelector(".navbar_arrow").classList.add("navbar_arrow_none");
  });

  window.scrollTo(0, 0);
}

// 로그인 여부 확인 로직
export function checkLogin() {
  const userId = getCookie("userId");
  const userId2 = getCookie2("userId");

  console.log(userId2);
  return !!userId;
}

// 브라우저의 쿠키 값을 가져오는 로직
export function getCookie(name) {
  // 비슷한 로직을 사용하는 곳이 존재하던데, 하나로 통합해보는 것도 좋습니다.
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

export const getCookie2 = (name) =>
  document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1] ?? null;

// 브라우저에 존재하는 모든 쿠키를 삭제하는 로직
export function deleteAllCookies() {
  const cookies = document.cookie.split(";"); // -> 쿠키를 가져오는 것도 여러곳에서 사용되는데, 함수로 만들어서 사용해보세요.

  // 모든 쿠키를 순회하며 삭제
  // for 문을 사용하는 것도 좋지만, map, forEach 등을 사용해 선언형 프로그래밍과 익숙해지는 것도 좋습니다.
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;

    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  }
}

// export const deleteAllCookies = () =>
//   document.cookie
//     .split(";")
//     .forEach(
//       (cookie) =>
//         (document.cookie = `${cookie
//           .split("=")[0]
//           .trim()}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`)
//     );

// 로그인한 회원의 정보에 대해 API 요청하는 로직
export async function userInfoApi() {
  try {
    const res = await axios.get(`/api/user/info`);
    return res.data;
  } catch (err) {
    console.error("API error:", err);
    return false;
  }
}

// 조건을 최대한 줄이고, 함수를 작게 만드는 것도 좋습니다.
// export function checkAdmin() {
//   return getCookie("admin") === "true" ;
// }

export const checkAdmin = () => getCookie("admin") === "true";
