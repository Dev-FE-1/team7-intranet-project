// {
//   page : { title : String, searchArea : boolean, content: String},
//   img : {url : String, text: String },
//   fill : boolean,
//   content : String  >> (주의)페이지콘텐츠의 경우 [page]의 value값으로 보내주세요. page:{content:''}
// }

// 호출 예시
// 기본 - Card({content : `<div>카드 내용</div>`})
// 페이지 카드 - Card({page: {title: '휴가/외출 관리', searchArea : true, content : `<div>페이지 콘텐츠</div>`})
// 이미지 카드 - Card({img: {url: '../a./aaa.jpg',text: '공지입니다'}})
// 배경 - Card({content : `<div>카드 내용</div>`, fill: true})
export default class Card {
  constructor(props) {
    this.props = props || {};
  }
  render() {
    const { page, img, fill, content } = this.props;
    if (img) {
      // 이미지 카드 일때
      return `
        <div class="card card_img${fill ? ' card_fill' : ''}">
          <div class="card_imgWrap">
            <img src="${img.url || ''}" alt="" />
          </div>
          <div class="card_imgText">
            <p>${img.text || ''}</p>
          </div>
        </div>
      `;
    } else if (page) {
      // 페이지 카드 일때
      return `
        <div class="card card_page${fill ? ' card_fill' : ''}">
          ${page.title ? `<h2 class="page_title">${page.title}</h2>` : ''}
          ${page.searchArea ? `<div class="page_searchArea"></div>` : ''}
          <div class="page_content">${page.content || ''}</div>
        </div>
      `;
    } else {
      // 기본 카드 (파라미터값 하나도 없을 때)
      return `<div class="card${fill ? ' card_fill' : ''}">${
        content || ''
      }</div>`;
    }
  }
}
