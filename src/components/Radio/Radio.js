import './Radio.css';

//classList - 추가할 클래스명
//labels[] - 선택할 수 있는 옵션 배열
//name - 그룹으로 묶을 이름
//checked - 기본으로 체크 되어야할 대상
//disabled - 활성화/비활성화 유무

//const radio1=new Radio({classList: 'test', labels:['김','박','오'], name:'test', checked : 2, disalbed :false })

class Radio {
  constructor(props) {
    this.props = props;
  }

  render() {
    const { labels, classList, name, checked, disabled } = this.props;
    return `<div class="radio ${classList}">
        ${labels
          .map(
            (label, idx) =>
              `<label for="${name + (idx + 1)}">
                <input id="${name + (idx + 1)}" name="${name}" type="radio" ${
                checked === idx ? 'checked' : ''
              } ${disabled ? 'disabled' : ''}/>
                ${label}
            </label>`
          )
          .join('')}
        </div>`;
  }
}

export default Radio;
