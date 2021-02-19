class Greeting {
  greet(string) {
    console.log(string);
  }
}

class Hello extends Greeting {
  hi() {
    this.greet("Hello");
  }
}

class Goodbye extends Greeting {
  bye() {
    this.greet("Goodbye");
  }
}

let hi = new Hello();
hi.hi();

let bye = new Goodbye();
bye.bye();