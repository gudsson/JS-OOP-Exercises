// 1. What will the following code log to the console? Explain why
// it logs that value. Try to answer without running the code.

let qux = { foo: 1 };
let baz = Object.create(qux);
console.log(baz.foo + qux.foo);