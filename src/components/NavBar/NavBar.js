const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'src/components/Navbar/Navbar.css';
document.head.appendChild(link);

export default function Navbar() {
  return `<div class="navbar_logo">
            <a href="/"><img src="/public/assets/images/logo.png" alt="logo"/></a>
          </div>
          <div class="navbar_menu">
            <ul class="navbar_list">
              <li class="navbar_item"><a href="/notice">공지사항</a></li>
              <li class="navbar_item"><a href="/vacation">휴가/외출관리</a></li>
              <div class="navbar_line"></div>
              <li class="navbar_item"><a href="/employee">임직원 관리</a></li>
            </ul>
          </div>
          <div class="navbar_profile">
            <div class="navbar_user">
              <img
              src="/public/assets/images/profile-default.png"
              class="navbar_photo"
              alt="navbarprofile"
              />
              <div>
                <div class="navbar_name">OOO님</div>
                <div class="navbar_admin">관리자 계정</div>
              </div>
            </div>
            <a href="/">
              <svg class="navbar_logoutBtn" width="40" height="40" viewBox="0 0 50 51" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M5.75 40.1004L5.75 40.101C5.75155 41.3814 6.21308 42.4894 7.12145 43.3977C8.02983 44.3061 9.1373 44.7671 10.4167 44.7671H25H25.5V44.2671V40.1004V39.6004H25H10.9167V11.4338H25H25.5V10.9338V6.76709V6.26709H25L10.4167 6.26709L10.4161 6.26709C9.13813 6.26864 8.03113 6.7304 7.12175 7.63824C6.21188 8.54656 5.75 9.65411 5.75 10.9338L5.75 40.1004ZM32.9705 36.2778L33.3238 36.6504L33.6869 36.2873L44.1036 25.8706L44.4571 25.5171L44.1036 25.1635L33.6869 14.7469L33.3238 14.3838L32.9705 14.7564L30.1059 17.7772L29.7709 18.1305L30.1152 18.4748L34.5741 22.9338H18.75H18.25V23.4338V27.6004V28.1004H18.75H34.5741L30.1152 32.5594L29.7709 32.9037L30.1059 33.257L32.9705 36.2778Z" fill="currentColor" stroke="currentColor"/></svg>
            </a>
          </div>`;
}
