export default function Notice(root) {

  


  root.innerHTML = `<div class='notice'><div class="notice__label">공지사항</div> 
            <div class="notice__right">  
              <div class="notice__search">
                <input type="text" class="inputText notice__inputText" placeholder="검색어를 입력해주세요." />
              </div>
            <input type="button" value="등록" class="btn"/>
            </div>
            <div class="notice__container">
            <div class="card__img">
          <img src="/public/temp-image.jpg" alt="puppy"/>
        </div>
        <div class="card__title">
          <p>공지입니다.</p>
        </div>
          </div>
</div>`;
}
