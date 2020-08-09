import {isTaskExpired, isTaskRepeating, isTaskExpiringToday} from "../utils.js";

const taskToFilterMap = {
  all: (tasks) => tasks.length,
  overdue: (tasks) => tasks
    .filter((task) => isTaskExpired(task.dueDate)).length,
  today: (tasks) => tasks
    .filter((task) => isTaskExpiringToday(task.dueDate)).length,
  favorites: (tasks) => tasks
    .filter((task) => task.isFavorite).length,
  repeating: (tasks) => tasks
    .filter((task) => isTaskRepeating(task.repeating)).length,
  archive: (tasks) => tasks.filter((task) => task.isArchive).length,
};

export const generateFilter = (tasks) => {
  const notArchivedTasks = tasks.filter((task) => !task.isArchive);

  return Object.entries(taskToFilterMap).map(([filterName, countTasks]) => {
    return {
      name: filterName,
      count: filterName === `archive` ? countTasks(tasks) : countTasks(notArchivedTasks),
    };
  });
};
