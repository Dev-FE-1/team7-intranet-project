import Modal from '/src/components/Modal/Modal';
import Card from '/src/components/Card/Card';
import SelectBox from '/src/components/SelectBox/SelectBox';
import Button from '/src/components/Button/Button';
import Table from '/src/components/Table/Table';
// import Pagination from '/src/components/Pagination/Pagination';

import '/src/pages/Vacation/Vacation.css';

export default function Vacation(root) {
  const data = [
    { type: '연차', sDate: '2024.06.10', eDate: '2024.06.12' },
    { type: '연차', sDate: '2024.06.10', eDate: '2024.06.12' },
    {
      type: '반차(오전)',
      sDate: '2024.06.10 09:00',
      eDate: '2024.06.10 14:00',
    },
    { type: '연차', sDate: '2024.06.10', eDate: '2024.06.12' },
    {
      type: '반차(오후)',
      sDate: '2024.06.10 14:00',
      eDate: '2024.06.10 18:00',
    },
    { type: '연차', sDate: '2024.06.10', eDate: '2024.06.12' },
    { type: '외출', sDate: '2024.06.10 10:00', eDate: '2024.06.12 12:00' },
    { type: '연차', sDate: '2024.06.10', eDate: '2024.06.12' },
    { type: '연차', sDate: '2024.06.10', eDate: '2024.06.12' },
    { type: '연차', sDate: '2024.06.10', eDate: '2024.06.12' },
  ];

  const applyModal = new Modal({
    name: 'vacation_applyModal',
    type: 'form',
    title: '신 청',
    buttons: [{ label: '취소', type: 'light' }, { label: '확인' }],
    trigger: 'modal_apply',
    size: 'md',
    content: `<div class="vacation_form">
                  <dl class="vacation_category">
                    <dt class="vacation_categoryTitle">구분</dt>
                    <dd class="vacation_categoryItem">
                      <label for="type1">
                        <input id="type1" name="vacationCategory" type="radio" checked/>
                        연차
                      </label>
                    </dd>
                    <dd class="vacation_categoryItem">
                      <label for="type2">
                        <input id="type2" name="vacationCategory" type="radio"/>
                        반차
                      </label>
                    </dd>
                    <dd class="vacation_categoryItem">
                      <label for="type3">
                        <input id="type3" name="vacationCategory" type="radio"/>
                        외출
                      </label>
                    </dd>
                  </dl>

                  <div class="vacation_date">
                    <dl class="vacation_sDate">
                      <dt class="vacation_sDateTitle">시작일</dt>
                      <dd>
                        <input class="vacation_inputText inputText" type="date" />
                      </dd>
                    </dl>
                    <dl class="vacation_eDate">
                      <dt class="vacation_eDateTitle">종료일</dt>
                      <dd>
                        <input class="vacation_inputText inputText" type="date"/>
                      </dd>
                    </dl>
                  </div>

                  <dl class="vacation_reason">
                    <dt class="vacation_reasonTitle">사유</dt>
                    <dd>
                      <textarea
                        class="vacation_inputTextarea inputText"
                        name=""
                        id=""
                      ></textarea>
                    </dd>
                  </dl>
                </div>`,
  });

  const detailModal = new Modal({
    name: 'vacation_detailModal',
    type: 'detail',
    title: '상 세',
    buttons: [{ label: '확인', type: 'ligth' }],
    trigger: 'modal_detail',
    size: 'md',
    content: `<div class="vacation_form">
                  <dl class="vacation_category">
                    <dt class="vacation_categoryTitle">구분</dt>
                    <dd class="vacation_categoryItem">
                      <input type="radio" checked disabled />
                      <label for="type1">연차</label>
                    </dd>
                    <dd class="vacation_categoryItem">
                      <input type="radio" disabled/>
                      <label for="type2">반차</label>
                    </dd>
                    <dd class="vacation_categoryItem">
                      <input type="radio" disabled/>
                      <label for="type3">외출</label>
                    </dd>
                  </dl>

                  <div class="vacation_date">

                    <dl class="vacation_sDate">
                      <dt class="vacation_sDateTitle">시작일</dt>
                      <dd>
                        <input
                          class="vacation_inputText inputText inputText--disabled"
                          type="date"
                          disabled
                        />
                      </dd>
                    </dl>
                    <dl class="vacation_eDate">
                      <dt class="vacation_eDateTitle">종료일</dt>
                      <dd>
                        <input
                          class="vacation_inputText inputText inputText--disabled"
                          type="date"
                          disabled
                        />
                      </dd>
                    </dl>

                  </div>

                  <dl class="vacation_reason">
                    <dt class="vacation_reasonTitle">사유</dt>
                    <dd>
                      <textarea
                        class="vacation_inputTextarea inputText inputText--disabled"
                        name=""
                        id=""
                        disabled
                      ></textarea>
                    </dd>
                  </dl>
                </div>`,
  });

  const typeSelect = new SelectBox({
    className: 'search_type',
    idName: 'test',
    options: ['전체', '연차', '반차', '외출'],
  });

  const btnApply = new Button({ label: '신청', classList: 'modal_apply' });

  const table = new Table({
    headers: ['구분', '시작일', '종료일'],
    data: data,
  });

  // const pagination = new Pagination({
  //   totalCnt: 10,
  //   dataPerPage: 5,
  //   pagingPerPage: 5,
  // });

  const pageCard = new Card({
    page: {
      title: '휴가/외출 관리',
      searchArea: `${typeSelect.render()}${btnApply.render()}`,
      content: `${table.render()}`,
    },
  });

  root.innerHTML = `
    <div class="vacation">${pageCard.render()}
        ${applyModal.render()}
        ${detailModal.render()}
    </div>`;

  applyModal.useModal();
  detailModal.useModal();
  typeSelect.useSelectBox();

  const categoryItem = root.querySelectorAll('.vacation_categoryItem');
  categoryItem.forEach((item) => item.addEventListener('change', handleRadio));
}

// 라디오 선택(연차,반차,외출)에 따라 제출 폼 변경시켜주는 함수
function handleRadio() {
  const type = this.querySelector('input[name="vacationCategory"]').id;
  const vacationDate = root.querySelector('.vacation__date');
  switch (type) {
    case 'type1':
      vacationDate.innerHTML = `<dl class="vacation__sDate">
                                  <dt class="vacation__sDateTitle">시작일</dt>
                                  <dd>
                                    <input class="vacation__inputText inputText" type="date" />
                                  </dd>
                                </dl>
                                <dl class="vacation__eDate">
                                  <dt class="vacation__eDateTitle">종료일</dt>
                                  <dd>
                                    <input class="vacation__inputText inputText" type="date"/>
                                  </dd>
                                </dl>`;
      break;

    case 'type2':
      vacationDate.innerHTML = `<dl class="vacation__sDate">
                                  <dt class="vacation__sDateTitle">시작일</dt>
                                  <dd>
                                    <input class="vacation__inputText inputText" type="date"/>
                                  </dd>
                                  <dd>
                                    <div class="vacation__sDateSelect selectBox">
                                      <label class="selectBox__label">오전 09:00 ~ 14:00</label>
                                      <svg fill="" version="1.1" class="selectBox__arrow" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" xml:space="preserve" stroke="">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                          <style type="text/css">
                                            .st0 {
                                              fill: none;
                                            }
                                          </style>
                                          <path d="M6.5,8.5l6,7l6-7H6.5z"></path>
                                          <rect class="st0" width="24" height="24"></rect>
                                          <rect class="st0" width="24" height="24"></rect>
                                        </g>
                                      </svg>
                                      <ul class="selectBox__list selectBox__list--none">
                                        <li class="selectBox__option">
                                          오전 09:00 ~ 14:00
                                        </li>
                                        <li class="selectBox__option">
                                          오후 14:00 ~ 18:00
                                        </li>
                                      </ul>
                                    </div>
                                  </dd>
                                </dl>`;
      // useSelectBox();
      break;

    case 'type3':
      vacationDate.innerHTML = `<dl class="vacation__sDate">
                                  <dt class="vacation__sDateTitle">시작일</dt>
                                  <dd>
                                    <input class="vacation__inputText inputText" type="date"/>
                                  </dd>
                                </dl>
                                <dl class="vacation__outingTime">
                                  <dt class="vacation__outingTimeTitle">외출 시간</dt>
                                  <dd>
                                    <div class="vacation__outingStimeSelect selectBox">
                                      <label class="selectBox__label">시작 시간</label>
                                      <svg fill="" version="1.1" class="selectBox__arrow" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" xml:space="preserve" stroke="">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                          <style type="text/css">
                                            .st0 {
                                              fill: none;
                                            }
                                          </style>
                                          <path d="M6.5,8.5l6,7l6-7H6.5z"></path>
                                          <rect class="st0" width="24" height="24"></rect>
                                          <rect class="st0" width="24" height="24"></rect>
                                        </g>
                                      </svg>
                                      <ul class="selectBox__list selectBox__list--none">
                                        <li class="selectBox__option">옵션 1</li>
                                        <li class="selectBox__option">옵션 2</li>
                                        <li class="selectBox__option">옵션 3</li>
                                      </ul>
                                    </div>
                                  </dd>

                                  <dd>
                                    <div class="vacation__outingEtimeSelect selectBox">
                                      <label class="selectBox__label">종료 시간</label>
                                      <svg fill="" version="1.1" class="selectBox__arrow" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" xml:space="preserve" stroke="">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                        <g id="SVGRepo_iconCarrier">
                                          <style type="text/css">
                                            .st0 {
                                              fill: none;
                                            }
                                          </style>
                                          <path d="M6.5,8.5l6,7l6-7H6.5z"></path>
                                          <rect class="st0" width="24" height="24"></rect>
                                          <rect class="st0" width="24" height="24"></rect>
                                        </g>
                                      </svg>
                                      <ul class="selectBox__list selectBox__list--none">
                                        <li class="selectBox__option">옵션 1</li>
                                        <li class="selectBox__option">옵션 2</li>
                                        <li class="selectBox__option">옵션 3</li>
                                      </ul>
                                    </div>
                                  </dd>
                                </dl>`;
      // useSelectBox();
      break;

    default:
      vacationDate.innerHTML = `<dl class="vacation__sDate">
                                  <dt class="vacation__sDateTitle">시작일</dt>
                                  <dd>
                                    <input class="vacation__inputText inputText" type="date" />
                                  </dd>
                                </dl>
                                <dl class="vacation__eDate">
                                  <dt class="vacation__eDateTitle">종료일</dt>
                                  <dd>
                                    <input class="vacation__inputText inputText" type="date"/>
                                  </dd>
                                </dl>`;
      break;
  }
}
