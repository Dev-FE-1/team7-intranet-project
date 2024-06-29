import Header from '/src/components/Header/Header.js';
import Navbar from '/src/components/Navbar/Navbar.js';

// Layout 사용 로직
export default function renderLayout() {
  document.querySelector('.navbar').innerHTML = Navbar();
  document.querySelector('.header').innerHTML = Header();
}

// selectBox 동작 로직
export function useSelectBox() {
  const selectBoxes = document.querySelectorAll('.selectBox');

  selectBoxes.forEach((selectBox) => {
    const label = selectBox.querySelector('.selectBox__label');
    const list = selectBox.querySelector('.selectBox__list');

    // selectBox의 label을 클릭했을 때, 옵션 노출 상태를 토글
    selectBox.addEventListener('click', (e) => {
      if (selectBox !== e.target.closest('.selectBox')) return;

      // 클릭 시에 이미 열려 있었던 다른 옵션 노출을 비활성화
      selectBoxes.forEach((selectBox) => {
        const selectBoxList = selectBox.querySelector('.selectBox__list');

        if (selectBoxList && selectBoxList !== list) {
          selectBoxList.classList.add('selectBox__list--none');
        }
      });

      // 이벤트 버블링 방지
      e.stopPropagation();

      list.classList.toggle('selectBox__list--none');
    });

    // 옵션 중 하나를 선택했을 때, 해당 값을 선택해 label로 설정
    list.addEventListener('click', (e) => {
      if (e.target.tagName !== 'LI') return;

      label.innerHTML = e.target.innerHTML;
    });
  });

  // 외부 클릭 시 옵션 비활성화 처리
  document.addEventListener('click', () => {
    selectBoxes.forEach((selectBox) => {
      const list = selectBox.querySelector('.selectBox__list');

      if (!list.classList.contains('selectBox__list--none')) {
        list.classList.toggle('selectBox__list--none');
      }
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
