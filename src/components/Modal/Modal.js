import Button from '/src/components/Button/Button.js';
import '/src/components/Button/Button.css';
import '/src/components/Card/Card.css';
import '/src/components/Modal/Modal.css';
// {
//   name : 모달 클래스명 String (*필수값)
//   trigger : 모달 활성화 버튼 클래스명 String
//   title : 모달 제목 String
//   buttons : 모달 버튼 Array [{label:'', type:'', classList: ''}]
//   classList : 모달에 추가할 클래스(공백으로 구분) String  >> 'class1 class2'
//   size : 모달 사이즈 'md' 또는 'lg' 또는 'full' String
//   content : 모달 컨텐츠 String
// }

export default class Modal {
  constructor(props) {
    const {
      name,
      trigger,
      title,
      buttons,
      classList = '',
      size = 'sm',
      content,
    } = props;

    if (!name) {
      alert(`모달 컴포넌트 사용 시 name은 필수 값입니다.`);
      return;
    }

    this.name = name;
    this.trigger = trigger;
    this.title = title;
    this.buttons = buttons;
    this.classList = classList;
    this.size = size;
    this.content = content;
  }

  useModal() {
    const modal = document.querySelector(`.${this.name}`);
    // 모달 열기
    const btnOpen = document.querySelectorAll(`.${this.trigger}`);
    btnOpen.forEach((btn) =>
      btn.addEventListener('click', () => modal.classList.toggle('show'))
    );
    // 모달 닫기
    modal.addEventListener('click', (e) => {
      const btnClose = e.target.closest('.modalClose');
      if (!btnClose) return;
      e.target.closest('.modal').classList.toggle('show');
    });
  }

  render() {
    const buttonTemp = this.buttons
      .map((button) => {
        const btn = new Button(button);
        return btn.render();
      })
      .join('');

    return `
      <div class="modal ${this.name} modal_${this.size}${
      this.classList ? ` ${this.classList}` : ''
    }">
        <div class="modal_bb"></div>
        <div class="modal_inner">
          ${this.title ? `<p class="modal_title">${this.title}</p>` : ''}
          <div class="modal_content">${this.content || ''}</div>
          ${buttonTemp}
        </div>
      </div>
    `;
  }
}
