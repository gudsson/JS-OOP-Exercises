///////////////
// Ancestors //
///////////////

// Implement an ancestors method that returns the prototype chain
// (ancestors) of a calling object as an array of object names.
// Here's an example output:

// name property added to make objects easier to identify
let foo = {name: 'foo'};
let bar = Object.create(foo);
bar.name = 'bar';
let baz = Object.create(bar);
baz.name = 'baz';
let qux = Object.create(baz);
qux.name = 'qux';

const mixin = {
  ancestors() {
    let ancestorArr = [];
    let ancestor = Object.getPrototypeOf(this);

    while (true) {
      if (!ancestor.name) break;
      ancestorArr.push(ancestor.name);
      ancestor = Object.getPrototypeOf(ancestor);
    }

    ancestorArr.push('Object.prototype');
    console.log(ancestorArr);
  }
};

Object.assign(Object.prototype, mixin);

qux.ancestors();  // returns ['baz', 'bar', 'foo', 'Object.prototype']
baz.ancestors();  // returns ['bar', 'foo', 'Object.prototype']
bar.ancestors();  // returns ['foo', 'Object.prototype']
foo.ancestors();  // returns ['Object.prototype']