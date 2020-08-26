export const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];
export const DAYS_FOR_NOT_REPEATING_TASK = {
  mo: false,
  tu: false,
  we: false,
  th: false,
  fr: false,
  sa: false,
  su: false
};
export const TASK_COUNT = 22;
export const TASK_COUNT_PER_STEP = 8;
export const MAX_DAY_GAP = 7;

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const SortType = {
  DEFAULT: `default`,
  DATE_DOWN: `date-down`,
  DATE_UP: `date-up`
};

export const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export const TASK_DATE_FORMAT = `j F`;
export const TASK_CARD_DATE_MOMENT_FORMAT = `D MMMM`;
export const TASK_CARD_TIME_MOMENT_FORMAT = `hh:mm A`;

export const UserAction = {
  UPDATE_TASK: `UPDATE_TASK`,
  ADD_TASK: `ADD_TASK`,
  DELETE_TASK: `DELETE_TASK`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};

export const FilterType = {
  ALL: `all`,
  OVERDUE: `overdue`,
  TODAY: `today`,
  FAVORITES: `favorites`,
  REPEATING: `repeating`,
  ARCHIVE: `archive`
};
