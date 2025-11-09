import Database from "../Database/index.js";

let { modules } = Database;

export function findModulesForCourse(courseId) {
  return modules.filter((module) => module.course === courseId);
}

export function createModule(module) {
  const newModule = { ...module, _id: Date.now().toString() };
  modules = [...modules, newModule];
  return newModule;
}

export function deleteModule(moduleId) {
  modules = modules.filter((module) => module._id !== moduleId);
}

export function updateModule(moduleId, moduleUpdates) {
  const module = modules.find((module) => module._id === moduleId);
  Object.assign(module, moduleUpdates);
  return module;
}