import './Button.css';
class btn {
  constructor(label) {
    this.label = label;
    this.classList = ['btn'];
  }

  addClass(className) {
    this.classList.push(className);
  }

  render() {
    return `<button class="${this.classList.join(' ')}">${this.label}</button>`;
  }
}

function BtnGroup() {
  const btnGroup = document.querySelector('.btn_group');
  const btnLight = new btn('취소');
  const btnPrimary = new btn('확인');

  btnLight.addClass('btn_light');
  btnPrimary.addClass('btn_primary');

  btnGroup.innerHTML = btnLight.render() + ' ' + btnPrimary.render();
}

document.addEventListener('DOMContentLoaded', BtnGroup);
