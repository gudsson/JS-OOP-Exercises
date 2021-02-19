global.foo = 5;
if (isFinite(foo)) {
  let bar = 3;
  xyz = 5;
  console.log(bar);
}

console.log(`global ${global.hasOwnProperty('global')}`);
console.log(`foo ${global.hasOwnProperty('foo')}`);
console.log(`isFinite ${global.hasOwnProperty('isFinite')}`);
console.log(`bar ${global.hasOwnProperty('bar')}`);
console.log(`xyz ${global.hasOwnProperty('xyz')}`);
console.log(`console ${global.hasOwnProperty('console')}`);
console.log(`log ${global.hasOwnProperty('log')}`);