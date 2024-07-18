import "./Button.css";

// 너무 많은 주석은 오히려 코드를 복잡하게 만들 수 있습니다.
// 코드만으로 충분히 이해할 수 있다면, 굳이 주석을 달지 않아도 됩니다.
// 만약 주석을 달고 싶다면, JSDoc을 사용해보세요

/**
 * Button 클래스: 사용자 정의 버튼을 생성합니다.
 * @param {string} label - 버튼 안에 표시될 텍스트 (*필수값)
 * @param {string} type - 버튼 스타일 (기본값은 primary)
 * @param {string} classList - 추가할 CSS 클래스명
 */
export default class Button {
  constructor({ label, type = "primary", classList = "" }) {
    // 기본값 설정을 해주면 props에 해당 값이 없을 때 기본값으로 설정됩니다.
    // 기본값을 설정하기 위해선 props를 구조 분해 할당 해줍니다.
    this.label = label;
    this.type = type;
    this.classList = classList;
  }

  // 기본값이 설정된 props를 사용하여 버튼을 렌더링합니다.
  // 이미 기본값이 설정되어 불필요한 조건을 제거할 수 있습니다.
  render() {
    return `<button class="btn btn_${this.type} ${this.classList}">
      ${this.label}
    </button>`;
  }
}
