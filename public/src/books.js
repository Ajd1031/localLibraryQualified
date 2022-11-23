function findAuthorById(authors, id) {
  return authors.find((authorObj) => authorObj.id === id);
}

function findBookById(books, id) {
 return books.find((bookObj) => bookObj.id === id);
}

function partitionBooksByBorrowedStatus(books) {
 let checkedOut = books.filter((bookObj) => {

  return bookObj.borrows[0].returned != true;
})
 
  let available = books.filter((bookObj) => {
    
    return bookObj.borrows[0].returned === true;
  })

  return [checkedOut, available]
}


function getBorrowersForBook(book, accounts) {
 let {borrows} = book;
 // make an array of the ids of accounts that have borrowed the book
 let idArray = borrows.map((borrowsObj) => borrowsObj.id);

// get an array of account objects that have rented the book
let borrowersArray = accounts.filter((accountObj) => idArray.includes(accountObj.id));

//creating a new array that has the account objects with a returned status
let finalArray = borrowersArray.map((borrowersArrayObj) => {

  // creating the "returned" key in the account object and making sure that the status matches what is on the books object
  borrowersArrayObj.returned = borrows.some((borrowsObj) => borrowsObj.returned)
  // this makes sure that the map method returns the object after the return key and value has been added
  return borrowersArrayObj
})

return finalArray;

}
  

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
