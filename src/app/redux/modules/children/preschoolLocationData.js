import moment               from 'moment';

import json from "api/singapore-pre-school-locations-2017.geojson";

const REQUEST_PRESCHOOL_LOCATION_DATA   = 'REQUEST_PRESCHOOL_LOCATION_DATA';
const RECEIVED_PRESCHOOL_LOCATION_DATA  = 'RECEIVED_PRESCHOOL_LOCATION_DATA';
const ERROR_PRESCHOOL_LOCATION_DATA     = 'ERROR_PRESCHOOL_LOCATION_DATA';

var initialState = {
  isFetching: false,
  data:       {},
  time:       null
};

export default function preschoolLocationData(state = initialState, action) { // features
  switch (action.type) {    
    case 'REQUEST_PRESCHOOL_LOCATION_DATA':  
      return {
        ...state,
        isFetching: action.isFetching,
        time:       action.time
      };   
    case 'RECEIVED_PRESCHOOL_LOCATION_DATA':  
      return {
        ...state,
        isFetching: action.isFetching,
        data:     {...action.data},
        time:       action.time
      };   
    case 'ERROR_PRESCHOOL_LOCATION_DATA':
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
function requestPreschoolLocationData(time = moment().format()) {
  return {
    type:       REQUEST_PRESCHOOL_LOCATION_DATA,
    isFetching: true,
    time
  };
}
function receivedPreschoolLocationData(data, time = moment().format()) {
  return {
    type:       RECEIVED_PRESCHOOL_LOCATION_DATA,
    isFetching: false,
    data,
    time
  };
}

function errorPreschoolLocationData(time = moment().format()) {
  return {
    type:       ERROR_PRESCHOOL_LOCATION_DATA,
    isFetching: false,
    time
  };
}

function fetchPreschoolLocationData() { // CALLING AN API
  return dispatch => {
    // dispatch request action first
    dispatch(requestPreschoolLocationData()); 

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
    .then(data => dispatch(receivedPreschoolLocationData(data))) 
    .catch(error => dispatch(errorPreschoolLocationData(error)))               
  }
}

function shouldFetchPreschoolLocationData(state) {
  const preschoolLocationDataStore = state.preschoolLocationData; 
  if(preschoolLocationDataStore.isFetching) {        
    return false;
  } else {        
    return true;
  }
}

export function fetchPreschoolLocationDataIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchPreschoolLocationData(getState())) {
      return dispatch(fetchPreschoolLocationData());
    }
  };
}