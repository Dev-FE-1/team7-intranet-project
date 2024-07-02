// label : 버튼 안 문구 (*필수값)
// type : primary 또는 light 로 색상 선택
// classList : 추가 클래스

import './Button.css';
export default class Button {
  constructor(props) {
    this.label = props.label;
    this.type = props.type;
    this.classList = props.classList;
  }

  render() {
    return `<button class="btn btn_${this.type ? this.type : 'primary'} ${
      this.classList ? this.classList : ''
    }">${this.label}</button>`;
  }
}
