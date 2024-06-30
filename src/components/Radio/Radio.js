import './radio.css';
// options=[{id, name, label, checked, disabled}] 
// 아이디(1, type1), 공통으로 묶을 이름, 라디오 버튼명, 선택된상태 유무, 비활성화 상태 유무
export default function radio(Props){
  const radioHtml=Props.map((el)=>{
    return `<div class="radioItem">
      <label for="${el.id}">
      <input id="${el.id}" name="${el.name}" type="radio" ${el.checked ? 'checked' : ''} ${el.disabled ? 'disabled' : ''}/>${el.label}
      </label>
      </div>
      `;
  }).join('');
  return radioHtml;
}