const button = document.getElementById("button");
const button2 = document.getElementById("button2");
const button3 = document.getElementById("button3");
const button4 = document.getElementById("button4");

button.addEventListener("click", function () {
  const inputBook = document.getElementById("inputBook");
  if (inputBook.style.display === "block") {
    inputBook.style.display = "none";
  } else {
    inputBook.style.display = "block";
  }
});

button2.addEventListener("click", function () {
  const searchBook = document.getElementById("searchBook");
  if (searchBook.style.display === "block") {
    searchBook.style.display = "none";
  } else {
    searchBook.style.display = "block";
  }
});

button3.addEventListener("click", function () {
  const incompleteBookshelfList = document.getElementById("incompleteBookshelfList");
  if (incompleteBookshelfList.style.display === "block") {
    incompleteBookshelfList.style.display = "none";
  } else {
    incompleteBookshelfList.style.display = "block";
  }
});

button4.addEventListener("click", function () {
  const completeBookshelfList = document.getElementById("completeBookshelfList");
  if (completeBookshelfList.style.display === "block") {
    completeBookshelfList.style.display = "none";
  } else {
    completeBookshelfList.style.display = "block";
  }
});

function makeBookList(boooktitle, bookauthor, bookyear, isCompleted) {
  const textBookTitle = document.createElement("h3");
  textBookTitle.innerText = boooktitle;

  const textBookWriter = document.createElement("p");
  textBookWriter.innerText = `Author : ${bookauthor}`;

  const textBookYear = document.createElement("p");
  textBookYear.innerText = bookyear;

  const container = document.createElement("div");
  container.classList.add("bookList");
  container.style.border = "2px solid whiteSmoke  ";
  container.append(textBookTitle, textBookWriter, textBookYear);

  const bookItem = document.querySelector(".book_list");
  bookItem.append(container);

  if (isCompleted) {
    container.append(createNotFinishButton(), trashButton());
  } else {
    container.append(createFinishButton(), trashButton());
  }

  return container;
}

function createFinishButton() {
  return createButton("finishButton", "finish", function (event) {
    addBookToCompleted(event.target.parentElement);
  });
}

function createNotFinishButton() {
  return createButton("notFinishButton", "not finish", function (event) {
    addBooktoNotCompleted(event.target.parentElement);
  });
}

function trashButton() {
  return createButton("trash-button", "trash", function (event) {
    deleteBookList(event.target.parentElement);
  });
}

function createButton(buttonTypeClass, textButton, eventListener) {
  const btn = document.createElement("button");
  btn.classList.add(buttonTypeClass);
  btn.innerText = textButton;
  btn.addEventListener("click", function (event) {
    eventListener(event);
  });
  return btn;
}

const INCOMPLETED_LIST_BOOK = "incompleteBookshelfList";
const COMPLETED_LIST_BOOK = "completeBookshelfList";
const BOOK_ITEMID = "bookId";
function addBook() {
  const incompletedBookList = document.getElementById(INCOMPLETED_LIST_BOOK);
  const completedBookList = document.getElementById(COMPLETED_LIST_BOOK);
  const titleBook = document.getElementById("inputBookTitle").value;
  const writerBook = document.getElementById("inputBookAuthor").value;
  const yearBook = parseInt(document.getElementById("inputBookYear").value);
  const bookButton = document.getElementById("inputBookIsComplete").checked;

  const book = makeBookList(titleBook, writerBook, yearBook, bookButton);
  const bookObject = composeTodoObject(titleBook, writerBook, yearBook, bookButton);

  book[BOOK_ITEMID] = bookObject.id;
  books.push(bookObject);
  updateDataToStorage();

  if (bookButton === true) {
    updateDataToStorage();
    return completedBookList.append(book);
  } else {
    updateDataToStorage();
    return incompletedBookList.append(book);
  }
}

function addBookToCompleted(bookElement) {
  const listBookCompleted = document.getElementById(COMPLETED_LIST_BOOK);
  const bookTitle = bookElement.querySelector(".bookList > h3").innerText;
  const bookWriter = bookElement.querySelectorAll(" .bookList > p")[0].innerText;
  const bookYear = bookElement.querySelectorAll(".bookList > p")[1].innerText;

  const newListBook = makeBookList(bookTitle, bookWriter, bookYear, true);

  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isCompleted = true;
  newListBook[BOOK_ITEMID] = book.id;

  listBookCompleted.append(newListBook);
  bookElement.remove();

  updateDataToStorage();
}

function addBooktoNotCompleted(bookElement) {
  const listBookNotCompleted = document.getElementById(INCOMPLETED_LIST_BOOK);
  const title = bookElement.querySelector(".bookList > h3").innerText;
  const writer = bookElement.querySelectorAll(" .bookList > p")[0].innerText;
  const year = bookElement.querySelectorAll(".bookList > p")[1].innerText;

  const newBookList = makeBookList(title, writer, year, false);
  const book = findBook(bookElement[BOOK_ITEMID]);
  book.isCompleted = false;
  newBookList[BOOK_ITEMID] = book.id;
  listBookNotCompleted.append(newBookList);

  bookElement.remove();
  updateDataToStorage();
}

function deleteBookList(bookElement) {
  const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
  books.splice(bookPosition, 1);
  const confirmBox = confirm("Apakah Kamu ingin menghapusnya ?");
  if (confirmBox == true) {
    bookElement.remove();
    updateDataToStorage();
  } else {
    alert("jangan hapus");
  }
}

function refreshDataFromBooks() {
  let listIncompleted = document.getElementById(INCOMPLETED_LIST_BOOK);
  let listCompleted = document.getElementById(COMPLETED_LIST_BOOK);

  for (book of books) {
    const newBook = makeBookList(book.boooktitle, book.bookauthor, book.bookyear, book.isCompleted);
    newBook[BOOK_ITEMID] = book.id;

    if (book.isCompleted) {
      listCompleted.append(newBook);
    } else {
      listIncompleted.append(newBook);
    }
  }
}

const searchBookTitle = document.getElementById("searchBookTitle");
searchBookTitle.addEventListener("keyup", function () {
  searchBookTitle.style.backgroundColor = "#deedf0";
});

searchBookTitle.addEventListener("keydown", function () {
  searchBookTitle.style.backgroundColor = "#caf7e3";
});

searchBookTitle.addEventListener("keypress", function () {
  searchBookTitle.style.backgroundColor = "#fff5eb";
});
