import SiteMenuView from "./view/site-menu";
import {generateTask} from "./mock/task";
import {TASK_COUNT, RenderPosition} from "./const";
import {renderElement} from "./utils/render";
import BoardPresenter from "./presenter/board";
import FilterPresenter from "./presenter/filter";
import TasksModel from "./model/tasks";
import FilterModel from "./model/filter";

const tasks = new Array(TASK_COUNT).fill().map(generateTask);

const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterModel = new FilterModel();

const siteMainElement = document.querySelector(`.main`);
const siteMainControlElement = siteMainElement.querySelector(`.main__control`);
const boardPresenter = new BoardPresenter(siteMainElement, tasksModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, tasksModel);

renderElement(siteMainControlElement, new SiteMenuView(), RenderPosition.BEFOREEND);

filterPresenter.init();
boardPresenter.init();

document.querySelector(`#control__new-task`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  boardPresenter.createTask();
});
