
const Player = (name, sym) => {
}

const PlayerManager = () =>{
    let p1 = Player('Luke', 'X');
    let p2 = Player('Lydia', '0');
    let active_player = p1;

    const getActivePlayer = () =>{return active_player;}
    const setActivePlayer = (player) =>{player = active_player}

    return {getActivePlayer, setActivePlayer};
    
}

const Board = ((dim) => {
    const board_id = "div.board"
    let board_dom = document.querySelector(board_id)
    let pm = PlayerManager()
    const generate = () => {
        for(let row = 0; row < dim; row++){
            let row_dom = document.createElement('div')
            row_dom.classList.add('row')
            for(let cell = 0; cell < dim; cell++){
                let cell_dom = document.createElement('div')
                cell_dom.classList.add('cell')
                row_dom.appendChild(cell_dom)
            }
            board_dom.appendChild(row_dom)
        }
    };


  


    const destroy = () => {
        parent = document.querySelector(board_id)
        while (parent.firstChild) parent.removeChild(parent.firstChild);
    }

    const clear_board = (new_dim) =>{
        dim = new_dim
        destroy();
        generate();
    }
    generate()
    return {clear_board};

})(3);



cells = document.querySelectorAll("div.cell")
cells.forEach((cell) => {

     // and for each one we add a 'hover' listener
     cell.addEventListener('mousemove', () => {
        cell.style.backgroundColor = "green";
        cell.style.transparency = 0.1;
        cell.textContent = "X";
    });

    cell.addEventListener('mouseout', () => {
        cell.style.backgroundColor = cell.parentNode.style.backgroundColor;
        cell.textContent = "";
    });
});