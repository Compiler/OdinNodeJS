
let my_library = [];
function Book(title, author, page_count){
    this.title = title;
    this.author = author;
    this.page_count = page_count;
}


const bookcase = document.querySelector(".bookcase");
function addBookToLibrary(title, author, page_count){
    my_library.push(new Book(title, author, page_count));
    shelf = document.createElement('div');
    shelf.classList.add('bookshelf')
    for(let book_num = 1; book_num <= 3; book_num++){
    
        book = document.createElement('div')
        book.textContent = "book"
        book.classList.add('book')
        shelf.appendChild(book)
    }
    bookcase.appendChild(shelf)
}



