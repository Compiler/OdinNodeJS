
let my_library = [];
const num_books_per_shelf = 3;
function Book(title, author, page_count){
    this.title = title;
    this.author = author;
    this.page_count = page_count;
}

function open_form(){
    document.querySelector("form").style.visibility = "visible";
}

function close_form(){
    addBookToLibrary(document.querySelector("input#Text").value, "NA", "NA")
    document.querySelector("input#Text").value = ""
    document.querySelector("form").style.visibility = "hidden";
    console.log(my_library)
    destroy_bookcase();
    populate_bookcase();
}
document.querySelector("button").addEventListener("click", open_form);
document.querySelector("input#Submit").addEventListener("click", close_form);

function addBookToLibrary(title, author, page_count){
    my_library.push(new Book(title, author, page_count));

}


function add_book_to_DOM(book_num){
    book_obj = my_library[book_num]
    book = document.createElement('div')
    book.textContent = `${book_obj.title} by ${book_obj.author}.`
    book.classList.add('book')
    return book
}
function populate_bookcase(){
    const bookcase = document.querySelector(".bookcase");
    let num_shelfs = my_library.length / num_books_per_shelf + my_library.length % num_books_per_shelf;
    for(let shelf_num = 0; shelf_num < num_shelfs; shelf_num++){
        shelf = document.createElement('div');
        shelf.classList.add('bookshelf')
        
        if(shelf_num * 3 + 0 < my_library.length)shelf.appendChild(add_book_to_DOM(shelf_num * 3 + 0));
        if(shelf_num * 3 + 1 < my_library.length)shelf.appendChild(add_book_to_DOM(shelf_num * 3 + 1));
        if(shelf_num * 3 + 2 < my_library.length)shelf.appendChild(add_book_to_DOM(shelf_num * 3 + 2));
        
        bookcase.appendChild(shelf)
    }


}

function destroy_bookcase(){
    parent = document.querySelector(".bookcase");
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }

}

addBookToLibrary("Deep Work", "Cal Newport", 200);
addBookToLibrary("12 Rules for Life", "Jordan B. Peterson", 200);
addBookToLibrary("Can't Hurt Me", "David Goggins", 200);
addBookToLibrary("Never Finished", "David Goggins", 200);
addBookToLibrary("The Talent Code", "Daniel Coyle", 200);
addBookToLibrary("Deep Work", "Cal Newport", 200);
addBookToLibrary("Deep Work", "Cal Newport", 200);
console.log(my_library)
populate_bookcase();


