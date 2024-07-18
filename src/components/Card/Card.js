import "/src/components/Card/Card.css";
// {
//   page : { title : String, searchArea : String, content: String},
//   img : {url : String, text: String },
//   fill : boolean,
//   content : String  >> (주의)페이지콘텐츠의 경우 [page]의 value값으로 보내주세요. page:{content:''}
//   classList : String >> 카드 자체에 추가적으로 적용할 클래스
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
    const { page, img, fill, content, dataId, classList } = this.props; // 기본값 설정을 해주면 props에 해당 값이 없을 때 기본값으로 설정됩니다.
    let temp = content;
    let type = type ? renderImageCard() : renderPageCard();

    // 이미지 타입과 페이지 타입을 렌더링 하는 함수를 만들어서 조건을 간소화 해보세요.
    // renderImageCard, renderPageCard와 같은 함수로 분리하여 가독성을 높일 수 있습니다.
    // 또는 조건을 받아 렌더링하는 함수를 만들어도 좋습니다. renderCard(type, data)

    if (img) {
      // 이미지 카드 일때
      type = " card_img";
      temp = `<div class="card_imgWrap">
            <img src="${img.url || ""}" alt="" />
          </div>
          <div class="card_imgText">
            <p>${img.text || ""}</p>
          </div>`;
    } else if (page) {
      // 페이지 카드 일때
      type = " card_page";
      temp = `${page.title ? `<h2 class="page_title">${page.title}</h2>` : ""}
      ${
        page.searchArea
          ? `<div class="page_searchArea">${page.searchArea}</div>`
          : ""
      }<div class="page_content">${page.content || ""}</div>`;
    }

    return `<div class="card${type}${fill ? " card_fill" : ""}${
      classList ? ` ${classList}` : ""
    }"${dataId ? ` data-id=${dataId}` : ""}>
      ${temp}
    </div>`;
  }
}
