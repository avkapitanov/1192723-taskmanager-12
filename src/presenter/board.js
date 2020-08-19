import BoardView from "../view/board.js";
import SortView from "../view/sort.js";
import TaskListView from "../view/task-list.js";
import NoTaskView from "../view/no-task.js";
import TaskEditView from "../view/task-edit.js";
import TaskView from "../view/task.js";
import LoadMoreBtnView from "../view/load-more-btn.js";
import {renderElement, replace, remove} from "../utils/render.js";
import {sortTaskUp, sortTaskDown} from "../utils/task.js";
import {TASK_COUNT_PER_STEP, RENDER_POSITION, SORT_TYPE} from "../const.js";

export default class Board {
  constructor(boardContainer) {
    this._boardContainer = boardContainer;
    this._renderedTaskCount = TASK_COUNT_PER_STEP;
    this._currentSortType = SORT_TYPE.DEFAULT;

    this._boardComponent = new BoardView();
    this._sortComponent = new SortView();
    this._taskListComponent = new TaskListView();
    this._noTaskComponent = new NoTaskView();
    this._loadMoreButtonComponent = new LoadMoreBtnView();

    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(boardTasks) {
    this._boardTasks = boardTasks.slice();
    this._sourcedBoardTasks = boardTasks.slice();

    renderElement(this._boardContainer, this._boardComponent, RENDER_POSITION.BEFOREEND);
    renderElement(this._boardComponent, this._taskListComponent, RENDER_POSITION.BEFOREEND);

    this._renderBoard();
  }

  _renderSort() {
    renderElement(this._boardComponent, this._sortComponent, RENDER_POSITION.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _clearTaskList() {
    this._taskListComponent.getElement().innerHTML = ``;
    this._renderedTaskCount = TASK_COUNT_PER_STEP;
  }

  _sortTasks(sortType) {
    switch (sortType) {
      case SORT_TYPE.DATE_UP:
        this._boardTasks.sort(sortTaskUp);
        break;
      case SORT_TYPE.DATE_DOWN:
        this._boardTasks.sort(sortTaskDown);
        break;
      default:
        this._boardTasks = this._sourcedBoardTasks.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortTasks(sortType);

    this._clearTaskList();
    this._renderTaskList();
  }

  _handleLoadMoreButtonClick() {
    this._renderTasks(
        this._boardTasks
        .slice(this._renderedTaskCount, this._renderedTaskCount + TASK_COUNT_PER_STEP)
    );
    this._renderedTaskCount += TASK_COUNT_PER_STEP;

    if (this._renderedTaskCount >= this._boardTasks.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderTask(task) {
    const taskComponent = new TaskView(task);
    const taskEditComponent = new TaskEditView(task);

    const replaceCardToForm = () => {
      replace(taskEditComponent, taskComponent);
    };

    const replaceFormToCard = () => {
      replace(taskComponent, taskEditComponent);
    };

    taskComponent.setEditClickHandler(() => {
      replaceCardToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    taskEditComponent.setFormSubmitHandler(() => {
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

    renderElement(this._taskListComponent, taskComponent, RENDER_POSITION.BEFOREEND);
  }

  _renderTasks(tasks) {
    tasks
      .forEach((task) => this._renderTask(task));
  }

  _renderNoTasks() {
    renderElement(this._boardComponent, this._noTaskComponent, RENDER_POSITION.AFTERBEGIN);
  }

  _renderLoadMoreButton() {
    renderElement(this._boardComponent, this._loadMoreButtonComponent, RENDER_POSITION.BEFOREEND);

    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _renderBoard() {
    if (this._boardTasks.every((task) => task.isArchive)) {
      this._renderNoTasks();
      return;
    }

    this._renderSort();

    this._renderTaskList();
  }

  _renderTaskList() {
    this._renderTasks(this._boardTasks.slice(0, TASK_COUNT_PER_STEP));

    if (this._boardTasks.length > TASK_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }
  }
}
