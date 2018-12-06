import moment               from 'moment';

import json from "api/singapore-children-residents-by-area-jun-2017.geojson";

const REQUEST_CHILDREN_AREA_DATA   = 'REQUEST_CHILDREN_AREA_DATA';
const RECEIVED_CHILDREN_AREA_DATA  = 'RECEIVED_CHILDREN_AREA_DATA';
const ERROR_CHILDREN_AREA_DATA     = 'ERROR_CHILDREN_AREA_DATA';

var initialState = {
  isFetching: false,
  data:       {},
  time:       null
};

export default function childrenAreaData(state = initialState, action) { // features
  switch (action.type) {    
    case 'REQUEST_CHILDREN_AREA_DATA':  
      return {
        ...state,
        isFetching: action.isFetching,
        time:       action.time
      };   
    case 'RECEIVED_CHILDREN_AREA_DATA':  
      return {
        ...state,
        isFetching: action.isFetching,
        data:     {...action.data},
        time:       action.time
      };   
    case 'ERROR_CHILDREN_AREA_DATA':
      return {
        ...state,
        isFetching: action.isFetching,
        time:       action.time
      };
    default:
      return state;
    }
}

// ============================ ASYNCHRONOUS CALLS =================================== //
function requestChildrenAreaData(time = moment().format()) {
  return {
    type:       REQUEST_CHILDREN_AREA_DATA,
    isFetching: true,
    time
  };
}
function receivedChildrenAreaData(data, time = moment().format()) {
  return {
    type:       RECEIVED_CHILDREN_AREA_DATA,
    isFetching: false,
    data,
    time
  };
}

function errorChildrenAreaData(time = moment().format()) {
  return {
    type:       ERROR_CHILDREN_AREA_DATA,
    isFetching: false,
    time
  };
}

function fetchChildrenAreaData() { // CALLING AN API
  return dispatch => {
    // dispatch request action first
    dispatch(requestChildrenAreaData()); 

    var url = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}${json}`;

    var headers = {   
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    };

    // FETCH JSON API
    fetch(url, headers)
    .then(response => {
      if (response.status >= 200 && response.status < 300) {   
        return response;          
      } else { 
        const error = new Error(response.statusText);
        error.response = response;          
        return Promise.reject(error);
      }
    })
    .then(response => response.json())
    .then(result => {            
      return result
    })
    .then(data => dispatch(receivedChildrenAreaData(data))) 
    .catch(error => dispatch(errorChildrenAreaData(error)))               
  }
}

function shouldFetchChildrenAreaData(state) {
  const childrenAreaDataStore = state.childrenAreaData; 
  if(childrenAreaDataStore.isFetching) {        
    return false;
  } else {        
    return true;
  }
}

export function fetchChildrenAreaDataIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchChildrenAreaData(getState())) {
      return dispatch(fetchChildrenAreaData());
    }
  };
}