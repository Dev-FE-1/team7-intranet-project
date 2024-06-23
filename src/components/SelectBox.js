export default function SelectBox() {
  return `
  <div class="selectBox">
        <label class="selectBox__label">옵션 1</label>
        <svg
          fill=""
          version="1.1"
          class="selectBox__arrow"
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
        <ul class="selectBox__list selectBox__list--none">
          <li class="selectBox__option">옵션 1</li>
          <li class="selectBox__option">옵션 2</li>
          <li class="selectBox__option">옵션 3</li>
        </ul>
      </div>`;
}
