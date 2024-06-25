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
  `;
}
