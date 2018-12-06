// @flow weak

import moment from 'moment';

const ENTER_CHILDREN_VIEW  = 'ENTER_CHILDREN_VIEW';
const LEAVE_CHILDREN_VIEW  = 'LEAVE_CHILDREN_VIEW';

const ENTER_ELDERLY_VIEW  = 'ENTER_ELDERLY_VIEW';
const LEAVE_ELDERLY_VIEW  = 'LEAVE_ELDERLY_VIEW';

const ENTER_PAGE_NOT_FOUND  = 'ENTER_PAGE_NOT_FOUND';
const LEAVE_PAGE_NOT_FOUND  = 'LEAVE_PAGE_NOT_FOUND';

const ENTER_WELCOME_PAGE  = 'ENTER_WELCOME_PAGE';
const LEAVE_WELCOME_PAGE  = 'LEAVE_WELCOME_PAGE';

const initialState = {
  currentView:  'WelcomePage',
  enterTime:    null,
  leaveTime:    null
};

export default function views(state = initialState, action) {
  switch (action.type) {  
  case ENTER_CHILDREN_VIEW:
  case ENTER_ELDERLY_VIEW:
  case ENTER_PAGE_NOT_FOUND:
  case ENTER_WELCOME_PAGE:
    if (state.currentView !== action.currentView) {
      return {
        ...state,
        currentView:  action.currentView,
        enterTime:    action.enterTime,
        leaveTime:    action.leaveTime
      };
    }
    return state;    
  case LEAVE_CHILDREN_VIEW:
  case LEAVE_ELDERLY_VIEW:
  case LEAVE_PAGE_NOT_FOUND:
  case LEAVE_WELCOME_PAGE:
    if (state.currentView === action.currentView) {
      return {
        ...state,
        currentView:  action.currentView,
        enterTime:    action.enterTime,
        leaveTime:    action.leaveTime
      };
    }
    return state;

  default:
    return state;
  }
}

export function enterChildren(time = moment().format()) {
  return {
    type:         ENTER_CHILDREN_VIEW,
    currentView:  'Children',
    enterTime:    time,
    leaveTime:    null
  };
}

export function leaveChildren(time = moment().format()) {
  return {
    type:         LEAVE_CHILDREN_VIEW,
    currentView:  'Children',
    enterTime:    null,
    leaveTime:    time
  };
}


export function enterElderly(time = moment().format()) {
  return {
    type:         ENTER_ELDERLY_VIEW,
    currentView:  'Elderly',
    enterTime:    time,
    leaveTime:    null
  };
}

export function leaveElderly(time = moment().format()) {
  return {
    type:         LEAVE_ELDERLY_VIEW,
    currentView:  'Elderly',
    enterTime:    null,
    leaveTime:    time
  };
}

export function enterPageNotFound(time = moment().format()) {
  return {
    type:         ENTER_PAGE_NOT_FOUND,
    currentView:  'PageNotFound',
    enterTime:    time,
    leaveTime:    null
  };
}

export function leavePageNotFound(time = moment().format()) {
  return {
    type:         LEAVE_PAGE_NOT_FOUND,
    currentView:  'PageNotFound',
    enterTime:    null,
    leaveTime:    time
  };
}

export function enterWelcomePage(time = moment().format()) {
  return {
    type:         ENTER_WELCOME_PAGE,
    currentView:  'WelcomePage',
    enterTime:    time,
    leaveTime:    null
  };
}

export function leaveWelcomePage(time = moment().format()) {
  return {
    type:         LEAVE_WELCOME_PAGE,
    currentView:  'WelcomePage',
    enterTime:    null,
    leaveTime:    time
  };
}