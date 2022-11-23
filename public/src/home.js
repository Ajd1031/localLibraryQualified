function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  // place holder value for accumulaton
  let total = 0;
// looping through the books array to access the 
  books.forEach((booksObj) => {
    const {borrows} = booksObj;
    //only adding to the total if the book has not been returned
    if (borrows[0].returned === false) {
      total += 1;
    } 
  })
  return total;
}

function getMostCommonGenres(books) {
  //this object holds the counts for how many books are in each genre
  let genreCounts = {};
  //loop through books array
  books.forEach((booksObj) => {
    const {genre} = booksObj;
     //count how many books are found in each genre 
    if (genreCounts.hasOwnProperty(genre)) {
      genreCounts[genre] ++;
    } else {
      genreCounts[genre] = 1;
    }
  })
  // creates an object that contains the genre names
  let genreNames = Object.keys(genreCounts);

  //create an array that has objects that containes the genre names and counts
  let finalArray = genreNames.map((genreName) => {
   let count = genreCounts[genreName];
   return {name: genreName, count}
  })
  //sort the array by the how many books are in each genre
let sortedArray = finalArray.sort((finalArrayObj1, finalArrayObj2) => finalArrayObj2.count - finalArrayObj1.count)


  //limit the final array to only 5
  return sortedArray.slice(0,5)
}

function getMostPopularBooks(books) {
  //loop through the books array
  let finalArray = books.map((bookObj) => {
    const {borrows} = bookObj; 
    // creates object that contains the object name and how many times it was borrowed
    return {name: bookObj.title, count: borrows.length}
  })
  //makes sure that the array is sorted based on the "count" which is equal to how many times that the book was borrowed
  let sortedArray = finalArray.sort((finalArrayObj1, finalArrayObj2) => finalArrayObj2.count - finalArrayObj1.count);
//makes sure that the finall array only has 5 objects
  return sortedArray.splice(0,5)

}

function getMostPopularAuthors(books, authors) {
  // this object will store {authorid: howManyTimesTheirBookHasBeenCheckedOut}
  let authorCounts = {};
  //loop through both books and authors array. will probably need a .forEach inside of another method
  let finalArray = authors.map((authorsObj) => {
    const {name: {last, first}, id} = authorsObj;
    //looping through the books array
    books.forEach((bookObj) => {
      // for each author i am getting the length of the borrowObj which the author id's match
    if (bookObj.authorId === authorsObj.id) {
      authorCounts[id] = bookObj.borrows.length
    } 
       })
    //making an array that has the names of the authors and amount of times the book has been checked out
    return {name: `${first} ${last}`, count: authorCounts[id]}
  })
  let sortedArray = finalArray.sort((finalArrayObj1,finalArrayObj2) => finalArrayObj2.count - finalArrayObj1.count)
  
return sortArraysAndLimitLength(sortedArray, 5);
}
//this is my helper array. It sorts arrays and limites the length of the array to the desired specifications
function sortArraysAndLimitLength (array, limiter) {
  return array.sort((arrayObj1, arrayObj2) => arrayObj2 - arrayObj1).splice(0,limiter)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
