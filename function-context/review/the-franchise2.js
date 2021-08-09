////////////////////////////////
// The Franchise - Solution 2 //
////////////////////////////////

// In the previous exercise, we had a situation where an anonymous
// method passed to map had an undesirable execution context. We
// solved the problem by taking advantage of lexical scoping and
// introducing a new variable self. Solve the same problem again
// by passing a hard-bound anonymous function to map.

let franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    return [1, 2, 3].map(function(number) {
      return this.name + ' ' + number;
    }.bind(this));
  },
};

console.log(franchise.allMovies());