(()=>{"use strict";class e{constructor(e,t,n){this.parent_element=e,this.name=t,this.content=n}build_DOM=()=>{let e=document.createElement("div");e.classList.add(this.name),e.textContent=this.content,null==this.parent_element&&alert("WHY??"),this.parent_element.appendChild(e),console.log(`${this.parent_element} should have ${e} w/ ${this.name} && ${this.content}`)};getName=()=>this.name}let t=document.querySelector("div"),n=new class{constructor(e){this.parent=e,this.items=new Array}build_DOM(){let e=document.createElement("div");e.setAttribute("id","sidebar"),e.textContent="sidebar",this.parent.appendChild(e),this.items.forEach((t=>{let n=document.createElement("div");n.textContent=t.getName(),e.appendChild(n),t.build_DOM()}))}add_item=e=>{this.items.push(e)}}(t);n.add_item(new e(t,"tab_1","hello!")),n.add_item(new e(t,"tab_2","hello2!")),n.build_DOM()})();