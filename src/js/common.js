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
            alt="navprofile"
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

// selectBox 동작 로직
export function useSelectBox() {
  const labels = document.querySelectorAll('.selectBox__label');
  labels.forEach((label) =>
    label.addEventListener('click', (e) => {
      const list = e.target.nextElementSibling.nextElementSibling;

      list.className = list.classList.contains('selectBox__list--none')
        ? 'selectBox__list'
        : 'selectBox__list selectBox__list--none';
    })
  );

  const options = document.querySelectorAll('.selectBox li');

  options.forEach((option) => {
    option.addEventListener('click', (e) => {
      // console.log(e.target);
      // label.innerHTML = `${option.textContent}`;
      // list.className = 'selectBox__list selectBox__list--none';
    });
  });
}

// modal 동작 로직
// opens = [{btn:'버튼클래스명', modal:'모달클래스명'}]
export function useModal(opens) {
  const modals = document.querySelectorAll('.modal');

  // modal 닫기
  modals.forEach((modal) =>
    modal.addEventListener('click', (e) => {
      const btnClose = e.target.closest('.modalClose');
      if (!btnClose) return;
      console.log();
      modal.classList.add('modal--none');
    })
  );

  // modal 열기
  opens.forEach((open) => {
    const btns = document.querySelectorAll(`.${open.btn}`);
    btns.forEach((btn) =>
      btn.addEventListener('click', () => {
        document
          .querySelector(`.${open.modal}`)
          .classList.remove('modal--none');
      })
    );
  });
}
