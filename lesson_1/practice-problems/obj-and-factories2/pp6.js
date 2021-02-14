// Let's add a method, readBook, that marks a book object as
// read by setting the read property to true:

function createBook(title, author, read = false) {
  return {
    title,
    author,
    read,
    getDescription() {
      return `${this.title} was written by ${this.author}.  I have${(this.read) ? '' : "n't"} read it.`;
    },
    readBook() {
      this.read = true;
    },
  };
}

let book1 = createBook(`Mythos`, `Stephen Fry`); 
let book2 = createBook(`Me Talk Pretty One Day`, `David Sedaris`, false); 
let book3 = createBook(`Aunts aren't Gentlemen`, `PG Wodehouse`, true);

console.log(book1.getDescription());
book1.readBook();
console.log(book1.getDescription());
