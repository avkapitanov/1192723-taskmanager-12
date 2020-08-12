import SiteMenuView from "./view/site-menu.js";
import FilterView from "./view/filter.js";
import BoardView from "./view/board.js";
import SortView from "./view/sort.js";
import TaskListView from "./view/task-list.js";
import NoTaskView from "./view/no-task.js";
import TaskEditView from "./view/task-edit.js";
import TaskView from "./view/task.js";
import LoadMoreBtnView from "./view/load-more-btn.js";
import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";
import {TASK_COUNT, TASK_COUNT_PER_STEP} from "./const.js";
import {renderElement, RenderPosition} from "./utils.js";

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteMainControlElement = siteMainElement.querySelector(`.main__control`);

const renderTask = (taskListElement, task) => {
  const taskComponent = new TaskView(task);
  const taskEditComponent = new TaskEditView(task);

  const replaceCardToForm = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
  };

  const replaceFormToCard = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  taskComponent.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  renderElement(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderBoard = (boardContainer, boardTasks) => {
  const boardComponent = new BoardView();
  const taskListComponent = new TaskListView();

  renderElement(boardContainer, boardComponent.getElement(), RenderPosition.BEFOREEND);
  renderElement(siteMainElement, boardComponent.getElement(), RenderPosition.BEFOREEND);

  if (boardTasks.every((task) => task.isArchive)) {
    renderElement(boardComponent.getElement(), new NoTaskView().getElement(), RenderPosition.AFTERBEGIN);
    return;
  }

  renderElement(boardComponent.getElement(), new SortView().getElement(), RenderPosition.AFTERBEGIN);
  renderElement(boardComponent.getElement(), taskListComponent.getElement(), RenderPosition.BEFOREEND);

  tasks
    .slice(0, TASK_COUNT_PER_STEP)
    .forEach((task) => {
      renderTask(taskListComponent.getElement(), task);
    });

  if (tasks.length > TASK_COUNT_PER_STEP) {
    let renderedTaskCount = TASK_COUNT_PER_STEP;

    const loadMoreBtnComponent = new LoadMoreBtnView();
    renderElement(boardComponent.getElement(), loadMoreBtnComponent.getElement(), RenderPosition.BEFOREEND);

    loadMoreBtnComponent.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      tasks
        .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
        .forEach((task) => renderTask(taskListComponent.getElement(), task));

      renderedTaskCount += TASK_COUNT_PER_STEP;

      if (renderedTaskCount >= tasks.length) {
        loadMoreBtnComponent.getElement().remove();
        loadMoreBtnComponent.removeElement();
      }
    });
  }
};

renderElement(siteMainControlElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);

renderBoard(siteMainElement, tasks);
