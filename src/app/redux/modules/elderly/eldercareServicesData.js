import moment               from 'moment';

import json from "api/singapore-eldercare-services-2017.geojson";

const REQUEST_ELDERCARE_SERVICES_DATA   = 'REQUEST_ELDERCARE_SERVICES_DATA';
const RECEIVED_ELDERCARE_SERVICES_DATA  = 'RECEIVED_ELDERCARE_SERVICES_DATA';
const ERROR_ELDERCARE_SERVICES_DATA     = 'ERROR_ELDERCARE_SERVICES_DATA';

var initialState = {
  isFetching: false,
  data:       {},
  time:       null
};

export default function childcareServicesData(state = initialState, action) { // features
  switch (action.type) {    
    case 'REQUEST_ELDERCARE_SERVICES_DATA':  
      return {
        ...state,
        isFetching: action.isFetching,
        time:       action.time
      };   
    case 'RECEIVED_ELDERCARE_SERVICES_DATA':  
      return {
        ...state,
        isFetching: action.isFetching,
        data:     {...action.data},
        time:       action.time
      };   
    case 'ERROR_ELDERCARE_SERVICES_DATA':
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
function requestEldercareServicesData(time = moment().format()) {
  return {
    type:       REQUEST_ELDERCARE_SERVICES_DATA,
    isFetching: true,
    time
  };
}
function receivedEldercareServicesData(data, time = moment().format()) {
  return {
    type:       RECEIVED_ELDERCARE_SERVICES_DATA,
    isFetching: false,
    data,
    time
  };
}

function errorEldercareServicesData(time = moment().format()) {
  return {
    type:       ERROR_ELDERCARE_SERVICES_DATA,
    isFetching: false,
    time
  };
}

function fetchEldercareServicesData() { // CALLING AN API
  return dispatch => {
    // dispatch request action first
    dispatch(requestEldercareServicesData()); 

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
    .then(data => dispatch(receivedEldercareServicesData(data))) 
    .catch(error => dispatch(errorEldercareServicesData(error)))               
  }
}

function shouldFetchEldercareServicesData(state) {
  const childcareServicesDataStore = state.childcareServicesData; 
  if(childcareServicesDataStore.isFetching) {        
    return false;
  } else {        
    return true;
  }
}

export function fetchEldercareServicesDataIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchEldercareServicesData(getState())) {
      return dispatch(fetchEldercareServicesData());
    }
  };
}