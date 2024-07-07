import Button from '/src/components/Button/Button.js';
import '/src/components/Button/Button.css';
import '/src/components/Card/Card.css';
import '/src/components/Modal/Modal.css';
// {
//   name : 모달 클래스명 String (*필수값)
//   buttons : 모달 버튼 Array [{label:'', type:'', classList: ''}] (*필수값)
//   title : 모달 제목 String
//   classList : 모달에 추가할 클래스(공백으로 구분) String
//   size : 모달 사이즈 'md' 또는 'lg' 또는 'full' String
//   content : 모달 컨텐츠 String
// }

export default class Modal {
  constructor(props) {
    const {
      name,
      title,
      buttons,
      classList = '',
      size = 'sm',
      content = '',
    } = props;

    if (!name || !buttons) {
      alert(`모달 컴포넌트 사용 시 name, button 은 필수 값입니다.`);
      return;
    }

    this.name = name;
    this.title = title;
    this.buttons = buttons;
    this.classList = classList;
    this.size = size;
    this.content = content;
  }

  // 모달 열기
  show() {
    const modal = document.querySelector(`.modal`);
    modal.classList.add('show');
  }

  // 모달 닫기
  hide() {
    const modal = document.querySelector(`.modal`);
    modal.classList.remove('show');
  }

  useModal() {
    //열기
    const modal = document.querySelector(`.modal`);
    modal.classList.add('show');
    //닫기
    modal.addEventListener('click', (e) => {
      const btnClose = e.target.closest('.modalClose');
      if (!btnClose) return;
      e.target.closest('.modal').classList.remove('show');
    });
  }

  update(update) {
    const updateName = update.name || this.name;
    const updateSize = update.size || this.size;
    const updateClassList = update.classList || this.classList;
    const updateTitle = update.title || this.title;
    const updateContent = update.content || this.content;
    const updateButtons = update.buttons || this.buttons;
    const buttonTemp = updateButtons
      .map((button) => {
        const btn = new Button(button);
        return btn.render();
      })
      .join('');

    document.querySelector('.modal').className = 'modal';
    document
      .querySelector('.modal')
      .classList.add(`${updateName}`, `modal_${updateSize}`);
    if (updateClassList) {
      document.querySelector('.modal').classList.add(` ${updateClassList}`);
    }
    document.querySelector('.modal_title').innerHTML = updateTitle;
    document.querySelector('.modal_content').innerHTML = updateContent;
    document.querySelector('.modal_btns').innerHTML = buttonTemp;
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
          <div class="modal_content">${this.content}</div>
          <div class="modal_btns">${buttonTemp}</div>
        </div>
      </div>
    `;
  }
}
