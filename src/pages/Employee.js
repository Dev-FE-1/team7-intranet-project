export default function Employee(root) {
  root.innerHTML = `
    <div class="employee">
      <div class="employee__title">직원목록</div>
      <div class="employee__search">
        <input class="inputText" type="text" name="name" placeholder="이름을 입력해주세요."/>
        <span class="material-icons employee__search">search</span>
      </div>
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th class="employee--userID">사원번호</th>
            <th class="employee--name">이름</th>
            <th class="employee--dept">부서</th>
            <th class="employee--position">직급</th>
            <th class="employee--email">이메일</th>
            <th class="employee--phone">전화번호</th>

          </tr>
        </thead>
        <tbody class="employee__list">
          <tr>
            <td><input type="checkbox" /></td>
            <th class="employee--userID">001</th>
            <th class="employee--name"><img src="/public/profile-default.png" class="profile__image--small">박보검</th>
            <th class="employee--dept">C-level</th>
            <th class="employee--position">대표</th>
            <th class="employee--email">ceo@77cm.com</th>
            <th class="employee--phone">010-7107-6358</th>
          </tr>
          <tr>
            <td><input type="checkbox" /></td>
            <th class="employee--userID">002</th>
            <th class="employee--name" ><img src="/public/profile-default.png" class="profile__image--small">박보검</th>
            <th class="employee--dept">C-level</th>
            <th class="employee--position">대표</th>
            <th class="employee--email">ceo@77cm.com</th>
            <th class="employee--phone">010-7107-6358</th>
          </tr>
          <tr>
            <td><input type="checkbox" /></td>
            <th class="employee--userID">002</th>
            <th class="employee--name"><img src="/public/profile-default.png" class="profile__image--small">박보검</th>
            <th class="employee--dept">C-level</th>
            <th class="employee--position">대표</th>
            <th class="employee--email">ceo@77cm.com</th>
            <th class="employee--phone">010-7107-6358</th>
          </tr>
          <tr>
            <td><input type="checkbox" /></td>
            <th class="employee--userID">002</th>
            <th class="employee--name"><img src="/public/profile-default.png" class="profile__image--small">박보검</th>
            <th class="employee--dept">C-level</th>
            <th class="employee--position">대표</th>
            <th class="employee--email">ceo@77cm.com</th>
            <th class="employee--phone">010-7107-6358</th>
          </tr>
          <tr>
            <td><input type="checkbox" /></td>
            <th class="employee--userID">002</th>
            <th class="employee--name"><img src="/public/profile-default.png" class="profile__image--small">박보검</th>
            <th class="employee--dept">C-level</th>
            <th class="employee--position">대표</th>
            <th class="employee--email">ceo@77cm.com</th>
            <th class="employee--phone">010-7107-6358</th>
          </tr>
          <tr>
            <td><input type="checkbox" /></td>
            <th class="employee--userID">002</th>
            <th class="employee--name"><img src="/public/profile-default.png" class="profile__image--small">박보검</th>
            <th class="employee--dept">C-level</th>
            <th class="employee--position">대표</th>
            <th class="employee--email">ceo@77cm.com</th>
            <th class="employee--phone">010-7107-6358</th>
          </tr>
          <tr>
            <td><input type="checkbox" /></td>
            <th class="employee--userID">002</th>
            <th class="employee--name"><img src="/public/profile-default.png" class="profile__image--small">박보검</th>
            <th class="employee--dept">C-level</th>
            <th class="employee--position">대표</th>
            <th class="employee--email">ceo@77cm.com</th>
            <th class="employee--phone">010-7107-6358</th>
          </tr>         
        </tbody>
      </table>

      <div class="employee__footer">
          <ul class="pagination">
            <li class="btn pagination__btn">처음</li>
            <li class="pagination__arrow">◀</li>
            <li class="pagination__num">1</li>
            <li class="pagination__num">2</li>
            <li class="pagination__num">3</li>
            <li class="pagination__num">4</li>
            <li class="pagination__num">5</li>
            <li class="pagination__arrow">▶</li>
            <li class="btn pagination__btn">마지막</li>
          </ul>
    </div>


    <div class="modal" style="display: none">
      <div class="modal__bb"></div>
      <div class="modal__inner">
        <p class="modal__title">직원 정보</p>
        <div class="modal__content">
          <div class="modal__sub">
            <div class="modal__employeeImage">
              <img
                src="/public/profile-default.png"
                class="profile__image profile__image--modal" />
              <div class="modal__employeeImage--overlay">
                <span>+</span>
              </div>
            </div>
            <form class="employee__form">
              <div class="employee__form--group">
                <label for="employee--userID">사원번호</label>
                <input type="text" id="employee-id" value="001" readonly />
              </div>
              <div class="employee__form--group">
                <label for="employee--name">이름</label>
                <input type="text" id="employee-name" value="박보검" />
              </div>
              <div class="employee__form--group">
                <label for="employee--dept">부서</label>
                <input type="text" id="employee-dept" value="C-level" />
              </div>
              <div class="employee__form--group">
                <label for="employee--position">직급</label>
                <input type="text" id="employee-position" value="대표" />
              </div>
              <div class="employee__form--group">
                <label for="employee--birth">생년월일</label>
                <input type="date" id="employee-birth" value="1970-10-05" />
              </div>
              <div class="employee__form--group">
                <label for="employee--email">이메일</label>
                <input type="email" id="employee-email" value="ceo@77cm.com" />
              </div>
              <div class="employee__form--group">
                <label for="employee--phone">전화번호</label>
                <input type="tel" id="employee-phone" value="010-7107-6358" />
              </div>
              <div class="employee__form--group">
                <label for="employee--date">입사일</label>
                <input type="date" id="employee-date" value="2012-03-05" />
              </div>
            </form>
          </div>
          <div class="modal__btns">
            <button class="btn btn--light">취소</button>
            <button class="btn">수정</button>
          </div>
        </div>
      </div>
    </div>
  `;
}
