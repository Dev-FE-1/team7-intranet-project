import './Employee.css';
import Input from '../../components/Input/Input';

export default function Employee(root) {
  const data = [
    {
      userId: '1',
      name: '김철수',
      dept: '개발부',
      position: '대리',
      birth: '1990-01-01',
      email: 'asdf@adf.com',
      phone: '010-1234-5678',
      img: 'server/images/profile/49.jpg',
    },
  ];

  root.innerHTML = `
      
      <div class="employee_modal">
                  <div class="modal_employeeImage">
                    <div class="employeeImage">
                      <img src=${data[0].img} class="employeeImage uploadImage" />
                    </div>
                  </div>
                  <form class="employeeForm">
                    <div class="employeeForm_group">
                      <label for="employee_userID">사원번호</label>
                      <input readonly type="text" id="employee_id" value='${data[0].userId}' />
                    </div>
                    <div class="employeeForm_group">
                      <label for="employee_name">이름</label>
                      <input readonly type="text" id="employee_name" value=${data[0].name} />
                    </div>
                    <div class="employeeForm_group">
                      <label for="employee_dept">부서</label>
                      <input readonly type="text" id="employee_dept" value=${data[0].dept} />
                    </div>
                    <div class="employeeForm_group">
                      <label for="employee_position">직급</label>
                      <input readonly type="text" id="employee_position" value=${data[0].position} />
                    </div>
                    <div class="employeeForm_group">
                      <label for="employee_birth">생년월일</label>
                      <input type="date" id="employee_birth" value=${data[0].birth} />
                    </div>
                    <div class="employeeForm_group">
                      <label for="employee_email">이메일</label>
                      <input readonly type="email" id="employee_email" value=${data[0].email} />
                    </div>
                    <div class="employeeForm_group">
                      <label for="employee_phone">전화번호</label>
                      <input type="tel" id="employee_phone" value=${data[0].phone} />
                    </div>
                  </form>
                </div>
      </div>
      
      `;

  fetch('/api/employee/user?userId=4')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      // Handle the error here
      console.error(error);
    });

  const uploadImage = document.querySelector('.uploadImage');
  uploadImage.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        uploadImage.src =
          e.target.result || 'server/images/profile/${user.ID}.jpg';
        uploadImage.style.objectFit = 'cover';
        uploadImage.style.width = '300px';
        uploadImage.style.height = '300px';
      };
      reader.readAsDataURL(file);
    });
    input.click();
  });
}
