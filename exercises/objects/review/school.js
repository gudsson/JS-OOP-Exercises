////////////
// School //
////////////

// Create a school object. The school object uses the student
// object from the previous exercise. It has methods that use and
// update information about the student. Be sure to check out the
// previous exercise for the other arguments that might be needed
// by the school object. Implement the following methods for the
// school object:

// addStudent: Adds a student by creating a new student and adding
// the student to a collection of students. The method adds a
// constraint that the year can only be any of the following
// values: '1st', '2nd', '3rd', '4th', or '5th'. Returns a
// student object if year is valid otherwise it logs "Invalid Year".

// enrollStudent: Enrolls a student in a course.

// addGrade: Adds the grade of a student for a course.

// getReportCard: Logs the grades of a student for all courses.
// If the course has no grade, it uses "In progress" as the grade.

// courseReport: Logs the grades of all students for a given course
// name. Only student with grades are part of the course report.
// To test your code, use the three student objects listed below.
// Using the three student objects, produces the following values
// from the getReportCard and courseReport methods respectively.

// Examples of created student objects with grades; methods on
// the objects are not shown here for brevity.
// The following are only showing the properties that aren't
// methods for the three objects
function createStudent(name, year) {
  return {
    name: name,
    year: year,
    courses: [],
    notes: {},

    addCourse(courseObj) {
      this.courses.push(courseObj);
    },

    listCourses() {
      console.log(this.courses);
    },
  };
}

let school = {
  students: [],
  courses: {},

  addStudent(name, year) {
    let validYears = ['1st', '2nd', '3rd', '4th', '5th'];

    if (validYears.includes(year)) {
      let student = createStudent(name, year);
      this.students.push(student);
      return student;
    } else return console.log("Invalid Year");
  },

  enrollStudent(student, courseName, courseCode) {
    student.addCourse({name: courseName, code: courseCode});
  },

  addGrade(student, course, grade) {
    for (let idx = 0; idx < student.courses.length; idx++) {
      if (student.courses[idx].name === course) {
        student.courses[idx]['grade'] = grade;
        return;
      }
    }
    console.log(`Student not enrolled in ${course}`);
  },

  getReportCard(student) {
    student.courses.forEach(course => {
      console.log(`${course.name}: ${course.grade ? course.grade : 'In Progress'}`);
    });
  },

  courseReport(courseName) {
    let studentGrades = {};
    this.students.forEach(student => {
      student.courses.forEach(course => {
        if (course.grade && course.name === courseName) {
          studentGrades[student.name] = course.grade;
        }
      });
    });

    let grades = Object.values(studentGrades);

    if (grades.length) {
      let studentList = Object.keys(studentGrades);
      let average = grades.reduce((acc, cur) => acc + cur, 0) / grades.length;
      console.log(`=${courseName} Grades=`);
      studentList.forEach(student => console.log(`${student}: ${studentGrades[student]}`));
      console.log(`---\nCourse Average: ${average.toFixed(0)}`);
    }
  }
};

let foo = school.addStudent('foo', '3rd');
school.enrollStudent(foo, 'Math', 101);
school.enrollStudent(foo, 'Advanced Math', 102);
school.enrollStudent(foo, 'Physics', 202);
school.addGrade(foo, 'Math', 95);
school.addGrade(foo, 'Advanced Math', 90);

let bar = school.addStudent('bar', '1st');
school.enrollStudent(bar, 'Math', 101);
school.addGrade(bar, 'Math', 91);

let qux = school.addStudent('qux', '2nd');
school.enrollStudent(qux, 'Math', 101);
school.enrollStudent(qux, 'Advanced Math', 102);
school.addGrade(qux, 'Math', 93);
school.addGrade(qux, 'Advanced Math', 90);


school.getReportCard(foo);
// = Math: 95
// = Advanced Math: 90
// = Physics: In progress

school.courseReport('Math');
// = =Math Grades=
// = foo: 95
// = bar: 91
// = qux: 93
// = ---
// = Course Average: 93

school.courseReport('Advanced Math');
// = =Advanced Math Grades=
// = foo: 90
// = qux: 90
// = ---
// = Course Average: 90

school.courseReport('Physics');
// = undefined