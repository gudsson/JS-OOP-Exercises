//////////////////////////
// Refactoring Vehicles //
//////////////////////////

// Consider the following classes:
class Vehicle {
  constructor(make, model, wheels) {
    this.make = make;
    this.model = model;
    this.wheels = wheels;
  }

  getWheels() {
    return this.wheels;
  }

  info() {
    return `${this.make} ${this.model}`;
  }
}

class Car extends Vehicle {
  constructor(make, model) {
    super(make, model, 4);
  }

  info() {
    return `${this.make} ${this.model}`;
  }
}

class Motorcycle extends Vehicle {
  constructor(make, model) {
    super(make, model, 2);
  }

  info() {
    return `${this.make} ${this.model}`;
  }
}

class Truck extends Vehicle {
  constructor(make, model, payload) {
    super(make, model, 6);
    this.payload = payload;
  }
}
// Refactor these classes so they all use a common superclass, and
// inherit behavior as needed.

let truck = new Truck("Toyota", "Tundra", 69);
console.log(truck.getWheels());