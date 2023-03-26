

class Sidebar{

    constructor(parent){
        this.parent = parent
        this.items = new Array()
    }
    build_DOM(){
        let el = document.createElement('div')
        el.setAttribute('id', 'sidebar');
        el.textContent = 'sidebar'

        this.parent.appendChild(el)
        this.items.forEach((x)=>{
            let tab_name = document.createElement('div')
            tab_name.textContent = x.getName()
            el.appendChild(tab_name)
            x.build_DOM();
        })
    }
    add_item = (item) =>{
        this.items.push(item)
    }

};


export {Sidebar};