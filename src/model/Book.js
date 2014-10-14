/***********************************************
***  Constructor with attribute definitions  ***
************************************************/
function Book( slots) {
  this.isbn = slots.isbn;
  this.title = slots.title;
  this.year = slots.year;
};
/***********************************************
***  Class-level ("static") properties  ********
************************************************/
Book.instances = {};  // initially an empty associative array

/***********************************************
***  Class-level ("static") methods  ***********
************************************************/
// Convert row to object
Book.convertRow2Obj = function (bookRow) {
  var book = new Book( bookRow);
  return book;
};
// Load the book table from Local Storage
Book.loadAllInstances = function () {
  var key="", keys=[], bookTableString="", bookTable={};  
  try {
    if (localStorage["bookTable"]) {
      bookTableString = localStorage["bookTable"];
    }
  } catch (e) {
    alert("Error when reading from Local Storage\n" + e);
  }
  if (bookTableString) {
    bookTable = JSON.parse( bookTableString);
    keys = Object.keys( bookTable);
    console.log( keys.length +" books loaded.");
    for (var i=0; i < keys.length; i++) {
      key = keys[i];
      Book.instances[key] = Book.convertRow2Obj( bookTable[key]);
    }
  }
};
//  Save all book objects to Local Storage
Book.saveAllInstances = function () {
  var bookTableString="", error=false,
      nmrOfBooks = Object.keys( Book.instances).length;  
  try {
    bookTableString = JSON.stringify( Book.instances);
    localStorage["bookTable"] = bookTableString;
  } catch (e) {
    alert("Error when writing to Local Storage\n" + e);
    error = true;
  }
  if (!error) console.log( nmrOfBooks + " books saved.");
};
//  Create a new book row
Book.createRow = function (slots) {
  var book = new Book( slots);
  Book.instances[slots.isbn] = book;
  console.log("Book " + slots.isbn + " created!");
};
//  Update an existing book row
Book.updateRow = function (slots) {
  var book = Book.instances[slots.isbn];
  var year = parseInt( slots.year);
  if (book.title !== slots.title) { book.title = slots.title;}
  if (book.year !== slots.year) { book.year = year;}
  console.log("Book " + slots.isbn + " modified!");
};
//  Delete a book row from persistent storage
Book.deleteRow = function (isbn) {
  if (Book.instances[isbn]) {
    console.log("Book " + isbn + " deleted");
    delete Book.instances[isbn];
  } else {
    console.log("There is no book with ISBN " + isbn + " in the database!");
  }
};
//  Create and save test data
Book.createTestData = function () {
  Book.instances["006251587X"] = new Book({isbn:"006251587X", title:"Weaving the Web", year:2000});
  Book.instances["0465026567"] = new Book({isbn:"0465026567", title:"Gödel, Escher, Bach", year:1999});
  Book.instances["0465030793"] = new Book({isbn:"0465030793", title:"I Am A Strange Loop", year:2008});
  Book.saveAllInstances();
};
//  Clear data
Book.clearData = function () {
  if (confirm("Do you really want to delete all book data?")) {
    Book.instances = {};
    localStorage["bookTable"] = "{}";
  }
};
