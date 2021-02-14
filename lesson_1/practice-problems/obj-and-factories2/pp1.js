// In these problems, we will develop a factory function for objects
// that represent books.

// The following three books should give you an idea of what our first
// book object should look like:

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

// Create three objects that represent the three books shown above.
// The method for the "Get Description" behavior should return a
// string like the following:

// Expected Output:
// "Me Talk Pretty one day was written by David Sedaris."

let book1 = {
  title: 'Mythos',
  author: 'Stephen Fry',
  getDescription() {
    return `${this.title} was written by ${this.author}`;
  }
};

let book2 = {
  title: 'Me Talk Pretty One Day',
  author: 'David Sedaris',
  getDescription() {
    return `${this.title} was written by ${this.author}`;
  }
};

let book3 = {
  title: `Aunts aren't Gentlemen`,
  author: 'PG Wodehouse',
  getDescription() {
    return `${this.title} was written by ${this.author}`;
  }
};

console.log(book1.getDescription());
console.log(book2.getDescription());
console.log(book3.getDescription());