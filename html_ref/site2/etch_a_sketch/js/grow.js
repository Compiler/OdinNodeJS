

grid_size_r = parseFloat(document.querySelector("#grid_size").value)
grid_size_c = parseFloat(document.querySelector("#grid_size").value)

grid = document.querySelector("#sketch")
var style = document.defaultView.getComputedStyle(grid, null);
sketch_width = parseFloat(style.width.slice(0, -2))
sketch_height = parseFloat(style.height.slice(0, -2))
console.log(style.width.slice(0, -2))
cell_width = Math.ceil(sketch_width / grid_size_c);
cell_height = Math.ceil(sketch_height / grid_size_r);
console.log(sketch_width)
console.log(sketch_height)
console.log(grid_size_c)
console.log(cell_width)
console.log(cell_height)
for(let i = cell_height; i <= sketch_height; i+=cell_height){
    new_row = document.createElement('div');
    new_row.classList.add('row');
    grid.appendChild(new_row)
    for(let j = cell_width; j <= sketch_width; j+=cell_width){
        new_cell = document.createElement('div');
        new_cell.classList.add('item');
        new_cell.style.width = cell_width;
        new_cell.style.height = cell_height;
        new_cell.style.cssText = `width: ${cell_width}px; height: ${cell_height}px;2px solid black`;
        new_row.appendChild(new_cell);   
    }
}



cells = document.querySelectorAll("#sketch .item")
cells.forEach((cell) => {

     // and for each one we add a 'hover' listener
     cell.addEventListener('mouseover', () => {
        cell.style.backgroundColor = "black";
    });

    cell.addEventListener('mouseout', () => {
        //cell.style.backgroundColor = cell.parentNode.style.backgroundColor;
    });
});

rangeInput = document.querySelector("#grid_size")
rangeInput.addEventListener("change", function() {
    txt = document.createElement("in")
    txt.textContent = rangeInput.value
    console.log(rangeInput.value)
    rangeInput.appendChild(txt)
}, false);