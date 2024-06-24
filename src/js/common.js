// selectBox 동작 로직
export function renderSelectBox() {
  const label = document.querySelector('.selectBox__label');
  const list = document.querySelector('.selectBox ul');

  label.addEventListener('click', () => {
    list.className = list.classList.contains('selectBox__list--none')
      ? 'selectBox__list'
      : 'selectBox__list selectBox__list--none';
  });

  const options = document.querySelectorAll('.selectBox li');

  options.forEach((option) => {
    option.addEventListener('click', () => {
      label.innerHTML = `${option.textContent}`;
      list.className = 'selectBox__list selectBox__list--none';
    });
  });
}

// nav 렌더링 로직
export function renderNav() {
  const nav = document.querySelector('.nav');

  nav.innerHTML = `
        <h1 class="nav__logo">
          <a href="/"
            ><img src="/public/logo.png" alt="logo"
          /></a>
        </h1>

        <div class="nav__navbar">
          <ul class="nav__menu">
            <li class="nav__item"><a href="/notice">공지사항</a></li>
            <li class="nav__item"><a href="/vacation">휴가/외출관리</a></li>
            <div class="nav__line"></div>
            <li class="nav__item"><a href="/employee">임직원 관리</a></li>
          </ul>
        </div>

        <div class="nav__profile">
          <div class="nav__user">
            <img
            src="/public/profile-default.png"
            class="nav__photo"
            alt="navprofile 
            />
            <div>
              <div class="nav__name">OOO님</div>
              <div class="nav__admin">관리자 계정</div>
            </div>
          </div>
          <a href="/"
            ><img
              src="/public/logout.png"
              class="nav__logoutBtn"
              alt="logout-btn"
          /></a>
        </div>
  `;
}
