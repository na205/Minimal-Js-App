/***********************************************
***  Methods for the use case "delete book"  ***
************************************************/
pl.view.deleteBook = {
  // Initialize the deleteBook form
  setupUserInterface: function () {
    var deleteButton = document.forms['Book'].commit;
    var selectEl = document.forms['Book'].selectBook;
    var key="", keys=[], book=null, optionEl=null;
    // load all book objects
    Book.loadAllInstances();
    keys = Object.keys( Book.instances);
    // populate the selection list with books
    for (var i=0; i < keys.length; i++) {
      key = keys[i];
      book = Book.instances[key];
      optionEl = document.createElement("option");
      optionEl.text = book.title;
      optionEl.value = book.isbn;
      selectEl.add( optionEl, null);
    }
    deleteButton.addEventListener("click", 
        pl.view.deleteBook.handleDeleteButtonClickEvent);
    window.addEventListener("beforeunload", function () {
        Book.saveAllInstances(); 
    });
  },
  // Event handler for deleting a book
  handleDeleteButtonClickEvent: function () {
    var selectEl = document.forms['Book'].selectBook;
    var isbn = selectEl.value;
    if (isbn) {
      Book.deleteRow( isbn);
      selectEl.remove( selectEl.selectedIndex);
    }
  }
};