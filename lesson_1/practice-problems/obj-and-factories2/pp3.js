// Given our observations about the code so far, implement a
// factory function for our book objects that we can use with
// the following code:

function createBook(title, author) {
  return {
    title,
    author,
    getDescription() {
      return `${this.title} was written by ${this.author}`;
    }
  }
}

let book1 = createBook(`Mythos`, `Stephen Fry`); 
// {
//   title: 'Mythos',
//   author: 'Stephen Fry',
//   getDescription() {
//     return `${this.title} was written by ${this.author}`;
//   }
// };

let book2 = createBook(`Me Talk Pretty One Day`, `David Sedaris`); 
// {
//   title: 'Me Talk Pretty One Day',
//   author: 'David Sedaris',
//   getDescription() {
//     return `${this.title} was written by ${this.author}`;
//   }
// };

let book3 = createBook(`Aunts aren't Gentlemen`, `PG Wodehouse`);
// {
//   title: `Aunts aren't Gentlemen`,
//   author: 'PG Wodehouse',
//   getDescription() {
//     return `${this.title} was written by ${this.author}`;
//   }
// };

console.log(book1.getDescription());
console.log(book2.getDescription());
console.log(book3.getDescription());