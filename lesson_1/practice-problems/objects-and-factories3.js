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

// 3. Given our observations about the code so far, implement a
// factory function for our book objects that we can use with the
// following code:

let book1 = createBook('Mythos', 'Stephen Fry');
let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris');
let book3 = createBook("Aunts aren't Gentlemen", 'PG Wodehouse');

book1.getDescription();  // "Mythos was written by Stephen Fry."
book2.getDescription();  // "Me Talk Pretty One Day was written by David Sedaris."
book3.getDescription();  // "Aunts aren't Gentlemen was written by PG Wodehouse"

function createBook(title, author) {
  return {
    title: title,
    author: author,
    getDescription() {
      console.log(`${this.title} was written by ${this.author}.`);
    }
  };
}

// let book1 = {
//   title: 'Mythos',
//   author: 'Stephen Fry',

//   getDescription() {
//     console.log(`${this.title} was written by ${this.author}.`);
//   }
// };

// let book2 = {
//   title: 'Me Talk Pretty One Day',
//   author: 'David Sedaris',

//   getDescription() {
//     console.log(`${this.title} was written by ${this.author}.`);
//   }
// };

// let book3 = {
//   title: "Aunts aren't Gentlemen",
//   author: 'PG Wodehouse',

//   getDescription() {
//     console.log(`${this.title} was written by ${this.author}.`);
//   }
// };

// book1.getDescription();
// book2.getDescription();
// book3.getDescription();

// Think about the code you wrote for problem #1. Is there any unnecessary code?
// Does it have duplication?