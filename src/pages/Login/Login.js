import Input from '/src/components/Input/Input.js';
import Button from '/src/components/Button/Button.js';
import Modal from '/src/components/Modal/Modal.js';
import axios from 'axios';
import './Login.css';

export default function Login(wrap, route) {
  // 현재 주소창 URL을 '/login'으로 설정
  history.pushState(null, null, '/login');

  // ID 입력 Input 컴포넌트
  const idInput = new Input({
    type: 'text',
    className: 'idText',
    idName: 'idText',
    placeholder: '아이디',
  });
  // PW 입력 Input 컴포넌트
  const pwInput = new Input({
    type: 'password',
    className: 'pwText',
    idName: 'pwText',
    placeholder: '비밀번호',
  });
  // 로그인 Button 컴포넌트
  const loginBtn = new Button({
    label: '로그인',
    type: 'primary',
    classList: 'login_btn',
  });
  // 로그인 알림 Modal 컴포넌트
  const loginModal = new Modal({
    name: 'login_modal',
    buttons: [
      {
        label: '확인',
        type: 'primary',
        classList: 'login_modalBtn modalClose',
      },
    ],
    title: '알 림',
    content: '아이디와 비밀번호를 확인해 주세요.',
  });

  wrap.innerHTML = `<div class="login">
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
          ${loginModal.render()}
        </div>
      </div>`;

  // 로그인 버튼이 눌렸을 때 실행시킬 동작을 연결하는 이벤트 리스너
  document.querySelector('.login_btn').addEventListener('click', async (e) => {
    e.preventDefault();

    try {
      const success = await loginApi();

      if (success) {
        history.pushState(null, null, '/');
        route();
      } else {
        loginModal.useModal();
      }
    } catch (err) {
      loginModal.useModal();
    }
  });
}

// 로그인 API 실행 함수
const loginApi = async () => {
  const id = document.querySelector('.idText').value;
  const pw = document.querySelector('.pwText').value;

  try {
    const res = await axios.post('/api/user/login', { id, pw });
    return res.status === 200;
  } catch (err) {
    console.error('API error:', err);
    return false;
  }
};
