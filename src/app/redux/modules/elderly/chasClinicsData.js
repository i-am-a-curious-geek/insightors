import moment               from 'moment';

import json from "api/singapore-chas-clinics-2017.geojson";

const REQUEST_CHAS_CLINICS_DATA   = 'REQUEST_CHAS_CLINICS_DATA';
const RECEIVED_CHAS_CLINICS_DATA  = 'RECEIVED_CHAS_CLINICS_DATA';
const ERROR_CHAS_CLINICS_DATA     = 'ERROR_CHAS_CLINICS_DATA';

var initialState = {
  isFetching: false,
  data:       {},
  time:       null
};

export default function chasClinicsData(state = initialState, action) { // features
  switch (action.type) {    
    case 'REQUEST_CHAS_CLINICS_DATA':  
      return {
        ...state,
        isFetching: action.isFetching,
        time:       action.time
      };   
    case 'RECEIVED_CHAS_CLINICS_DATA':  
      return {
        ...state,
        isFetching: action.isFetching,
        data:     {...action.data},
        time:       action.time
      };   
    case 'ERROR_CHAS_CLINICS_DATA':
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
function requestChasClinicsData(time = moment().format()) {
  return {
    type:       REQUEST_CHAS_CLINICS_DATA,
    isFetching: true,
    time
  };
}
function receivedChasClinicsData(data, time = moment().format()) {
  return {
    type:       RECEIVED_CHAS_CLINICS_DATA,
    isFetching: false,
    data,
    time
  };
}

function errorChasClinicsData(time = moment().format()) {
  return {
    type:       ERROR_CHAS_CLINICS_DATA,
    isFetching: false,
    time
  };
}

function fetchChasClinicsData() { // CALLING AN API
  return dispatch => {
    // dispatch request action first
    dispatch(requestChasClinicsData()); 

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
    .then(data => dispatch(receivedChasClinicsData(data))) 
    .catch(error => dispatch(errorChasClinicsData(error)))               
  }
}

function shouldFetchChasClinicsData(state) {
  const childcareServicesDataStore = state.childcareServicesData; 
  if(childcareServicesDataStore.isFetching) {        
    return false;
  } else {        
    return true;
  }
}

export function fetchChasClinicsDataIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchChasClinicsData(getState())) {
      return dispatch(fetchChasClinicsData());
    }
  };
}