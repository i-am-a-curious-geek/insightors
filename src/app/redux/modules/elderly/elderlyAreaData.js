import moment               from 'moment';

import json from "api/singapore-elderly-residents-by-area-jun-2017.geojson";

const REQUEST_ELDERLY_AREA_DATA   = 'REQUEST_ELDERLY_AREA_DATA';
const RECEIVED_ELDERLY_AREA_DATA  = 'RECEIVED_ELDERLY_AREA_DATA';
const ERROR_ELDERLY_AREA_DATA     = 'ERROR_ELDERLY_AREA_DATA';

var initialState = {
  isFetching: false,
  data:       {},
  time:       null
};

export default function elderlyAreaData(state = initialState, action) { // features
  switch (action.type) {    
    case 'REQUEST_ELDERLY_AREA_DATA':  
      return {
        ...state,
        isFetching: action.isFetching,
        time:       action.time
      };   
    case 'RECEIVED_ELDERLY_AREA_DATA':  
      return {
        ...state,
        isFetching: action.isFetching,
        data:     {...action.data},
        time:       action.time
      };   
    case 'ERROR_ELDERLY_AREA_DATA':
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
function requestElderlyAreaData(time = moment().format()) {
  return {
    type:       REQUEST_ELDERLY_AREA_DATA,
    isFetching: true,
    time
  };
}
function receivedElderlyAreaData(data, time = moment().format()) {
  return {
    type:       RECEIVED_ELDERLY_AREA_DATA,
    isFetching: false,
    data,
    time
  };
}

function errorElderlyAreaData(time = moment().format()) {
  return {
    type:       ERROR_ELDERLY_AREA_DATA,
    isFetching: false,
    time
  };
}

function fetchElderlyAreaData() { // CALLING AN API
  return dispatch => {
    // dispatch request action first
    dispatch(requestElderlyAreaData()); 

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
    .then(data => dispatch(receivedElderlyAreaData(data))) 
    .catch(error => dispatch(errorElderlyAreaData(error)))               
  }
}

function shouldFetchElderlyAreaData(state) {
  const elderlyAreaDataStore = state.elderlyAreaData; 
  if(elderlyAreaDataStore.isFetching) {        
    return false;
  } else {        
    return true;
  }
}

export function fetchElderlyAreaDataIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchElderlyAreaData(getState())) {
      return dispatch(fetchElderlyAreaData());
    }
  };
}