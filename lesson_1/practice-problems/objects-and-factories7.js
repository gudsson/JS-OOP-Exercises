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

let book1 = createBook('Mythos', 'Stephen Fry');
// let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris');
// let book3 = createBook("Aunts aren't Gentlemen", 'PG Wodehouse');

// 7. Finally, let's update getDescription function to reflect the
// read state directly, For instance:

book1.getDescription(); // Mythos was written by David Fry. I haven't read it.
book1.readBook();
book1.getDescription(); // Mythos was written by David Fry. I have read it.

function createBook(title, author, read = false) {
  return {
    title,
    author,
    read,
    getDescription() {
      let text = `${this.title} was written by ${this.author}.`;
      text += (this.read) ? ` I have read it.` : ` I haven't read it.`;
      console.log(text);
    },
    readBook() {
      this.read = true;
    },
  };
}