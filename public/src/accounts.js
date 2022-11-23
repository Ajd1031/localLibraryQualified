function findAccountById(accounts, id) {
 let finalArray = accounts.find((accountObj) => accountObj.id === id);

 return finalArray;
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountObj1, accountObj2) => {
   
    return accountObj1.name.last.toLowerCase() > accountObj2.name.last.toLowerCase() ? 1 : -1;
    
  })
  
}

function getTotalNumberOfBorrows(account, books) {
  let arrayOfIds = [];
  for (i = 0; i < books.length; i++) {
    for (j = 0; j < books[i].borrows.length; j ++) {
      arrayOfIds.push(books[i].borrows[j])
    }
  }


 let finalArray = arrayOfIds.filter((borrowsObj) => borrowsObj.id === account.id);


return finalArray.length;
}





function getBooksPossessedByAccount(account, books, authors) {
  //create an array of all books checked out by the account. 
  //Loop through books and borrows to see if the returned status i false for the obj that contains the accounts id
  let booksCheckedOut = books.filter((bookObj) => {
    //only returns the bookObj's that have not been returned by the account given
   return bookObj.borrows.some((borrowsObj) => borrowsObj.returned === false && borrowsObj.id === account.id)
  })
  //add the authorObj that matches the authorId of the books that havent been returned by the account given
  booksCheckedOut.forEach((booksCheckedOutObj) => {
    // looping through the authors array to match up the authorId on the book and the actual authors Id    
   let findAuthor = authors.find((authorsObj) => authorsObj.id === booksCheckedOutObj.authorId);
   booksCheckedOutObj.author = findAuthor
  })
  // console.log("*******************")
  // console.log(booksCheckedOut)
  return booksCheckedOut;

}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
