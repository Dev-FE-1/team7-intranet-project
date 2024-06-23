import Button from '/src/components/Button.js';

export default function Modal() {
  return `
      <div class="modal" style="display: block">
        <div class="modal__bb"></div>
        <div class="modal__inner">
          <p class="modal__title">알 림</p>

          <div class="modal__content">
            <div class="modal__contentText">
              <p>
                알림 내용
              </p>
            </div>
          </div>

          <div class="modal__btns">
            <button class="btn btn--light">취소</button>
            <button class="btn">확인</button>
          </div>
        </div>
      </div>

      <!-- modal--lg(width 80%) -->
      <div class="modal modal--lg" style="display: none">
        <div class="modal__bb"></div>
        <div class="modal__inner">
          <p class="modal__title">신 청</p>

          <div class="modal__content">
            <!-- 예시코드/ 이 영역은 매번 바뀌므로 각 페이지에서 수정 -->
            <ul>
              <li>
                <dl>
                  <dt>구분</dt>
                  <dd>
                    <label>연차</label>
                    <input type="radio" />
                  </dd>
                </dl>
                <dl>
                  <dt>시작일</dt>
                  <dd><input type="date" /></dd>
                </dl>
                <dl>
                  <dt>종료일</dt>
                  <dd><input type="date" /></dd>
                </dl>
                <dl>
                  <dt>사유</dt>
                  <dd><textarea name="" id=""></textarea></dd>
                </dl>
              </li>
            </ul>
            <!-- 예시코드 -->
          </div>

          <div class="modal__btns">
            <button>취소</button>
            <button>확인</button>
          </div>
        </div>
      </div>

      <!-- modal--bgWhite 하얀배경 모달 -->
      <div class="modal modal--lg modal--bgWhite" style="display: none">
        <div class="modal__bb"></div>
        <div class="modal__inner">
          <p class="modal__title">공지사항 제목</p>

          <div class="modal__content"></div>

          <div class="modal__btns">
            <button>닫기</button>
          </div>
        </div>
      </div>
  `;
}
