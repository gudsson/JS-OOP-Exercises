////////////////////
// Circular Queue //
////////////////////

// A circular queue is a collection of objects stored in a buffer that is
// treated as though it is connected end-to-end in a circle. When an
// object is added to this circular queue, it is added to the position
// that immediately follows the most recently added object, while
// removing an object always removes the object that has been in the
// queue the longest.

// This works as long as there are empty spots in the buffer. If the
// buffer becomes full, adding a new object to the queue requires
// getting rid of an existing object; with a circular queue, the
// object that has been in the queue the longest is discarded and
// replaced by the new object.

// Assuming we have a circular queue with room for 3 objects, the
// circular queue looks and acts like this:

// P1-P2-P3 Comments
// __ __ __ All positions are initially empty
//  1 __ __ Add 1 to the queue
//  1 _2 __ Add 2 to the queue
// __ _2 __ Remove oldest item from the queue (1)
// __ _2 _3 Add 3 to the queue
// _4 _2 _3 Add 4 to the queue, queue is now full
// _4 _3 __ Remove oldest item from the queue (2)
// _4 _5 _3 Add 5 to the queue, queue is full again
// _4 _5 _6 Add 6 to the queue, replaces oldest element (3)
// _7 _5 _6 Add 7 to the queue, replaces oldest element (4)
// _7 __ _6 Remove oldest item from the queue (5)
// _7 __ __ Remove oldest item from the queue (6)
// __ __ __ Remove oldest item from the queue (7)
// __ __ __ Remove non-existent item from the queue (nil)

// Your task is to write a CircularQueue class that implements a circular
// queue for arbitrary objects. The class should obtain the buffer size
// with an argument provided to the constructor, and should provide the
// following methods:

// enqueue to add an object to the queue
// dequeue to remove (and return) the oldest object in the queue. It should
// return null if the queue is empty.
// You may assume that none of the values stored in the queue are null
// (however, null may be used to designate empty spots in the buffer).

// Examples:
class CircularQueue {
  constructor(bufferSize) {
    this.bufferSize = bufferSize;
    this.buffer = new Array(bufferSize).fill(null);
    this.oldestPos = 0;
    this.pointer = 0;
  }

  enqueue(value) {
    // while (true) {
    //   // if (this.nextPos === this.bufferSize) this.nextPos = 0;
    //   if (!this.buffer[this.nextPos] || this.nextPos === this.oldestPos) {
    //     this.buffer[this.nextPos] = value;
    //     break;
    //   }
    //   this.nextPos =
    //     (this.nextPos === this.bufferSize - 1) ? 0 : this.nextPos + 1;
    // }
    if (this.buffer.every(value => value === null)) {
      this.oldestPos = 0;
      this.pointer = 0;
    }
    if (this.buffer.includes(null)) {
      this.buffer[this.pointer] = value;
      this.pointer = this.increment(this.pointer);
    } else {
      this.buffer[this.oldestPos] = value;
      this.oldestPos = this.increment(this.oldestPos);
    }
  }

  dequeue() {
    if (this.buffer.every(value => value === null)) return null;
    let value = this.buffer[this.oldestPos];
    this.buffer[this.oldestPos] = null;
    this.oldestPos = this.increment(this.oldestPos);
    return value;
  }

  increment(pointer) {
    if (pointer === this.bufferSize - 1) return 0;
    return pointer + 1;
  }
}

let queue = new CircularQueue(3);
console.log(queue.dequeue() === null);

queue.enqueue(1);
queue.enqueue(2);
console.log(queue.dequeue() === 1);

queue.enqueue(3);
queue.enqueue(4);
console.log(queue.dequeue() === 2);

queue.enqueue(5);
queue.enqueue(6);
queue.enqueue(7);
console.log(queue.dequeue() === 5);

console.log(queue.dequeue() === 6);
console.log(queue.dequeue() === 7);
console.log(queue.dequeue() === null);

// queue.enqueue(1);
let anotherQueue = new CircularQueue(4);
console.log(anotherQueue.dequeue() === null);

anotherQueue.enqueue(1);
anotherQueue.enqueue(2);
console.log(anotherQueue.dequeue() === 1);

anotherQueue.enqueue(3);
anotherQueue.enqueue(4);
console.log(anotherQueue.dequeue() === 2);

anotherQueue.enqueue(5);
anotherQueue.enqueue(6);
anotherQueue.enqueue(7);
console.log(anotherQueue.dequeue() === 4);
console.log(anotherQueue.dequeue() === 5);
console.log(anotherQueue.dequeue() === 6);
console.log(anotherQueue.dequeue() === 7);
console.log(anotherQueue.dequeue() === null);

// The above code should log true 15 times.