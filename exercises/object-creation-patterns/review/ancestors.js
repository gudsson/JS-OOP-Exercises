///////////////
// Ancestors //
///////////////

// Implement an ancestors method that returns the prototype chain (ancestors)
// of a calling object as an array of object names. Here's an example output:

// name property added to make objects easier to identify
let foo = {name: 'foo'};
let bar = Object.create(foo);
bar.name = 'bar';
let baz = Object.create(bar);
baz.name = 'baz';
let qux = Object.create(baz);
qux.name = 'qux';

const fooPrototype = {
  ancestors() {
    let ancestorArr = [];
    let self = this;

    while (true) {
      let ancestor = Object.getPrototypeOf(self).name;
      if (!ancestor) {
        ancestorArr.push('Object.prototype');
        break;
      } else ancestorArr.push(ancestor);
      self = Object.getPrototypeOf(self);
    }
    console.log(ancestorArr);
  }
};

Object.setPrototypeOf(foo, fooPrototype);

qux.ancestors();  // returns ['baz', 'bar', 'foo', 'Object.prototype']
baz.ancestors();  // returns ['bar', 'foo', 'Object.prototype']
bar.ancestors();  // returns ['foo', 'Object.prototype']
foo.ancestors();  // returns ['Object.prototype']