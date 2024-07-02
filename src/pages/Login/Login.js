import './Login.css';

export default function Login(root) {
  root.innerHTML = `<div class="login">
        <div class="login_box">
          <h1 class="logo">
            <img src="public/assets/images/logo.png" alt="77CM" />
          </h1>
          <form class="login_form" action="">
            <input
              type="text"
              class="inputText"
              placeholder="이메일을 입력해주세요."
            />
            <input
              type="text"
              class="inputText"
              placeholder="비밀번호를 입력해주세요."
            />
            <button class="btn">로그인</button>
          </form>
        </div>
      </div>`;
}
