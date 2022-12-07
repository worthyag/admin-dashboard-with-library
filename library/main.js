// Switching to classes

// Empty library
let myLibrary = [
{
    Title: "Narnia",
    Author: "NCK",
    Pages: 1010,
    Read: false,
    id: 1
},
{
    Title: "Harry Potter",
    Author: "JKR",
    Pages: 546,
    Read: true,
    id: 2
},
{
    Title: "The Twits",
    Author: "Roald dahl",
    Pages: 210,
    Read: false,
    id: 3
}
];


// Book Constructor
function Book(Title, Author, Pages, Read) {
    // Properties
    this.Title = Title;
    this.Author = Author;
    this.Pages = Pages;
    this.Read = Read;
    this.id = Math.floor(Math.random() * 1000000);

    // Methods
    // this.readMsg = function() {
    //     return (this.Read) ? "read" : "not read yet";
    // }

    // this.info = function() {
    //     return `${this.Title} by ${this.Author}, ${this.Pages} pages, ${this.readMsg()}.`;
    // }
}



// Show Form
const addBookBtn = document.querySelector('#add-book-btn');
const closeBtn = document.querySelector('#close-btn-form');
// const closeEditBtn = document.querySelector('#close-btn-form');
const modalForm = document.querySelector('#modal');

addBookBtn.addEventListener('click', displayForm);
closeBtn.addEventListener('click', closeForm);
window.addEventListener('click', windowCloseForm)

function displayForm() {
    modalForm.style.display = "block";
    console.log("clicked display form");
}

function closeForm() {
    modalForm.style.display = "none";
    console.log("clicked close form");
}

function windowCloseForm(e) {
    // console.log(e)
    if ((e.target === modalForm) || (e.target === books)) {
        modalForm.style.display = "none";
        console.log("clicked close form");
    }
}


// Process Data When Form Submits
const form = document.querySelector(".add-book-form");
form.addEventListener('submit', processFormData);

function processFormData(e) {
    e.preventDefault();

    console.log("e", e);
    const formData = new FormData(e.target);

    userData = [];

    formData.forEach((formData, key) => {
        if (key === "length")
            formData = parseInt(formData)
        else if (key === "read") {
            formData = (formData === 'false') ? false : true;
            // console.log("bool ", formData); // testing
        }
        userData.push(formData);
        // console.log(userData); // for testing
    })

    if (document.querySelector(".form-title").textContent === "Edit Book") {
        const book = new Book(userData[0], userData[1], userData[2], userData[3]);
        myLibrary.push(book);

        console.log("book key: ", book.id);

        // deleteBook(index);

        renderBooks();
    }
    else {
        addBookToLibrary(userData[0], userData[1], userData[2], userData[3]);
        console.log(myLibrary);
    }

    form.reset(); // temp
    closeForm(); // hides form

    e.preventDefault();
}


// Add book to Library function
function addBookToLibrary(Title, Author, Pages, Read) {
    const book = new Book(Title, Author, Pages, Read);
    myLibrary.push(book);
    // displayBooks();
    renderBooks();
}


// Add books to local storage 
function addLocalStorage() {
    // localStorage => saves things in key value pairs - key = library : myLibrary
    // localStorage.setItem('library', JSON.stringify(
    // [{
    //     Title: "Narnia",
    //     Author: "NCK",
    //     Pages: 1010,
    //     Read: false
    // },
    // {
    //     Title: "Harry Potter",
    //     Author: "JKR",
    //     Pages: 546,
    //     Read: true
    // },
    // {
    //     Title: "The Twits",
    //     Author: "Roald dahl",
    //     Pages: 210,
    //     Read: false
    // }]
    // ))

    // myLibrary = JSON.parse(localStorage.getItem('library'))  || [];
    renderBooks();
    // saveAndRenderBooks();
}


const books = document.querySelector(".books-container");

function createBookElement(element_, content_, className_) {
    const element = document.createElement(element_);
    element.textContent = content_;
    element.setAttribute('class', className_);
    return element;
}


function isRead(book) {
    // create read icon
    const readIcon = createBookElement('img', '', '');
    readIcon.setAttribute('src', `${(book.Read) ? '../img/icons/icon-read.svg' 
                                                : '../img/icons/icon-not-read.svg'}`);
    readIcon.setAttribute('class', `${(book.Read) ? 'read-icon book-icon r-icon' 
                                                : 'not-read-icon book-icon r-icon'}`);                                           
    readIcon.setAttribute('alt', "Read or not icon");

    // Add event
    readIcon.addEventListener('click', (e) => {
        // Adding the relevant classes for whether a book has been read or not.
        if (e.target.classList.contains('read-icon')) {
            e.target.classList.replace('read-icon', 'not-read-icon');
            readIcon.setAttribute('src', '../img/icons/icon-not-read.svg')

            e.target.parentNode.parentNode.classList.toggle('read');
            book.Read = false;
            e.target.parentNode.previousElementSibling.children[3].textContent = "Read: Not read yet";
            renderBooks();
            // saveAndRenderBooks();
        }
        else {
            e.target.classList.replace('not-read-icon', 'read-icon');
            readIcon.setAttribute('src', '../img/icons/icon-read.svg')

            e.target.parentNode.parentNode.classList.toggle('read');
            book.Read = true;
            e.target.parentNode.previousElementSibling.children[3].textContent = "Read: Read";
            renderBooks();
            // saveAndRenderBooks();
        }
    })

    return readIcon;
}


// Temporary solution
function fillOutEditForm(book) {
    modalForm.style.display = "block";
    document.querySelector(".form-title").textContent = "Edit Book";
    document.querySelector("#submit-form").textContent = "Save Changes";

    const editForm = document.querySelector("#add-book-form");
    // editForm.setAttribute('id', book.id);
    editForm.setAttribute('class', "add-book-form");
    document.querySelector("#title").value = book.Title || "";
    document.querySelector("#author").value = book.Author || "";
    document.querySelector("#length").value = book.Pages || "";
    document.querySelector("#read").value = book.Read || false;

    // const key = book.id;

    console.log("Set id: ", book.id);
}


// Temporary solution
function editBook(book) {
    // create icon
    const editIcon = createBookElement('img', '', 'edit-icon book-icon');
    editIcon.setAttribute('src', '../img/icons/icon-pencil.svg');
    editIcon.setAttribute("alt", "Edit book icon");

    // Add event
    editIcon.addEventListener('click', (e) => {
        console.log("Book", book);
        console.log("Book id ", book.id);
        // const key = e.target.parentNode.parentNode.getAttribute("key");

        fillOutEditForm(book);
        console.log("Book index: ", myLibrary.indexOf(book));
        const index = myLibrary.indexOf(book)
        deleteBook(index);
    })

    return editIcon;
}


function deleteBook(index) {
    myLibrary.splice(index, 1);
    renderBooks();
    // saveAndRenderBooks();
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
    const bookIcons = createBookElement('div', null, 'book-icons');

    // edit icon
    const editIcon = editBook(book);
    bookIcons.appendChild(editIcon);
    
    // read icon
    const readIcon = isRead(book);
    bookIcons.appendChild(readIcon);
    
    // bin icon
    const binIcon = createBookElement('img', '', 'bin-icon book-icon');
    binIcon.setAttribute('src', '../img/icons/icon-bin.svg');
    binIcon.setAttribute('alt', "Bin book icon");

    binIcon.addEventListener('click', (e) => {
        console.log("You clicked the bin!");
        deleteBook(index);
        console.log(myLibrary);
    })

    bookIcons.appendChild(binIcon);

    console.log(bookItem)

    bookItem.appendChild(bookHeader);
    bookItem.appendChild(bookIcons);
    books.appendChild(bookItem);
}


function renderBooks() {
    books.textContent = "";
    myLibrary.map((book, index) => {
        createBookItem(book, index);
    })
}

// to add to local storage
// function saveAndRenderBooks() {
//     localStorage.setItem('library', JSON.stringify(myLibrary));
//     renderBooks();
// }


addLocalStorage();
// renderBooks();

