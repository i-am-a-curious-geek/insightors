import moment               from 'moment';

import json from "api/singapore-childcare-services-2017.geojson";

const REQUEST_CHILDCARE_SERVICES_DATA   = 'REQUEST_CHILDCARE_SERVICES_DATA';
const RECEIVED_CHILDCARE_SERVICES_DATA  = 'RECEIVED_CHILDCARE_SERVICES_DATA';
const ERROR_CHILDCARE_SERVICES_DATA     = 'ERROR_CHILDCARE_SERVICES_DATA';

var initialState = {
  isFetching: false,
  data:       {},
  time:       null
};

export default function childcareServicesData(state = initialState, action) { // features
  switch (action.type) {    
    case 'REQUEST_CHILDCARE_SERVICES_DATA':  
      return {
        ...state,
        isFetching: action.isFetching,
        time:       action.time
      };   
    case 'RECEIVED_CHILDCARE_SERVICES_DATA':  
      return {
        ...state,
        isFetching: action.isFetching,
        data:     {...action.data},
        time:       action.time
      };   
    case 'ERROR_CHILDCARE_SERVICES_DATA':
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
function requestChildcareServicesData(time = moment().format()) {
  return {
    type:       REQUEST_CHILDCARE_SERVICES_DATA,
    isFetching: true,
    time
  };
}
function receivedChildcareServicesData(data, time = moment().format()) {
  return {
    type:       RECEIVED_CHILDCARE_SERVICES_DATA,
    isFetching: false,
    data,
    time
  };
}

function errorChildcareServicesData(time = moment().format()) {
  return {
    type:       ERROR_CHILDCARE_SERVICES_DATA,
    isFetching: false,
    time
  };
}

function fetchChildcareServicesData() { // CALLING AN API
  return dispatch => {
    // dispatch request action first
    dispatch(requestChildcareServicesData()); 

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
    .then(data => dispatch(receivedChildcareServicesData(data))) 
    .catch(error => dispatch(errorChildcareServicesData(error)))               
  }
}

function shouldFetchChildcareServicesData(state) {
  const childcareServicesDataStore = state.childcareServicesData; 
  if(childcareServicesDataStore.isFetching) {        
    return false;
  } else {        
    return true;
  }
}

export function fetchChildcareServicesDataIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchChildcareServicesData(getState())) {
      return dispatch(fetchChildcareServicesData());
    }
  };
}