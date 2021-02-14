// We now want to track which books we have and haven't read.
// Update the factory function so that it returns a book object
// that includes a property read that has an initial value of false.

function createBook(title, author) {
  return {
    title,
    author,
    read: false,
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

console.log(book1.read);
console.log(book2.read);
console.log(book3.read);