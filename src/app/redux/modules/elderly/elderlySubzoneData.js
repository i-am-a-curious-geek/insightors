import moment               from 'moment';

import json from "api/singapore-elderly-residents-by-subzone-jun-2017.geojson";

const REQUEST_ELDERLY_SUBZONE_DATA   = 'REQUEST_ELDERLY_SUBZONE_DATA';
const RECEIVED_ELDERLY_SUBZONE_DATA  = 'RECEIVED_ELDERLY_SUBZONE_DATA';
const ERROR_ELDERLY_SUBZONE_DATA     = 'ERROR_ELDERLY_SUBZONE_DATA';

var initialState = {
  isFetching: false,
  data:       {},
  time:       null
};

export default function elderlySubzoneData(state = initialState, action) { // features
  switch (action.type) {    
    case 'REQUEST_ELDERLY_SUBZONE_DATA':  
      return {
        ...state,
        isFetching: action.isFetching,
        time:       action.time
      };   
    case 'RECEIVED_ELDERLY_SUBZONE_DATA':  
      return {
        ...state,
        isFetching: action.isFetching,
        data:     {...action.data},
        time:       action.time
      };   
    case 'ERROR_ELDERLY_SUBZONE_DATA':
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
function requestElderlySubzoneData(time = moment().format()) {
  return {
    type:       REQUEST_ELDERLY_SUBZONE_DATA,
    isFetching: true,
    time
  };
}
function receivedElderlySubzoneData(data, time = moment().format()) {
  return {
    type:       RECEIVED_ELDERLY_SUBZONE_DATA,
    isFetching: false,
    data,
    time
  };
}

function errorElderlySubzoneData(time = moment().format()) {
  return {
    type:       ERROR_ELDERLY_SUBZONE_DATA,
    isFetching: false,
    time
  };
}

function fetchElderlySubzoneData() { // CALLING AN API
  return dispatch => {
    // dispatch request action first
    dispatch(requestElderlySubzoneData()); 

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
    .then(data => dispatch(receivedElderlySubzoneData(data))) 
    .catch(error => dispatch(errorElderlySubzoneData(error)))               
  }
}

function shouldFetchElderlySubzoneData(state) {
  const elderlySubzoneDataStore = state.elderlySubzoneData; 
  if(elderlySubzoneDataStore.isFetching) {        
    return false;
  } else {        
    return true;
  }
}

export function fetchElderlySubzoneDataIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchElderlySubzoneData(getState())) {
      return dispatch(fetchElderlySubzoneData());
    }
  };
}