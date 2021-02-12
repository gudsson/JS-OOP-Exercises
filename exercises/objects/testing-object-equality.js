/////////////////////////////
// Testing Object Equality //
/////////////////////////////

// In JavaScript, comparing two objects either with == or === checks for
// object identity. In other words, the comparison evaluates to true if
// it's the same object on either side of == or ===. This is a limitation,
// in a sense, because sometimes we need to check if two objects have the
// same key/value pairs. JavaScript doesn't give us a way to do that.

// Write a function objectsEqual that accepts two object arguments and returns
// true or false depending on whether the objects have the same key/value pairs.

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false

function objectsEqual(obj1, obj2) {
  let [entries1, entries2] =
    [Object.entries(obj1).sort(), Object.entries(obj2).sort()];

  if (entries1.length !== entries2.length) return false;

  for (let idx = 0; idx < entries1.length; idx++) {
    if ((entries1[idx][0] !== entries2[idx][0])
      || (entries1[idx][1] !== entries2[idx][1])) return false;
  }

  return true;
}