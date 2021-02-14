// Suppose that we want to add a book that we've already read.
// Modify the factory function to use an optional read parameter
// with a default value of false.

function createBook(title, author, read = false) {
  return {
    title,
    author,
    read,
    getDescription() {
      return `${this.title} was written by ${this.author}`;
    }
  };
}

let book1 = createBook(`Mythos`, `Stephen Fry`); 
// {
//   title: 'Mythos',
//   author: 'Stephen Fry',
//   getDescription() {
//     return `${this.title} was written by ${this.author}`;
//   }
// };

let book2 = createBook(`Me Talk Pretty One Day`, `David Sedaris`, false); 
// {
//   title: 'Me Talk Pretty One Day',
//   author: 'David Sedaris',
//   getDescription() {
//     return `${this.title} was written by ${this.author}`;
//   }
// };

let book3 = createBook(`Aunts aren't Gentlemen`, `PG Wodehouse`, true);
// {
//   title: `Aunts aren't Gentlemen`,
//   author: 'PG Wodehouse',
//   getDescription() {
//     return `${this.title} was written by ${this.author}`;
//   }
// };

console.log(book1.read);
console.log(book2.read);
console.log(book3.read);