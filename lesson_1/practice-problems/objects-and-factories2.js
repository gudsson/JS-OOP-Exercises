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

// 1. Create three objects that represent the three books shown above.
// The method for the "Get Description" behavior should return a string

let book1 = {
  title: 'Mythos',
  author: 'Stephen Fry',

  getDescription() {
    console.log(`${this.title} was written by ${this.author}.`);
  }
};

let book2 = {
  title: 'Me Talk Pretty One Day',
  author: 'David Sedaris',

  getDescription() {
    console.log(`${this.title} was written by ${this.author}.`);
  }
};

let book3 = {
  title: "Aunts aren't Gentlemen",
  author: 'PG Wodehouse',

  getDescription() {
    console.log(`${this.title} was written by ${this.author}.`);
  }
};

book1.getDescription();
book2.getDescription();
book3.getDescription();

// Think about the code you wrote for problem #1. Is there any unnecessary code?
// Does it have duplication?