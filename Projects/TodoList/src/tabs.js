

class Tab{

    constructor(parent_element, name, content){
        this.parent_element = parent_element;
        this.name = name;
        this.content = content;
    }

    build_DOM = () =>{
        let el = document.createElement('div')
        el.classList.add(this.name);
        el.textContent = this.content;
        if(this.parent_element == null) alert("WHY??")
        this.parent_element.appendChild(el)
        console.log(`${this.parent_element} should have ${el} w/ ${this.name} && ${this.content}`)
    }

    getName = ()=>{
        return this.name
    }

};


export {Tab};