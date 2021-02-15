// What will the following code output? Try to determine the results
// without running the code.

function func() {
  return this;
}

let context = func();

console.log(context); // prints global object