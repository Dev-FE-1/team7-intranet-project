import './SelectBox.css';

/* 
  {
    *className (필수) : class 설정 값
    *idName (필수) : 선택된 데이터 정보에 대한 id 설정 값
    initValue : 아무 것도 선택하지 않은 최초 상태에 보여줄 값(입력하지 않을 시, 첫 번째 옵션 적용)
    *options (필수) : 선택할 수 있는 옵션으로, 배열로 입력 (ex : [딸기, 바나나, 포도])
    disabled : true(비활성화 O), false(비활성화 X)
  }
*/
export default class SelectBox {
  constructor(props) {
    this.props = props;
  }

  // SelectBox 컴포넌트를 렌더링하는 함수
  render() {
    const { className, idName, initValue, options, disabled } = this.props;

    return `
    <div class="selectBox${className ? ' ' + className : ''}${
      disabled ? ' selectBox_disabled' : ''
    }">
      <label class="selectBox_label" ${idName ? `id="${idName}"` : ''}>${
      initValue ? initValue : options?.[0] || ''
    }</label>
      <svg
        fill=""
        version="1.1"
        class="selectBox_arrow"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 24 24"
        xml:space="preserve"
        stroke=""
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <style type="text/css">
            .st0 {
              fill: none;
            }
          </style>
          <path d="M6.5,8.5l6,7l6-7H6.5z"></path>
          <rect class="st0" width="24" height="24"></rect>
          <rect class="st0" width="24" height="24"></rect>
        </g>
      </svg>
      <ul class="selectBox_list selectBox_listNone">
        ${
          options
            ? options
                .map((option) => `<li class="selectBox_option">${option}</li>`)
                .join('')
            : ''
        }
      </ul>
    </div>`;
  }

  // selectBox 동작 로직
  useSelectBox() {
    const selectBoxes = document.querySelectorAll('.selectBox');

    selectBoxes.forEach((selectBox) => {
      const label = selectBox.querySelector('.selectBox_label');
      const list = selectBox.querySelector('.selectBox_list');

      // selectBox의 label을 클릭했을 때, 옵션 노출 상태를 토글
      selectBox.addEventListener('click', (e) => {
        if (
          selectBox !== e.target.closest('.selectBox') ||
          e.target
            .closest('.selectBox')
            .classList.contains('selectBox_disabled')
        )
          return;

        // 클릭 시에 이미 열려 있었던 다른 옵션 노출을 비활성화
        selectBoxes.forEach((selectBox) => {
          const selectBoxList = selectBox.querySelector('.selectBox_list');

          if (selectBoxList && selectBoxList !== list) {
            selectBoxList.classList.add('selectBox_listNone');
          }
        });

        // 이벤트 버블링 방지
        e.stopPropagation();

        list.classList.toggle('selectBox_listNone');
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
        const list = selectBox.querySelector('.selectBox_list');

        if (!list.classList.contains('selectBox_listNone')) {
          list.classList.toggle('selectBox_listNone');
        }
      });
    });
  }
}
