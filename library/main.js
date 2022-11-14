// Empty library
let myLibrary = [
    {
        Title: "Narnia",
        Author: "NCK",
        Pages: 1010,
        Read: false
    },
    {
        Title: "Harry Potter",
        Author: "JKR",
        Pages: 546,
        Read: true
    },
    {
        Title: "The Twits",
        Author: "Roald dahl",
        Pages: 210,
        Read: false
    }
];


// // Book Constructor
// function Book(Title, Author, Pages, Read) {
//     // Properties
//     this.Title = Title;
//     this.Author = Author;
//     this.Pages = Pages;
//     this.Read = Read;

//     // Methods
//     // this.readMsg = function() {
//     //     return (this.Read) ? "read" : "not read yet";
//     // }

//     // this.info = function() {
//     //     return `${this.Title} by ${this.Author}, ${this.Pages} pages, ${this.readMsg()}.`;
//     // }
// }


// // Add book to Library function
// function addBookToLibrary(Title, Author, Pages, Read) {
//     const book = new Book(Title, Author, Pages, Read);
//     myLibrary.push(book);
//     toggleDisplayBooks();
//     // displayBooks();
// }

const books = document.querySelector(".books-container");

function createBookElement(element_, content_, className_) {
    const element = document.createElement(element_);
    element.textContent = content_;
    element.setAttribute('class', className_);
    return element;
}


function isRead(book) {
    // read icon
    const readIcon = createBookElement('img', '', '');
    readIcon.setAttribute('src', `${(book.Read) ? '../img/icons/icon-read.svg' 
                                                : '../img/icons/icon-not-read.svg'}`);
    readIcon.setAttribute('class', `${(book.Read) ? 'read-icon book-icon r-icon' 
                                                : 'not-read-icon book-icon r-icon'}`);                                           
    readIcon.setAttribute('alt', "Read or not icon");


    readIcon.addEventListener('click', (e) => {
        // Adding the relevant classes for whether a book has been read or not.
        if (e.target.classList.contains('read-icon')) {
            e.target.classList.replace('read-icon', 'not-read-icon');
            readIcon.setAttribute('src', '../img/icons/icon-not-read.svg')

            // console.log(e.target.classList); // test
            e.target.parentNode.parentNode.classList.toggle('read');
            console.log(e.target.parentNode.previousElementSibling.children[3]);
            book.Read = false;
            e.target.parentNode.previousElementSibling.children[3].textContent = "Read: Not read yet";
        }
        else {
            e.target.classList.replace('not-read-icon', 'read-icon');
            readIcon.setAttribute('src', '../img/icons/icon-read.svg')

            // console.log(e.target.classList); // test
            e.target.parentNode.parentNode.classList.toggle('read');
            book.Read = true;
            e.target.parentNode.previousElementSibling.children[3].textContent = "Read: Read"
        }

        // console.log(myLibrary); // testing
    })

    return readIcon;
}


function createBookItem(book, index) {
    // container div
    const bookItem = document.createElement('div');
    bookItem.setAttribute('key', index);
    bookItem.setAttribute('id', `book-${index}`);
    // bookItem.setAttribute('id', index);
    (book.Read) ?  bookItem.setAttribute('class', 'read book-item') : bookItem.setAttribute('class', 'book-item');

    // book header
    const bookHeader = createBookElement('div', '', 'book-header');
    // h4 / Title
    bookHeader.appendChild(createBookElement('h4', `${book.Title}`, 'book-title'));
    // p / Author
    bookHeader.appendChild(createBookElement('p', `Author: ${book.Author}`, 'book-author'));
    // p / Pages
    bookHeader.appendChild(createBookElement('p', `Pages: ${book.Pages}`, 'book-pages'));
    // p / Read
    bookHeader.appendChild(createBookElement('p', `Read: ${(book.Read) ? "Read" : "Not read yet"}`,
    'book-reads'));

    // book icons
    const bookIcons = createBookElement('div', '', 'book-icons');
    
    // read icon
    const readIcon = isRead(book);
    bookIcons.appendChild(readIcon);
    
    // bin icon
    const binIcon = createBookElement('img', '', 'bin-icon book-icon');
    binIcon.setAttribute('src', '../img/icons/icon-bin.svg');
    binIcon.setAttribute('alt', "Bin book icon");
    bookIcons.appendChild(binIcon);

    console.log(bookItem)

    bookItem.appendChild(bookHeader);
    bookItem.appendChild(bookIcons);
    books.appendChild(bookItem);
}


function renderBooks() {
    myLibrary.map((book, index) => {
        createBookItem(book, index);
    })
}

renderBooks();