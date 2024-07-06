import axios from 'axios';
import createHourOptions from '../../utils/createHourOptions';
import Modal from '/src/components/Modal/Modal';
import Card from '/src/components/Card/Card';
import SelectBox from '/src/components/SelectBox/SelectBox';
import Button from '/src/components/Button/Button';
import Table from '/src/components/Table/Table';
import Radio from '../../components/Radio/Radio';
import Input from '../../components/Input/Input';

import Pagination from '/src/components/Pagination/Pagination';

import '/src/pages/Vacation/Vacation.css';

export default function Vacation(root) {
  fetchData('list');
  let myData = [];
  async function fetchData(filter) {
    try {
      const res = await axios.get(`/api/vacation/${filter}`);
      myData = res.data.data.filter((d) => d.userId === '3');
      renderPage(myData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function renderPage(datas) {
    const modal = new Modal({
      name: 'vacation_applyModal',
      title: '신 청',
      size: 'md',
      buttons: [
        { label: '취소', type: 'light', classList: 'modalClose' },
        { label: '확인', classList: 'btn_apply' },
      ],
    });

    const typeSelect = new SelectBox({
      className: 'search_type',
      idName: 'test',
      options: ['전체', '연차', '반차', '외출'],
    });

    const btnApply = new Button({ label: '신청', classList: 'modal_apply' });

    const table = new Table({
      headers: ['구분', '시작일', '종료일', '사유'],
      data: datas.map((data) => ({
        type: data.type,
        sDate: data.sDate,
        eDate: data.eDate,
        note: data.note,
        dataId: data.vacaId,
      })),
      rowClass: 'modal_detail',
    });

    const pagination = new Pagination({
      totalCnt: datas.length,
      dataPerPage: 5,
      pagingPerPage: 5,
    });

    const pageCard = new Card({
      page: {
        title: '휴가/외출 관리',
        searchArea: `${typeSelect.render()}${btnApply.render()}`,
        content: `${table.render()}`,
      },
    });

    root.innerHTML = `
      <div class="vacation">
        ${pageCard.render()}
        <div class="pagination_container">
          ${pagination.render()}
        </div>
        ${modal.render()}
      </div>`;

    typeSelect.useSelectBox();
    pagination.usePagination();

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
  
                    <div class="vacation_date type1">
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
      modal.show();

      const categoryItem = root.querySelectorAll(
        '.vacation_categoryItem label'
      );
      categoryItem.forEach((item) =>
        item.addEventListener('change', handleRadio)
      );
    });

    //상세 버튼 클릭 시
    document.querySelectorAll('.modal_detail').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const vacaId = e.target.closest('tr').dataset.id;
        const [detailData] = myData.filter((d) => d.vacaId === Number(vacaId));
        let checkedType = 0;
        if (detailData.type === '반차') {
          checkedType = 1;
        } else if (detailData.type === '외출') {
          checkedType = 2;
        }
        const typeRadio = new Radio({
          labels: ['연차', '반차', '외출'],
          name: 'vacationCategory',
          classList: '',
          checked: checkedType,
          disabled: true,
        });
        const textArea = new Input({
          type: 'bigText',
          className: 'reason',
          disabled: true,
          value: detailData.note,
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

                      ${switchCate(detailData.type)}
    
                      <dl class="vacation_reason">
                        <dt class="vacation_reasonTitle">사유</dt>
                        <dd>
                          ${textArea.render()}
                        </dd>
                      </dl>
                    </div>`,
        });
        if (detailData.type === '연차') {
          const sDateInput = new Input({
            type: 'date',
            className: 'vacation_inputText',
            value: detailData.sDate.replaceAll('.', '-'),
            disabled: true,
          });
          const eDateInput = new Input({
            type: 'date',
            className: 'vacation_inputText',
            value: detailData.eDate.replaceAll('.', '-'),
            disabled: true,
          });
          document.querySelector('.vacation_sDate dd').innerHTML =
            sDateInput.render();
          document.querySelector('.vacation_eDate dd').innerHTML =
            eDateInput.render();
        } else if (detailData.type === '반차') {
          const sDateInput = new Input({
            type: 'date',
            className: 'vacation_inputText',
            value: detailData.sDate.split(' ')[0].replaceAll('.', '-'),
            disabled: true,
          });
          const sTimeSelect = new SelectBox({
            className: 'vacation_sDateSelect',
            options: ['오전 09:00 ~ 14:00', '오후 14:00 ~ 18:00'],
            initValue:
              detailData.sDate.split(' ')[1] === '09:00'
                ? '오전 09:00 ~ 14:00'
                : '오후 14:00 ~ 18:00',
            disabled: true,
          });
          document.querySelectorAll('.vacation_sDate dd').forEach((dd, i) => {
            if (i === 0) {
              dd.innerHTML = sDateInput.render();
            } else {
              dd.innerHTML = sTimeSelect.render();
            }
          });
        } else {
          const sDateInput = new Input({
            type: 'date',
            className: 'vacation_inputText',
            value: detailData.sDate.split(' ')[0].replaceAll('.', '-'),
            disabled: true,
          });
          const sTimeSelect = new SelectBox({
            className: 'vacation_outingStimeSelect',
            options: [''],
            initValue: detailData.sDate.split(' ')[1],
            disabled: true,
          });
          const eTimeSelect = new SelectBox({
            className: 'vacation_outingEtimeSelect',
            options: [''],
            initValue: detailData.eDate.split(' ')[1],
            disabled: true,
          });
          document.querySelector('.vacation_sDate dd').innerHTML =
            sDateInput.render();
          document
            .querySelectorAll('.vacation_outingTime dd')
            .forEach((dd, i) => {
              if (i === 0) {
                dd.innerHTML = sTimeSelect.render();
              } else {
                dd.innerHTML = eTimeSelect.render();
              }
            });
        }
        modal.useModal();
      });
    });
    // 신청모달 버튼 클릭 이벤트 처리
    document
      .querySelector('.vacation_applyModal')
      .addEventListener('click', (e) => {
        const btnApply = document.querySelector('.btn_apply');
        const btnClose = document.querySelector('.modalClose');
        if (e.target === btnApply) {
          const type = document
            .querySelector('input[name="vacationCategory"]:checked')
            .closest('label')
            .innerText.trim();
          let sDate = document
            .querySelector('.vacation_sDate .vacation_inputText')
            .value.replaceAll('-', '.');
          let eDate = '';
          if (type === '연차') {
            eDate = document
              .querySelector('.vacation_eDate .vacation_inputText')
              .value.replaceAll('-', '.');
          } else if (type === '반차') {
            const period = document
              .querySelector('.vacation_sDate .selectBox_label')
              .innerText.split(' ')[0];
            if (period === '오전') {
              sDate = `${sDate} 09:00`;
              eDate = `${sDate} 14:00`;
            } else if (period === '오후') {
              sDate = `${sDate} 14:00`;
              eDate = `${sDate} 18:00`;
            }
          } else if (type === '외출') {
            const sTime = document
              .querySelector('.vacation_outingStimeSelect .selectBox_label')
              .innerText.trim();
            const eTime = document
              .querySelector('.vacation_outingEtimeSelect .selectBox_label')
              .innerText.trim();
            sDate = `${sDate} ${sTime}`;
            eDate = `${sDate} ${eTime}`;
          }
          const note = document.querySelector('.reason').value;
          const data = { userId: 3, type, sDate, eDate, note };
          if (validateForm(data)) {
            submitData(data);
            alert('휴가/외출 신청이 완료되었습니다.');
            modal.hide();
          } else {
            alert('필수값이 입력되지 않았습니다.');
            return;
          }
        } else if (e.target === btnClose) {
          modal.hide();
        } else {
          return;
        }
      });
  }

  // 휴가/외출 신청 데이터 전송
  function submitData(data) {
    //서버로 데이터 보내는 로직 추가하고 새로운 데이터 받기
    const newData = myData; //서버로 받은 새로운 데이터로 수정 할 것
    renderPage(newData);
  }
}

// 라디오 선택(연차,반차,외출)에 따라 제출 폼 변경시켜주는 함수
function handleRadio() {
  const type = this.querySelector('input[name="vacationCategory"]')
    .closest('label')
    .innerText.trim();

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
    options: createHourOptions(),
  });
  const type3ETimeSelect = new SelectBox({
    className: 'vacation_outingEtimeSelect',
    initValue: '종료 시간',
    options: createHourOptions(),
  });

  vacationDate.innerHTML = switchCate(type);

  if (type === '연차') {
    document.querySelector('.vacation_sDate dd').innerHTML = dateInput.render();
    document.querySelector('.vacation_eDate dd').innerHTML = dateInput.render();
  } else if (type === '반차') {
    document.querySelectorAll('.vacation_sDate dd').forEach((dd, i) => {
      if (i === 0) {
        dd.innerHTML = dateInput.render();
      } else {
        dd.innerHTML = type2STimeSelect.render();
      }
    });
  } else {
    document.querySelector('.vacation_sDate dd').innerHTML = dateInput.render();
    document.querySelectorAll('.vacation_outingTime dd').forEach((dd, i) => {
      if (i === 0) {
        dd.innerHTML = type3STimeSelect.render();
      } else {
        dd.innerHTML = type3ETimeSelect.render();
      }
    });
  }

  type2STimeSelect.useSelectBox();
  type3STimeSelect.useSelectBox();
  type3ETimeSelect.useSelectBox();
}

// 연차, 반차, 외출에 따라 바뀌는 html을 리턴해주는 함수
function switchCate(type) {
  if (type === '연차') {
    return `<div class="vacation_date type1"><dl class="vacation_sDate">
                                  <dt class="vacation_sDateTitle">시작일</dt>
                                  <dd></dd>
                                </dl>
                                <dl class="vacation_eDate">
                                  <dt class="vacation_eDateTitle">종료일</dt>
                                  <dd></dd>
                                </dl></div>`;
  } else if (type === '반차') {
    return `<div class="vacation_date type2"><dl class="vacation_sDate">
                                  <dt class="vacation_sDateTitle">시작일</dt>
                                  <dd></dd>
                                  <dd></dd>
                                </dl></div>`;
  } else {
    return `<div class="vacation_date type3"><dl class="vacation_sDate">
                                  <dt class="vacation_sDateTitle">시작일</dt>
                                  <dd></dd>
                                </dl>
                                <dl class="vacation_outingTime">
                                  <dt class="vacation_outingTimeTitle">외출 시간</dt>
                                  <dd></dd>
                                  <dd></dd>
                                </dl></div>`;
  }
}

// 휴가/외출 신청 유효성검사
function validateForm() {
  return true;
}
