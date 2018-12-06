import moment               from 'moment';

import json from "api/singapore-children-residents-by-subzone-jun-2017.geojson";

const REQUEST_CHILDREN_SUBZONE_DATA   = 'REQUEST_CHILDREN_SUBZONE_DATA';
const RECEIVED_CHILDREN_SUBZONE_DATA  = 'RECEIVED_CHILDREN_SUBZONE_DATA';
const ERROR_CHILDREN_SUBZONE_DATA     = 'ERROR_CHILDREN_SUBZONE_DATA';

var initialState = {
  isFetching: false,
  data:       {},
  time:       null
};

export default function childrenSubzoneData(state = initialState, action) { // features
  switch (action.type) {    
    case 'REQUEST_CHILDREN_SUBZONE_DATA':  
      return {
        ...state,
        isFetching: action.isFetching,
        time:       action.time
      };   
    case 'RECEIVED_CHILDREN_SUBZONE_DATA':  
      return {
        ...state,
        isFetching: action.isFetching,
        data:     {...action.data},
        time:       action.time
      };   
    case 'ERROR_CHILDREN_SUBZONE_DATA':
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
function requestChildrenSubzoneData(time = moment().format()) {
  return {
    type:       REQUEST_CHILDREN_SUBZONE_DATA,
    isFetching: true,
    time
  };
}
function receivedChildrenSubzoneData(data, time = moment().format()) {
  return {
    type:       RECEIVED_CHILDREN_SUBZONE_DATA,
    isFetching: false,
    data,
    time
  };
}

function errorChildrenSubzoneData(time = moment().format()) {
  return {
    type:       ERROR_CHILDREN_SUBZONE_DATA,
    isFetching: false,
    time
  };
}

function fetchChildrenSubzoneData() { // CALLING AN API
  return dispatch => {
    // dispatch request action first
    dispatch(requestChildrenSubzoneData()); 

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
    .then(data => dispatch(receivedChildrenSubzoneData(data))) 
    .catch(error => dispatch(errorChildrenSubzoneData(error)))               
  }
}

function shouldFetchChildrenSubzoneData(state) {
  const childrenSubzoneDataStore = state.childrenSubzoneData; 
  if(childrenSubzoneDataStore.isFetching) {        
    return false;
  } else {        
    return true;
  }
}

export function fetchChildrenSubzoneDataIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchChildrenSubzoneData(getState())) {
      return dispatch(fetchChildrenSubzoneData());
    }
  };
}