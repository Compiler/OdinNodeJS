
const Player = (name, sym) => {
    return {name, sym}
}

const PlayerManager = () =>{
    let players = [Player('Luke', 'X'), Player('Lydia', '0')]
    let player_idx = 0
    let active_player = players[player_idx];

    const getActivePlayer = () =>{return active_player;}
    const setActivePlayer = (player) =>{player = active_player}
    const moveToNextPlayer = () =>{
        player_idx = (player_idx + 1) % players.length
        active_player = players[player_idx]
    }
    return {getActivePlayer, setActivePlayer, moveToNextPlayer};
    
}

const Board = (() => {
    const dim = 3
    const board_id = "div.board"
    let gameboard = Array(dim)
    let board_dom = document.querySelector(board_id)
    for(let row = 0; row < dim; row++){
        gameboard[row] = Array(dim)
        for(let cell = 0; cell < dim; cell++) gameboard[row][cell] = '_';
    }
    let pm = PlayerManager()



    const scan_board = (last_r, last_c) =>{
        row_all_same = true
        col_all_same = true
        sym_at_move = gameboard[last_r][last_c]
        for(let row = last_r; row < dim; row++) row_all_same &= gameboard[row][last_c] == sym_at_move
        for(let row = 0; row < last_r; row++) row_all_same &= gameboard[row][last_c] == sym_at_move

        for(let col = last_c; col < dim; col++) col_all_same &= gameboard[last_r][col] == sym_at_move
        for(let col = 0; col < last_c; col++) col_all_same &= gameboard[last_r][col] == sym_at_move

        return row_all_same || col_all_same
        
    }
    const select = (r, c) =>{
        cell = document.querySelector(`div.cell#r${r}c${c}`)
        if(cell.textContent == '_'){
            cell.textContent = pm.getActivePlayer().sym
            gameboard[r][c] = pm.getActivePlayer().sym
            if(scan_board(r, c)){
                alert(`${pm.getActivePlayer().name} is the winner!` )
                clear_board()
            }else{
             pm.moveToNextPlayer()
            }
        }
    }

    const generate = () => {
        for(let row = 0; row < dim; row++){
            let row_dom = document.createElement('div')
            row_dom.classList.add('row')
            for(let cell = 0; cell < dim; cell++){
                let cell_dom = document.createElement('div')
                cell_dom.classList.add('cell')
                cell_dom.setAttribute("id",`r${row}c${cell}`);
                cell_dom.textContent = gameboard[row][cell]
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
    return {clear_board, select};

})();



cells = document.querySelectorAll("div.cell")
cells.forEach((cell) => {
    cell.addEventListener('mousedown', () => {
        cell.style.backgroundColor = "green";
        cell.style.transparency = 0.1;
        cell_row = cell.id.substring(1, cell.id.indexOf('c'))
        cell_col = cell.id.substring(cell.id.indexOf('c') + 1)
        Board.select(cell_row, cell_col)
    });
     // and for each one we add a 'hover' listener
     cell.addEventListener('mousemove', () => {
        cell.style.backgroundColor = "green";
        cell.style.transparency = 0.1;
    });

    cell.addEventListener('mouseout', () => {
        cell.style.backgroundColor = cell.parentNode.style.backgroundColor;
    });
});