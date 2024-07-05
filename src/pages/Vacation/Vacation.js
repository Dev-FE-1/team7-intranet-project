import Modal from '/src/components/Modal/Modal';
import Card from '/src/components/Card/Card';
import SelectBox from '/src/components/SelectBox/SelectBox';
import Button from '/src/components/Button/Button';
import Table from '/src/components/Table/Table';
import Radio from '../../components/Radio/Radio';
import Input from '../../components/Input/Input';

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

  const modal = new Modal({
    name: 'vacation_applyModal',
    title: '신 청',
    size: 'md',
    buttons: [
      { label: '취소', type: 'light', classList: 'modalClose' },
      { label: '확인', classList: 'modalClose' },
    ],
  });

  const typeSelect = new SelectBox({
    className: 'search_type',
    idName: 'test',
    options: ['전체', '연차', '반차', '외출'],
  });

  const btnApply = new Button({ label: '신청', classList: 'modal_apply' });
  const btnTest = new Button({ label: 'test', classList: 'modal_detail' });

  const table = new Table({
    headers: ['구분', '시작일', '종료일'],
    data: data,
  });

  const pageCard = new Card({
    page: {
      title: '휴가/외출 관리',
      searchArea: `${typeSelect.render()}${btnApply.render()}${btnTest.render()}`,
      content: `${table.render()}`,
    },
  });

  root.innerHTML = `
    <div class="vacation">${pageCard.render()}
        ${modal.render()}
    </div>`;

  typeSelect.useSelectBox();

  //신청 버튼 클릭 시
  document.querySelector('.modal_apply').addEventListener('click', () => {
    const typeRadio = new Radio({
      labels: ['연차', '반차', '외출'],
      name: 'vacationCategory',
      classList: '',
      checked: 0,
    });

    const textArea = new Input({ type: 'bigText', className: 'reason' });

    const dateInput = new Input({
      type: 'date',
      className: 'vacation_inputText',
    });
    modal.update({
      content: `<div class="vacation_form">
                  <dl class="vacation_category">
                    <dt class="vacation_categoryTitle">구분</dt>
                    <dd class="vacation_categoryItem">${typeRadio.render()}</dd>
                  </dl>

                  <div class="vacation_date">
                    <dl class="vacation_sDate">
                      <dt class="vacation_sDateTitle">시작일</dt>
                      <dd>
                        ${dateInput.render()}
                      </dd>
                    </dl>
                    <dl class="vacation_eDate">
                      <dt class="vacation_eDateTitle">종료일</dt>
                      <dd>
                      ${dateInput.render()}
                      </dd>
                    </dl>
                  </div>

                  <dl class="vacation_reason">
                    <dt class="vacation_reasonTitle">사유</dt>
                    <dd>
                      ${textArea.render()}
                    </dd>
                  </dl>
                </div>`,
    });
    modal.useModal();

    const categoryItem = root.querySelectorAll('.vacation_categoryItem label');
    categoryItem.forEach((item) =>
      item.addEventListener('change', handleRadio)
    );
  });

  //상세 버튼 클릭 시
  document.querySelector('.modal_detail').addEventListener('click', () => {
    const typeRadio = new Radio({
      labels: ['연차', '반차', '외출'],
      name: 'vacationCategory',
      classList: '',
      checked: 0,
      disabled: true,
    });
    const textArea = new Input({
      type: 'bigText',
      className: 'reason',
      disabled: true,
    });
    const dateInput = new Input({
      type: 'date',
      className: 'vacation_inputText',
      disabled: true,
    });

    modal.update({
      name: '.vacation_detailModal',
      title: '상 세',
      buttons: [{ label: '확인', type: 'light', classList: 'modalClose' }],
      content: `<div class="vacation_form">
                  <dl class="vacation_category">
                    <dt class="vacation_categoryTitle">구분</dt>
                    <dd class="vacation_categoryItem">
                      ${typeRadio.render()}
                    </dd>
                  </dl>

                  <div class="vacation_date">

                    <dl class="vacation_sDate">
                      <dt class="vacation_sDateTitle">시작일</dt>
                      <dd>
                        ${dateInput.render()}
                      </dd>
                    </dl>
                    <dl class="vacation_eDate">
                      <dt class="vacation_eDateTitle">종료일</dt>
                      <dd>
                        ${dateInput.render()}
                      </dd>
                    </dl>

                  </div>

                  <dl class="vacation_reason">
                    <dt class="vacation_reasonTitle">사유</dt>
                    <dd>
                      ${textArea.render()}
                    </dd>
                  </dl>
                </div>`,
    });
    modal.useModal();
  });
}

// 라디오 선택(연차,반차,외출)에 따라 제출 폼 변경시켜주는 함수
function handleRadio() {
  console.log('A');
  const type = this.querySelector('input[name="vacationCategory"]').id;
  const vacationDate = root.querySelector('.vacation_date');

  const dateInput = new Input({
    type: 'date',
    className: 'vacation_inputText',
  });
  const type2STimeSelect = new SelectBox({
    className: 'vacation_sDateSelect',
    options: ['오전 09:00 ~ 14:00', '오후 14:00 ~ 18:00'],
  });
  const type3STimeSelect = new SelectBox({
    className: 'vacation_outingStimeSelect',
    initValue: '시작 시간',
    options: ['09:00', '10:00', '11:00'],
  });
  const type3ETimeSelect = new SelectBox({
    className: 'vacation_outingEtimeSelect',
    initValue: '종료 시간',
    options: ['09:00', '10:00', '11:00'],
  });

  switch (type) {
    case 'vacationCategory1':
      vacationDate.innerHTML = `<dl class="vacation_sDate">
                                  <dt class="vacation_sDateTitle">시작일</dt>
                                  <dd>
                                    ${dateInput.render()}
                                  </dd>
                                </dl>
                                <dl class="vacation_eDate">
                                  <dt class="vacation_eDateTitle">종료일</dt>
                                  <dd>
                                    ${dateInput.render()}
                                  </dd>
                                </dl>`;
      break;
    case 'vacationCategory2':
      vacationDate.innerHTML = `<dl class="vacation_sDate">
                                  <dt class="vacation_sDateTitle">시작일</dt>
                                  <dd>
                                    ${dateInput.render()}
                                  </dd>
                                  <dd>
                                    ${type2STimeSelect.render()}
                                  </dd>
                                </dl>`;

      break;
    case 'vacationCategory3':
      vacationDate.innerHTML = `<dl class="vacation_sDate">
                                  <dt class="vacation_sDateTitle">시작일</dt>
                                  <dd>
                                    ${dateInput.render()}
                                  </dd>
                                </dl>
                                <dl class="vacation_outingTime">
                                  <dt class="vacation_outingTimeTitle">외출 시간</dt>
                                  <dd>
                                    ${type3STimeSelect.render()}
                                  </dd>

                                  <dd>
                                    ${type3ETimeSelect.render()}
                                  </dd>
                                </dl>`;

      break;

    default:
      vacationDate.innerHTML = `<dl class="vacation_sDate">
                                  <dt class="vacation_sDateTitle">시작일</dt>
                                  <dd>
                                  ${type1SDateInput.render()}
                                  </dd>
                                </dl>
                                <dl class="vacation_eDate">
                                  <dt class="vacation_eDateTitle">종료일</dt>
                                  <dd>
                                    ${dateInput.render()}
                                  </dd>
                                </dl>`;
      break;
  }
  type2STimeSelect.useSelectBox();
  type3ETimeSelect.useSelectBox();
}
