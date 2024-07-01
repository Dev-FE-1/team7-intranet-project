import './Button.css';

export function btn(label, classList) {
  if (classList === undefined) {
    return `<button class="btn btn_primary">${label}</button>`;
  } else {
    return `<button class="btn btn_${classList}">${label}</button>`;
  }
}

function BtnGroup() {
  const bntGroup = document.querySelector('.btn_group');
  bntGroup.innerHTML = btn('Left', 'secondary') + ' ' + btn('Right');
}
