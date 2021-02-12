/* eslint-disable max-lines-per-function */
////////////
// School //
////////////


// Create a school object. The school object uses the student
// object from the previous exercise. It has methods that use
// and update information about the student. Be sure to check
// out the previous exercise for the other arguments that might
// be needed by the school object. Implement the following methods
// for the school object:

// addStudent: Adds a student by creating a new student and adding
// the student to a collection of students. The method adds a
// constraint that the year can only be any of the following
// values: '1st', '2nd', '3rd', '4th', or '5th'. Returns a
// student object if year is valid otherwise it logs "Invalid
// Year".
// enrollStudent: Enrolls a student in a course.
// addGrade: Adds the grade of a student for a course.
// getReportCard: Logs the grades of a student for all courses. If
// the course has no grade, it uses "In progress" as the grade.
// courseReport: Logs the grades of all students for a given course
// name. Only student with grades are part of the course report.
// To test your code, use the three student objects listed below.
// Using the three student objects, produces the following values
// from the getReportCard and courseReport methods respectively.

// Examples of created student objects with grades; methods on the
// objects are not shown here for brevity.
// The following are only showing the properties that
// aren't methods for the three objects

function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],
    notes: {},

    info() {
      console.log(`${this.name} is a ${this.year} year student`);
    },

    listCourses() {
      return this.courses;
    },

    addCourse(course) {
      this.courses.push(course);
    },

    addNote(code, note) {
      if (this.notes[code]) this.notes[code].push(note);
      else this.updateNote(code, note);
    },

    updateNote(code, note) {
      this.notes[code] = [note];
    },

    viewNotes() {
      let ids = Object.keys(this.notes);

      ids.forEach(id => {
        console.log(`${this.getCourse(+id)}: ${this.getNotes(+id)}`);
      });
    },

    getCourse(id) {
      return this.courses.filter(course => course.code === id)[0].name;
    },

    getNotes(id) {
      return this.notes[id].join('; ');
    },
  };
}

const school = {
  students: [],

  addStudent(name, year) {
    let validYears = ['1st', '2nd', '3rd', '4th', '5th'];
    if (validYears.includes(year)) {
      let student = createStudent(name, year);
      this.students.push(student);
      return student;
    } else console.log('Invalid Year');
  },

  enrollStudent(student, courseName, courseCode) {
    student.addCourse({name: courseName, code: courseCode});
  },

  addGrade(student, courseCode, grade) {
    let courseObj = student.listCourses().filter(course => {
      return course.code === courseCode;
    })[0];

    if (courseObj) courseObj.grade = grade;
  },

  getReportCard(student) {
    let courses = student.listCourses();

    courses.forEach(course => {
      let grade = (course.grade) ? course.grade : 'In Progress';
      console.log(`${course.name}: ${grade}`);
    });
  },

  courseReport(courseName) {
    let classGrades = {};

    this.students.forEach(student => {
      let studentCourse = student.listCourses().filter(course => {
        return course.name === courseName && course.grade !== undefined;
      })[0];

      if (studentCourse) classGrades[student.name] = studentCourse.grade;
    });

    if (Object.keys(classGrades).length > 0) {
      console.log(`=${courseName} Grades=`);
      Object.keys(classGrades).forEach(pupil => {
        console.log(`${pupil}: ${classGrades[pupil]}`);
      });

      console.log('---');

      let average = Object.values(classGrades).reduce((acc, cur) => {
        return acc + cur;
      }, 0) / Object.keys(classGrades).length;

      console.log(`Course Average: ${average.toFixed(0)}`);
    }
  },
};

let foo = school.addStudent('foo', '3rd');
school.enrollStudent(foo, 'Math', 101);
school.enrollStudent(foo, 'Advanced Math', 102);
school.enrollStudent(foo, 'Physics', 202);
school.addGrade(foo, 101, 95);
school.addGrade(foo, 102, 90);
school.getReportCard(foo);

// foo;
// {
//   name: 'foo',
//   year: '3rd',
//   courses: [
//     { name: 'Math', code: 101, grade: 95, },
//     { name: 'Advanced Math', code: 102, grade: 90, },
//     { name: 'Physics', code: 202, }
//   ],
// }

let bar = school.addStudent('bar', '1st');
school.enrollStudent(bar, 'Math', 101);
school.addGrade(bar, 101, 91);

// bar;
// {
//   name: 'bar',
//   year: '1st',
//   courses: [
//     { name: 'Math', code: 101, grade: 91, },
//   ],
// }

// qux;
// {
//   name: 'qux',
//   year: '2nd',
//   courses: [
//     { name: 'Math', code: 101, grade: 93, },
//     { name: 'Advanced Math', code: 102, grade: 90, },
//    ],
// }

let qux = school.addStudent('qux', '2nd');
school.enrollStudent(qux, 'Math', 101);
school.enrollStudent(qux, 'Advanced Math', 102);
school.addGrade(qux, 101, 93);
school.addGrade(qux, 102, 90);


school.courseReport('Math');
// // = =Math Grades=
// // = foo: 95
// // = bar: 91
// // = qux: 93
// // = ---
// // = Course Average: 93

school.courseReport('Advanced Math');
// // = =Advanced Math Grades=
// // = foo: 90
// // = qux: 90
// // = ---
// // = Course Average: 90

school.courseReport('Physics');
// // = undefined