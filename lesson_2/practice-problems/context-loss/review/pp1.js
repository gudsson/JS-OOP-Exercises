let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
    return this.firstName + ' ' + this.lastName + ' is a '
                                + this.occupation + '.';
  }
};

function logReturnVal(context, func) {
  let returnVal = func.call(context);
  console.log(returnVal);
}

logReturnVal(turk, turk.getDescription);