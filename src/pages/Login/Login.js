import Input from '/src/components/Input/Input.js';
import Button from '/src/components/Button/Button.js';
import './Login.css';

export default function Login(root) {
  // ID 입력 Input 컴포넌트
  const idInput = new Input({
    type: 'text',
    className: 'idText',
    idName: 'idText',
    placeholder: '아이디',
    required: true,
  });
  // PW 입력 Input 컴포넌트
  const pwInput = new Input({
    type: 'password',
    className: 'pwText',
    idName: 'pwText',
    placeholder: '비밀번호',
    required: true,
  });
  // 로그인 Button 컴포넌트
  const loginBtn = new Button({
    label: '로그인',
    type: 'primary',
    classList: 'login_btn',
  });

  root.innerHTML = `<div class="login">
        <div class="login_box">
          <h1 class="login_logo">
            <img src="public/assets/images/logo.png" alt="logo" />
          </h1>
          <form class="login_form">
            ${idInput.render()}
            ${pwInput.render()}
            ${loginBtn.render()}
          </form>
          <footer class="login_footer">
            <p>Copyright © DFE_TOY1_TEAM7 All Rights Reserved.</p>
          </footer>
        </div>
      </div>`;
}
