export default function Card(props) {
  // {
  //   page : { title : String, searchArea : boolean},
  //   img : {url : String, text: String },
  //   fill : boolean,
  // }

  // 호출 예시
  // 기본 - Card()
  // 페이지 카드 - Card({page: {title: '휴가/외출 관리'})
  // 이미지 카드 - Card({img: {url: '../a./aaa.jpg',text: '공지입니다'}})
  // 배경 - Card({bg: 'fill'})

  if (props) {
    const { page, img, fill } = props;
    const cardbg = fill ? ' card_fill' : '';
    if (img) {
      //이미지 카드 일때
      return `<div class="card card_img${cardbg}">
          <div class="card_imgWrap">
            <img src="${img.url}" alt="" />
          </div>
          <div class="card_imgText">
            <p>${img.text}</p>
          </div>
        </div>`;
    } else if (page) {
      //페이지 카드 일때
      return `<div class="card card_page${cardbg}">
        ${page.title ? `<h2 class="page_title">${page.title}</h2>` : ''}
        ${page.searchArea ? `<div class="page_searchArea"></div>` : ''}
        <div class="page_content"></div>
        </div>`;
    } else {
      //기본카드 배경 처리
      return `<div class="card${cardbg}"></div>`;
    }
  } else {
    //기본 카드
    return `<div class="card"></div>`;
  }
}
