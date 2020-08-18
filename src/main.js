import SiteMenuView from "./view/site-menu.js";
import FilterView from "./view/filter.js";
import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";
import {TASK_COUNT, RENDER_POSITION} from "./const.js";
import {renderElement} from "./utils/render.js";
import BoardPresenter from "./presenter/board.js";

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const siteMainElement = document.querySelector(`.main`);
const siteMainControlElement = siteMainElement.querySelector(`.main__control`);
const boardPresenter = new BoardPresenter(siteMainElement);

renderElement(siteMainControlElement, new SiteMenuView(), RENDER_POSITION.BEFOREEND);
renderElement(siteMainElement, new FilterView(filters), RENDER_POSITION.BEFOREEND);

boardPresenter.init(tasks);
