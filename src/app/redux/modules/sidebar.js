import moment         from 'moment';

const OPEN_SIDEBAR   = 'OPEN_SIDEBAR';
const CLOSE_SIDEBAR  = 'CLOSE_SIDEBAR';

const initialState = {
  isOpen: false,
  time: null
};

export default function sidebar(
  state = initialState, 
  action
) {
  switch (action.type) {     
    case OPEN_SIDEBAR:
      return {
        ...state,
        isOpen:  action.isOpen,
        time:         action.time
      };
    case CLOSE_SIDEBAR:
      return {
        ...state,
        isOpen:  action.isOpen,
        time:         action.time
      };
    default:
      return state;
  }
}

export function openSidebar(time = moment().format()) {
  return {
    type:         OPEN_SIDEBAR,
    isOpen:       true,
    time
  };
}
export function closeSidebar(time = moment().format()) {
  return {
    type:         CLOSE_SIDEBAR,
    isOpen:       false,
    time
  };
}

export function toggleSidebar() {
  return (dispatch, getState) => {
    const state = getState();    
    const sidebarStore = state.sidebar;    

    if (sidebarStore.isOpen) {      
      dispatch(closeSidebar());   
    } else {
      dispatch(openSidebar());      
    }
  };
}