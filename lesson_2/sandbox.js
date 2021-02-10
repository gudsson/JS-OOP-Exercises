function Foo(parm) {
  this.parm = parm;
}

Foo.bar = function() {
  // omitted code
};

Foo.prototype.qux = function() {
  // omitted code
};

let foo = new Foo(10);

function create