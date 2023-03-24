


class Book{
    constructor(title, author, page_count){
        this.title = title;
        this.author = author
        this.page_count = page_count
    }
    add_to_DOM(){
        book = document.createElement('div')
        book.textContent = `${this.title} by ${this.author}.`
        book.classList.add('book')
        return book
    }
}
class Library{
    constructor(){
        this.my_library = [];
        this.num_books_per_shelf = 3;
        this.bookcase = document.querySelector(".bookcase");

    }

    addBook(title, author, page_count){
        this.my_library.push(new Book(title, author, page_count));
    }

    
    populate_bookcase(){
        let num_shelfs = this.my_library.length / this.num_books_per_shelf + this.my_library.length % this.num_books_per_shelf;
        for(let shelf_num = 0; shelf_num < num_shelfs; shelf_num++){
            let shelf = document.createElement('div');
            shelf.classList.add('bookshelf')

            if(shelf_num * 3 + 0 < my_library.length)
                shelf.appendChild(my_library[shelf_num * 3 + 0].add_to_DOM());
            if(shelf_num * 3 + 1 < my_library.length)
                shelf.appendChild(my_library[shelf_num * 3 + 1].add_to_DOM());
            if(shelf_num * 3 + 2 < my_library.length)
                shelf.appendChild(my_library[shelf_num * 3 + 2].add_to_DOM());

            
            this.bookcase.appendChild(shelf)
        }


    }

    destroy_bookcase(){
        let parent = document.querySelector(".bookcase");
        while (parent.firstChild) parent.removeChild(parent.firstChild);

    }


}









my_library = new Library()
my_library.addBook("Deep Work", "Cal Newport", 200);
my_library.addBook("12 Rules for Life", "Jordan B. Peterson", 200);
my_library.addBook("Can't Hurt Me", "David Goggins", 200);
my_library.addBook("Never Finished", "David Goggins", 200);
my_library.addBook("The Talent Code", "Daniel Coyle", 200);
my_library.addBook("Deep Work", "Cal Newport", 200);
my_library.addBook("Deep Work", "Cal Newport", 200);
console.log(my_library)
my_library.populate_bookcase()


function open_form(){
    document.querySelector("form").style.visibility = "visible";
}

function close_form(){
    my_library.addBook(document.querySelector("input#Text").value, "NA", "NA")
    document.querySelector("input#Text").value = ""
    document.querySelector("form").style.visibility = "hidden";
    my_library.destroy_bookcase();
    my_library.populate_bookcase();
}
document.querySelector("button").addEventListener("click", open_form);
document.querySelector("input#Submit").addEventListener("click", close_form);