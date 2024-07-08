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
  const userId = getUserIdFromCookie();
  async function fetchData(filter) {
    try {
      const res = await axios.get(`/api/vacation/${filter}`);
      myData = res.data.filter((d) => d.userId === '3');
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
        dateMin: new Date().toISOString().split('T')[0],
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
                    <p class="form_alert">* 시작일, 종료일, 외출시간이 입력되었는지 확인 해주세요.</p>
                  </div>
                  `,
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
          name: 'vacation_detailModal',
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
              eDate = `${sDate} 14:00`;
              sDate = `${sDate} 09:00`;
            } else if (period === '오후') {
              eDate = `${sDate} 18:00`;
              sDate = `${sDate} 14:00`;
            }
          } else if (type === '외출') {
            const sTime = document
              .querySelector('.vacation_outingStimeSelect .selectBox_label')
              .innerText.trim();
            const eTime = document
              .querySelector('.vacation_outingEtimeSelect .selectBox_label')
              .innerText.trim();
            eDate = `${sDate} ${eTime}`;
            sDate = `${sDate} ${sTime}`;
          }
          const note = document.querySelector('.reason').value;
          const data = { userId: userId, type, sDate, eDate, note };
          //유효성 검사 후 통과하면 데이터 전송함수 호출
          if (validateForm(data)) {
            submitData(data);
          } else {
            document.querySelector('.modal').classList.add('shake');
            document.querySelector('.form_alert').classList.add('show');
            document
              .querySelector('.modal')
              .addEventListener('animationend', () => {
                document.querySelector('.modal').classList.remove('shake');
              });
            return;
          }
        } else if (e.target === btnClose) {
          modal.hide();
        } else {
          return;
        }
      });

    // 서버로 신청 폼 데이터를 전송하는 함수
    async function submitData(data) {
      try {
        const response = await axios.post('/api/vacation', data);
        modal.update({
          size: 'sm',
          name: 'vacation_doneModal',
          buttons: [{ label: '확인', type: 'light', classList: 'modalClose' }],
          content: `신청이 완료되었습니다.`,
          classList: 'show',
        });
        document
          .querySelector('.vacation_doneModal')
          .addEventListener('click', (e) => {
            if (e.target !== document.querySelector('.modalClose')) return;
            fetchData('list');
          });
        // 여기에 성공 시 처리할 로직을 추가하세요 (예: 사용자에게 성공 메시지 보여주기)
      } catch (error) {
        console.error('신청 제출 중 오류가 발생했습니다.', error);
        // 여기에 오류 발생 시 처리할 로직을 추가하세요 (예: 오류 메시지 표시)
      }
    }
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
    dateMin: new Date().toISOString().split('T')[0],
  });

  vacationDate.innerHTML = switchCate(type);

  if (type === '연차') {
    document.querySelector('.vacation_sDate dd').innerHTML = dateInput.render();
    document.querySelector('.vacation_eDate dd').innerHTML = dateInput.render();
  } else if (type === '반차') {
    const type2STimeSelect = new SelectBox({
      className: 'vacation_sDateSelect',
      options: ['오전 09:00 ~ 14:00', '오후 14:00 ~ 18:00'],
    });
    document.querySelectorAll('.vacation_sDate dd').forEach((dd, i) => {
      if (i === 0) {
        dd.innerHTML = dateInput.render();
      } else {
        dd.innerHTML = type2STimeSelect.render();
      }
    });
    type2STimeSelect.useSelectBox();
  } else {
    //type === '외출'
    const type3DateInput = new Input({
      type: 'date',
      className: 'vacation_inputText',
      dateMin: new Date().toISOString().split('T')[0],
      value: new Date().toISOString().split('T')[0],
    });

    document.querySelector('.vacation_sDate dd').innerHTML =
      type3DateInput.render();

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

    document.querySelectorAll('.vacation_outingTime dd').forEach((dd, i) => {
      if (i === 0) {
        dd.innerHTML = type3STimeSelect.render();
      } else {
        dd.innerHTML = type3ETimeSelect.render();
      }
    });

    type3STimeSelect.useSelectBox();

    document
      .querySelector('.vacation_date.type3 .vacation_inputText')
      .addEventListener('change', (e) => {
        const selectedDate = e.target.value;
        const updateStime = new SelectBox({
          className: 'vacation_outingStimeSelect',
          initValue: '시작 시간',
          options: createHourOptions(selectedDate),
        });
        const updateEtime = new SelectBox({
          className: 'vacation_outingEtimeSelect',
          initValue: '종료 시간',
          options: createHourOptions(selectedDate),
        });
        document
          .querySelectorAll('.vacation_outingTime dd')
          .forEach((dd, i) => {
            if (i === 0) {
              dd.innerHTML = updateStime.render();
            } else {
              dd.innerHTML = updateEtime.render();
            }
          });
        updateStime.useSelectBox();
      });
  }
  document.querySelector('.form_alert').classList.remove('show');
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
function validateForm(data) {
  const { type, sDate, eDate } = data;
  const alert = document.querySelector('.form_alert');

  // 1. 연차 필수 입력 항목 확인
  if (type === '연차') {
    if (!sDate || !eDate) {
      alert.innerText = '* 시작일과 종료일을 모두 입력해주세요.';
      return false;
    }
  }

  // 2. 반차 필수 입력 항목 확인
  if (type === '반차') {
    const hasDateError = !/\d{4}.\d{2}.\d{2}/.test(sDate);
    if (hasDateError) {
      alert.innerText = '* 시작일을 입력해주세요.';
      return false;
    }
  }

  // 3. 외출 필수 입력 항목 확인
  if (type === '외출') {
    const dateWithTimeRegex = /^\d{4}.\d{2}.\d{2} \d{2}:\d{2}$/;
    const hasDateTimeError =
      !dateWithTimeRegex.test(sDate) || !dateWithTimeRegex.test(eDate);
    if (hasDateTimeError) {
      alert.innerText = '* 시작일, 시간을 모두 입력해주세요.';
      return false;
    }
  }

  // 4. 연차일 경우 날짜 비교
  if (type === '연차') {
    const startDate = new Date(sDate.replaceAll('-', '.'));
    const endDate = new Date(eDate.replaceAll('-', '.'));
    if (startDate > endDate) {
      alert.innerText = '* 종료일은 시작일보다 뒤에 있어야 합니다.';
      return false; // 종료일이 시작일보다 빠른 경우 false 반환
    }
  }

  // 5. 외출일 경우 시간 비교
  if (type === '외출') {
    const startTime = sDate.split(' ')[1];
    const endTime = eDate.split(' ')[1];
    if (startTime >= endTime) {
      alert.innerText = '* 종료 시간은 시작 시간보다 뒤에 있어야 합니다.';
      return false; // 종료 시간이 시작 시간보다 빠르거나 같은 경우 false 반환
    }
  }

  // 모든 조건을 통과하면 true 반환
  return true;
}

function getUserIdFromCookie() {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'userId') {
      return value;
    }
  }
  return null; // 해당 쿠키 이름을 가진 쿠키를 찾지 못한 경우
}
