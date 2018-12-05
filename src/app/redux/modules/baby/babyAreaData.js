import moment               from 'moment';

import json from "api/singapore-baby-residents-by-area-jun-2017.geojson";

const REQUEST_BABY_AREA_DATA   = 'REQUEST_BABY_AREA_DATA';
const RECEIVED_BABY_AREA_DATA  = 'RECEIVED_BABY_AREA_DATA';
const ERROR_BABY_AREA_DATA     = 'ERROR_BABY_AREA_DATA';

var initialState = {
  isFetching: false,
  data:       {},
  time:       null
};

export default function babyAreaData(state = initialState, action) { // features
  switch (action.type) {    
    case 'REQUEST_BABY_AREA_DATA':  
      return {
        ...state,
        isFetching: action.isFetching,
        time:       action.time
      };   
    case 'RECEIVED_BABY_AREA_DATA':  
      return {
        ...state,
        isFetching: action.isFetching,
        data:     {...action.data},
        time:       action.time
      };   
    case 'ERROR_BABY_AREA_DATA':
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
function requestBabyAreaData(time = moment().format()) {
  return {
    type:       REQUEST_BABY_AREA_DATA,
    isFetching: true,
    time
  };
}
function receivedBabyAreaData(data, time = moment().format()) {
  return {
    type:       RECEIVED_BABY_AREA_DATA,
    isFetching: false,
    data,
    time
  };
}

function errorBabyAreaData(time = moment().format()) {
  return {
    type:       ERROR_BABY_AREA_DATA,
    isFetching: false,
    time
  };
}

function fetchBabyAreaData() { // CALLING AN API
  return dispatch => {
    // dispatch request action first
    dispatch(requestBabyAreaData()); 

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
    .then(data => dispatch(receivedBabyAreaData(data))) 
    .catch(error => dispatch(errorBabyAreaData(error)))               
  }
}

function shouldFetchBabyAreaData(state) {
  const babyAreaDataStore = state.babyAreaData; 
  if(babyAreaDataStore.isFetching) {        
    return false;
  } else {        
    return true;
  }
}

export function fetchBabyAreaDataIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchBabyAreaData(getState())) {
      return dispatch(fetchBabyAreaData());
    }
  };
}