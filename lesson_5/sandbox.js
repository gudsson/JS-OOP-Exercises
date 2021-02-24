function Person(firstName, lastName) {
  Object.setPrototypeOf(this, Person.myPrototype);
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.myPrototype = {
  printName() {
    console.log(`${this.firstName} ${this.lastName}`);
  }
};

function Student(firstName, lastName, degree) {
  Person.call(this, firstName, lastName);
  this.degree = degree;
}

let jay = new Student("Jay", "Gudsson", "B.A.Sc.");

console.log(Person.myPrototype);