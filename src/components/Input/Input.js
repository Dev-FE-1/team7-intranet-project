import './Input.css';

/* 
  {
    *type (필수) : text(일반 텍스트), bigText(큰 텍스트), password(비밀번호), search(검색 텍스트)
    *className (필수) : class 설정 값
    idName : id 설정 값
    value : 기본 텍스트 설정 값
    placeholder : placeholder 값
    disabled : true(비활성화 O), false(비활성화 X)
    required : true(필수 입력 O), false(필수 입력 X)
    maxLength : 입력 가능한 최대 길이(정수 입력)
    dateMin : type이 date일때 min 속성 값 
  }
*/
export default class Input {
  constructor(props) {
    this.props = props;
  }

  render() {
    const {
      type,
      className,
      idName,
      value,
      placeholder,
      disabled,
      required,
      maxLength,
      dateMin,
    } = this.props;

    switch (type) {
      case 'bigText':
        return `<textarea class="input input_bigText${
          className ? ' ' + className : ''
        }"${idName ? `id="${idName}" name="${idName}"` : ''}${
          placeholder ? `placeholder="${placeholder}"` : ''
        }${maxLength ? `maxLength="${maxLength}"` : ''}${
          disabled ? 'disabled' : ''
        }${required ? 'required' : ''}>${value ? value : ''}</textarea>`;
      case 'search':
        return `<div class="input_search">
  <input class="input${className ? ' ' + className : ''}"
  type="text"
  ${idName ? `id="${idName}" name="${idName}"` : ''}
  ${value ? `value="${value}"` : ''}
  ${placeholder ? `placeholder="${placeholder}"` : ''}
  ${maxLength ? `maxLength="${maxLength}"` : ''}
  ${disabled ? 'disabled' : ''}
  ${required ? 'required' : ''}
  /><a class="input_searchIcon"><svg width="30" height="30" viewBox="0 0 50 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M40.8333 43.75L27.7083 30.625C26.6667 31.4583 25.4688 32.1181 24.1146 32.6042C22.7604 33.0903 21.3194 33.3333 19.7917 33.3333C16.0069 33.3333 12.8042 32.0222 10.1833 29.4C7.5625 26.7778 6.25139 23.575 6.25 19.7917C6.24861 16.0083 7.55972 12.8056 10.1833 10.1833C12.8069 7.56111 16.0097 6.25 19.7917 6.25C23.5736 6.25 26.7771 7.56111 29.4021 10.1833C32.0271 12.8056 33.3375 16.0083 33.3333 19.7917C33.3333 21.3194 33.0903 22.7604 32.6042 24.1146C32.1181 25.4687 31.4583 26.6667 30.625 27.7083L43.75 40.8333L40.8333 43.75ZM19.7917 29.1667C22.3958 29.1667 24.6097 28.2556 26.4333 26.4333C28.2569 24.6111 29.1681 22.3972 29.1667 19.7917C29.1653 17.1861 28.2542 14.9729 26.4333 13.1521C24.6125 11.3313 22.3986 10.4194 19.7917 10.4167C17.1847 10.4139 14.9715 11.3257 13.1521 13.1521C11.3326 14.9785 10.4208 17.1917 10.4167 19.7917C10.4125 22.3917 11.3243 24.6056 13.1521 26.4333C14.9799 28.2611 17.1931 29.1722 19.7917 29.1667Z" fill="currentColor"/></svg></a>
  </div>`;
      case 'date':
        return `<input class="input input_date${
          className ? ' ' + className : ''
        }"type="date"
  ${idName ? `id="${idName}" name="${idName}"` : ''}
  ${value ? `value="${value}"` : ''}
  ${placeholder ? `placeholder="${placeholder}"` : ''}
  ${maxLength ? `maxLength="${maxLength}"` : ''}
  ${disabled ? 'disabled' : ''}
  ${required ? 'required' : ''}
  ${dateMin ? `min="${dateMin}"` : ''}
  />`;

      default:
        return `<input class="input${className ? ' ' + className : ''}"type="${
          type || 'text'
        }"
  ${idName ? `id="${idName}" name="${idName}"` : ''}
  ${value ? `value="${value}"` : ''}
  ${placeholder ? `placeholder="${placeholder}"` : ''}
  ${maxLength ? `maxLength="${maxLength}"` : ''}
  ${disabled ? 'disabled' : ''}
  ${required ? 'required' : ''}
  />`;
    }
  }
}
