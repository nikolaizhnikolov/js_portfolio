// import { footer } from "../footer";

const library = (function () {
    let lib = [];

    const addBookButton = document.querySelector(".addBookButton");
    const modal = document.querySelector(".modal");
    const modalForm = document.querySelector(".modalForm");
    const overlay = document.querySelector(".overlay");
    const modalSubmit = document.querySelector(".modalSubmit");

    const showAddForm = function () {
        modal.classList.add("visible");
        overlay.classList.add("visible");
    };

    const closeAddForm = function () {
        modal.classList.remove("visible");
        overlay.classList.remove("visible");
    };

    addBookButton.addEventListener("click", showAddForm);
    overlay.addEventListener("click", closeAddForm);
    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape") closeAddForm();
    });

    modalSubmit.addEventListener("click", (e) => {
        if (modalForm.checkValidity()) {
            e.preventDefault();

            const title = document.querySelector(".form__title").value;
            const author = document.querySelector(".form__author").value;
            const pages = document.querySelector(".form__pages").value;
            const read = document.querySelector(".form__read").value;

            const newBook = new Book(title, author, pages, read);
            addBookCard(newBook);
            closeAddForm();
        }
    });

    const Book = function (title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    };

    const addBookToLibrary = function (title, author, pages, read) {
        const book = new Book(title, author, pages, read);
        lib.push(book);
    };

    const removeBookFromLibrary = function (book) {
        const books = document.querySelector(".books");
        books.removeChild(book);
        lib.forEach((b) => {
            const title =
                book.getElementsByClassName("book__title")[0].textContent;
            if (b.title === title) {
                const index = lib.indexOf(b);
                lib.splice(index, 1);
                return;
            }
        });
    };

    const createDiv = (divClass, textContent) => {
        const div = document.createElement("div");
        div.classList.add(divClass);
        div.textContent = textContent;
        return div;
    };

    const createRemoveButton = function (title) {
        const button = document.createElement("button");
        button.classList.add("removeBookButton");
        button.addEventListener("click", () => {
            removeBookFromLibrary(button.parentNode);
        });
        button.textContent = "Remove";
        return button;
    };

    const addBookCard = function (book) {
        const bookCard = createDiv("book");
        bookCard.appendChild(createDiv("book__title", book.title));
        bookCard.appendChild(createDiv("book__author", book.author));
        bookCard.appendChild(createDiv("book__pages", book.pages));
        if (book.read) {
            bookCard.classList.add("read");
        }
        bookCard.appendChild(createRemoveButton(book.title));

        const books = addBookButton.parentNode;
        books.insertBefore(bookCard, addBookButton);
    };

    (function init() {
        addBookToLibrary("test", "test", 1, false);
        addBookToLibrary("Guards! Guards!", "Terry Pratchett", 324, true);
        addBookToLibrary("The Light Fantastic", "Terry Pratchett", 256, true);
        addBookToLibrary("The Hogfather", "Terry Pratchett", 286, true);

        lib.forEach((book) => addBookCard(book));
    })();
})();

// document.body.appendChild(footer);