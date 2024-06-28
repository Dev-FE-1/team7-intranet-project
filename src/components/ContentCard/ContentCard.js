export default function Card() {
  return `
      <div class="card">카드</div>
      <div class="card card--fill">카드fill</div>
      <div class="card card--img">
        <div class="card__img">
          <img src="//img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FQwnMe%2Fbtrhn3nyjvG%2FcS5In2syEGNI5TzkvA1xhk%2Fimg.png" alt="" />
        </div>
        <div class="card__title">
          <p>공지입니다.</p>
        </div>
      </div>
  `;
}
