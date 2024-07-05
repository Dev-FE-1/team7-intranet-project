import './Employee.css';
import Input from '../../components/Input/Input';

export default function Employee(root) {
  fetch('/api/employee/list?dataLength=15')
    .then((response) => response.json())
    .then((data) => {
      const employeeList = data['data'];
      console.log(employeeList);
      const user = employeeList[42];
      console.log(user);
    });

  root.innerHTML = `
      
      <div class="employee_modal">
                  <div class="modal_employeeImage">
                    <div class="employeeImage">
                      <img src=${user.img} class="employeeImage uploadImage" />
                    </div>
                  </div>
                  <form class="employeeForm">
                    <div class="employeeForm_group">
                      <label for="employee_userID">사원번호</label>
                      <input readonly type="text" id="employee_id" value='${user.userId}' />
                    </div>
                    <div class="employeeForm_group">
                      <label for="employee_name">이름</label>
                      <input readonly type="text" id="employee_name" value=${user.name} />
                    </div>
                    <div class="employeeForm_group">
                      <label for="employee_dept">부서</label>
                      <input readonly type="text" id="employee_dept" value=${user.dept} />
                    </div>
                    <div class="employeeForm_group">
                      <label for="employee_position">직급</label>
                      <input readonly type="text" id="employee_position" value=${user.position} />
                    </div>
                    <div class="employeeForm_group">
                      <label for="employee_birth">생년월일</label>
                      <input type="date" id="employee_birth" value=${user.birth} />
                    </div>
                    <div class="employeeForm_group">
                      <label for="employee_email">이메일</label>
                      <input readonly type="email" id="employee_email" value=${user.email} />
                    </div>
                    <div class="employeeForm_group">
                      <label for="employee_phone">전화번호</label>
                      <input type="tel" id="employee_phone" value=${user.phone} />
                    </div>
                  </form>
                </div>
      </div>
      
      `;

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
