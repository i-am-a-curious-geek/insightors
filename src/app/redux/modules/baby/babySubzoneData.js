import moment               from 'moment';

import json from "api/singapore-baby-residents-by-subzone-jun-2017.geojson";

const REQUEST_BABY_SUBZONE_DATA   = 'REQUEST_BABY_SUBZONE_DATA';
const RECEIVED_BABY_SUBZONE_DATA  = 'RECEIVED_BABY_SUBZONE_DATA';
const ERROR_BABY_SUBZONE_DATA     = 'ERROR_BABY_SUBZONE_DATA';

var initialState = {
  isFetching: false,
  data:       {},
  time:       null
};

export default function babySubzoneData(state = initialState, action) { // features
  switch (action.type) {    
    case 'REQUEST_BABY_SUBZONE_DATA':  
      return {
        ...state,
        isFetching: action.isFetching,
        time:       action.time
      };   
    case 'RECEIVED_BABY_SUBZONE_DATA':  
      return {
        ...state,
        isFetching: action.isFetching,
        data:     {...action.data},
        time:       action.time
      };   
    case 'ERROR_BABY_SUBZONE_DATA':
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
function requestBabySubzoneData(time = moment().format()) {
  return {
    type:       REQUEST_BABY_SUBZONE_DATA,
    isFetching: true,
    time
  };
}
function receivedBabySubzoneData(data, time = moment().format()) {
  return {
    type:       RECEIVED_BABY_SUBZONE_DATA,
    isFetching: false,
    data,
    time
  };
}

function errorBabySubzoneData(time = moment().format()) {
  return {
    type:       ERROR_BABY_SUBZONE_DATA,
    isFetching: false,
    time
  };
}

function fetchBabySubzoneData() { // CALLING AN API
  return dispatch => {
    // dispatch request action first
    dispatch(requestBabySubzoneData()); 

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
    .then(data => dispatch(receivedBabySubzoneData(data))) 
    .catch(error => dispatch(errorBabySubzoneData(error)))               
  }
}

function shouldFetchBabySubzoneData(state) {
  const babySubzoneDataStore = state.babySubzoneData; 
  if(babySubzoneDataStore.isFetching) {        
    return false;
  } else {        
    return true;
  }
}

export function fetchBabySubzoneDataIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchBabySubzoneData(getState())) {
      return dispatch(fetchBabySubzoneData());
    }
  };
}