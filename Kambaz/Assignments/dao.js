import Database from "../Database/index.js";

let { assignments } = Database;

export function findAssignmentsForCourse(courseId) {
  return assignments.filter((assignment) => assignment.course === courseId);
}

export function createAssignment(assignment) {
  const newAssignment = { ...assignment, _id: Date.now().toString() };
  assignments = [...assignments, newAssignment];
  return newAssignment;
}

export function deleteAssignment(assignmentId) {
  assignments = assignments.filter(
    (assignment) => assignment._id !== assignmentId
  );
}

export function updateAssignment(assignmentId, assignmentUpdates) {
  const assignment = assignments.find(
    (assignment) => assignment._id === assignmentId
  );
  Object.assign(assignment, assignmentUpdates);
  return assignment;
}