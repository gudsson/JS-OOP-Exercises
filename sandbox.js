function createPerson(firstName, lastName) {
  return {
    firstName,
    lastName,
    printName() {
      console.log(`${this.firstName} ${this.lastName}`);
    }
  };
}

let jay = createPerson('Jay', 'Gudsson');
let phil = createPerson('Philomena', 'Chenne');
jay.printName();
phil.printName();