



nav_links = document.querySelectorAll(".nav > div")
console.log(nav_links)
for(const item of nav_links)
    console.log(item.firstElementChild.getAttribute("href"))

nav_links.forEach((link) => {

    // and for each one we add a 'click' listener
    link.addEventListener('click', () => {
        alert(link.firstElementChild.getAttribute("href"));
    });

     // and for each one we add a 'hover' listener
     link.addEventListener('mouseover', () => {
        link.style.backgroundColor = "white";
    });

    link.addEventListener('mouseout', () => {
        link.style.backgroundColor = link.parentNode.style.backgroundColor;
    });
});