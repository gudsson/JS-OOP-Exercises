// In these problems, we will develop a factory function for objects that
// represent books.

// The following three books should give you an idea of what our first book
// object should look like:

// Copy Code
// Attributes
//   Title: Mythos
//   Author: Stephen Fry

// Behavior:
//   Get Description

// -----------------------------
// Attributes
//   Title: Me Talk Pretty One Day
//   Author: David Sedaris

// Behavior:
//   Get Description

// -----------------------------
// Attributes
//  Title: Aunts aren't Gentlemen
//  Author: PG Wodehouse

//  Behavior:
//    Get Description

// 4. We now want to track which books we have and haven't read.
// Update the factory function so that it returns a book object that
// includes a property read that has an initial value of false.

let book1 = createBook('Mythos', 'Stephen Fry');
let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris');
let book3 = createBook("Aunts aren't Gentlemen", 'PG Wodehouse');

book1.getDescription();  // "Mythos was written by Stephen Fry."
book2.getDescription();  // "Me Talk Pretty One Day was written by David Sedaris."
book3.getDescription();  // "Aunts aren't Gentlemen was written by PG Wodehouse"

console.log(book1.read); // => false
console.log(book2.read); // => false
console.log(book3.read); // => false

function createBook(title, author) {
  return {
    title,
    author,
    read: false,
    getDescription() {
      console.log(`${this.title} was written by ${this.author}.`);
    }
  };
}