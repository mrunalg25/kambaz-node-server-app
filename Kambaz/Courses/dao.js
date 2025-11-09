import Database from "../Database/index.js";

let { courses } = Database;

export function findAllCourses() {
  return courses;
}

export function createCourse(course) {
  const newCourse = { ...course, _id: Date.now().toString() };
  courses = [...courses, newCourse];
  return newCourse;
}

export function deleteCourse(courseId) {
  const { enrollments } = Database;
  courses = courses.filter((course) => course._id !== courseId);
  Database.enrollments = enrollments.filter(
    (enrollment) => enrollment.course !== courseId
  );
}

export function updateCourse(courseId, courseUpdates) {
  const course = courses.find((course) => course._id === courseId);
  Object.assign(course, courseUpdates);
  return course;
}

export function findCourseById(courseId) {
  return courses.find((course) => course._id === courseId);
}