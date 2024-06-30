// {
//   name : 모달 클래스명 String (*필수값)
//   trigger : 모달 활성화 버튼 클래스명 String (*필수값)
//   title : 모달 제목 String
//   buttons : 모달 버튼 Array [{버튼호출할때 필요한 객체값}]
//   classList : 모달에 추가할 클래스(공백으로 구분) String  >> 'class1 class2'
//   size : 모달 사이즈 'md' 또는 'lg' 또는 'full' String
// }

export default function Modal(props) {
  const { name, trigger, title, buttons, classList = '', size = 'sm' } = props;

  if (!name || !trigger) {
    alert(`모달컴포넌트 사용 시 name, trigger는 필수 값입니다.
    Modal({name : '모달이름', trigger : '모달버튼'})`);
    return;
  }

  document.querySelector('#root').insertAdjacentHTML(
    'beforeend',
    `<div class="modal ${name} modal_${size} ${classList}">
        <div class="modal_bb"></div>
        <div class="modal_inner">
          ${title !== undefined ? `<p class="modal_title">${title}</p>` : ''}
          <div class="modal_content"></div>
          ${
            //버튼 컴포넌트 완성되면 Button()수정해야 함
            buttons
              ? `<div class="modal_btns"><button class="btn btn--light modalClose">취소</button><button class="btn modalClose">확인</button></div>`
              : ''
          }
        </div>
      </div>`
  );

  const modal = document.querySelector(`.${name}`);
  //모달 열기
  const btnOpen = document.querySelectorAll(`.${trigger}`);
  btnOpen.forEach((btn) =>
    btn.addEventListener('click', () => modal.classList.toggle('show'))
  );

  //모달 닫기
  modal.addEventListener('click', (e) => {
    const btnClose = e.target.closest('.modalClose');
    if (!btnClose) return;
    e.target.closest('.modal').classList.toggle('show');
  });
}
