(()=>{"use strict";let t=document.querySelector("div");new class{constructor(t,e,n){this.parent_element=t,this.name=e,this.content=n}build_content=()=>{let t=document.createElement("tab");t.classList.add(this.name),t.textContent=this.content,null==this.parent_element&&alert("WHY??"),this.parent_element.appendChild(t),console.log(`${this.parent_element} should have ${t} w/ ${this.name} && ${this.content}`)}}(t,"tab1","hello!").build_content()})();