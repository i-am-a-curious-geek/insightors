// @flow weak

import moment from 'moment';

const ENTER_BABY_VIEW  = 'ENTER_BABY_VIEW';
const LEAVE_BABY_VIEW  = 'LEAVE_BABY_VIEW';

const ENTER_PAGE_NOT_FOUND  = 'ENTER_PAGE_NOT_FOUND';
const LEAVE_PAGE_NOT_FOUND  = 'LEAVE_PAGE_NOT_FOUND';

const initialState = {
  currentView:  'Baby',
  enterTime:    null,
  leaveTime:    null
};

export default function views(state = initialState, action) {
  switch (action.type) {  
  case ENTER_BABY_VIEW:
  case ENTER_PAGE_NOT_FOUND:
    if (state.currentView !== action.currentView) {
      return {
        ...state,
        currentView:  action.currentView,
        enterTime:    action.enterTime,
        leaveTime:    action.leaveTime
      };
    }
    return state;    
  case LEAVE_BABY_VIEW:
  case LEAVE_PAGE_NOT_FOUND:
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

export function enterBaby(time = moment().format()) {
  return {
    type:         ENTER_BABY_VIEW,
    currentView:  'Baby',
    enterTime:    time,
    leaveTime:    null
  };
}

export function leaveBaby(time = moment().format()) {
  return {
    type:         LEAVE_BABY_VIEW,
    currentView:  'Baby',
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