import Database from "../Database/index.js";

let { enrollments } = Database;

export function findCoursesForUser(userId) {
  const { courses } = Database;
  const userEnrollments = enrollments.filter((e) => e.user === userId);
  const enrolledCourses = courses.filter((course) =>
    userEnrollments.some((enrollment) => enrollment.course === course._id)
  );
  return enrolledCourses;
}

export function enrollUserInCourse(userId, courseId) {
  const newEnrollment = {
    _id: `${userId}-${courseId}`,
    user: userId,
    course: courseId,
  };
  enrollments = [...enrollments, newEnrollment];
  return newEnrollment;
}

export function unenrollUserFromCourse(userId, courseId) {
  enrollments = enrollments.filter(
    (e) => !(e.user === userId && e.course === courseId)
  );
}