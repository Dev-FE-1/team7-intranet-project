import './Employee.css';
import Input from '../../components/Input/Input';

export default function Employee(root) {
  const employee = [
    {
      userId: '1',
      name: '김민지',
      position: 'CTO',
      email: 'anjunyeong@77cm.co.kr',
      password: 'sqf1fqEj',
      phone: '010-2594-5588',
      birth: '1992-10-12',
      dept: 'C-level',
      leftVaca: 12,
      admin: false,
      img: '/server/images/profile/13.jpg',
    },
  ];
  const employeeModalContent = `<div class="employee_modal">
              <div class="modal_employeeImage">
                <div class="employeeImage">
                  <img src=${employee[0].img} class="employeeImage uploadImage" />
                </div>
              </div>
              <form class="employeeForm">
                <div class="employeeForm_group">
                  <label for="employee_userID">사원번호</label>
                  <input readonly type="text" id="employee_id" value='${employee[0].userId}' />
                </div>
                <div class="employeeForm_group">
                  <label for="employee_name">이름</label>
                  <input readonly type="text" id="employee_name" value=${employee[0].name} />
                </div>
                <div class="employeeForm_group">
                  <label for="employee_dept">부서</label>
                  <input readonly type="text" id="employee_dept" value=${employee[0].dept} />
                </div>
                <div class="employeeForm_group">
                  <label for="employee_position">직급</label>
                  <input readonly type="text" id="employee_position" value=${employee[0].position} />
                </div>
                <div class="employeeForm_group">
                  <label for="employee_birth">생년월일</label>
                  <input type="date" id="employee_birth" value=${employee[0].birth} />
                </div>
                <div class="employeeForm_group">
                  <label for="employee_email">이메일</label>
                  <input readonly type="email" id="employee_email" value=${employee[0].email} />
                </div>
                <div class="employeeForm_group">
                  <label for="employee_phone">전화번호</label>
                  <input type="tel" id="employee_phone" value=${employee[0].phone} />
                </div>
              </form>
            </div>
        </div>`;

  let allCard = container.querySelectorAll('.card.card_img');
  allCard.forEach((card) => {
    card.addEventListener('click', (e) => {
      if (card) {
        const cardId = card.getAttribute('data-id');
        let data = cardData.find(
          (el) => Number(el.noticeId) === Number(cardId)
        );
        if (data) {
          const employeeModal = new Modal({
            name: 'modal_employee',
            buttons: [
              { label: '닫기', type: 'button', classList: 'modalClose' },
              { label: '저장', type: 'submit', classList: 'modalSave' },
            ],
            title: '사원 정보',
            content: employeeModalContent,
          });
          document.querySelector('.modalContainer').innerHTML =
            noticeModal.render();
          noticeModal.useModal();
        }
      }
    });
  });

  root.innerHTML = `<div class="modal_test" style="width: 400px; height: 400px; background-color: #123456;"></div>`;

  const uploadImage = document.querySelector('.uploadImage');

  uploadImage.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        uploadImage.src = e.target.result;
        uploadImage.style.objectFit = 'cover';
        uploadImage.style.width = '300px';
        uploadImage.style.height = '300px';
      };
      reader.readAsDataURL(file);
    });
    input.click();
  });
}
