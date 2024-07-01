import './radio.css';

//id - 고유 id
//name - 그룹으로 묶을 이름
//label - 라디오 라벨
//checked - 기본으로 체크 되어있는지 유무
//disabled - 활성화/비활성화 유무

// const radio1=new Radio([{id:1, name:'그룹1', label:'연차', checked:true, disabled:true},
//                        {id:2, name:'그룹1', label:'배차', checked:true, disabled:false} ]);

class Radio{
    constructor(Props){
        this.Props=Props;
    }

    render(){
        return this.Props.map((p)=>`<div class="radioItem">
        <label for="${p.id}">
        <input id="${p.id}" name="${p.name}" type="radio" ${p.checked ? 'checked' : ''} ${p.disabled ? 'disabled' : ''}/>
        ${p.label}
        </label>
        </div>`).join('') 
        ;
    }
}

export default Radio;