import { routerReducer }    from 'react-router-redux';
import { combineReducers }  from 'redux';

import babySubzoneData  from './modules/baby/babySubzoneData';
import babyAreaData from './modules/baby/babyAreaData';
import preschoolLocationData from './modules/baby/preschoolLocationData';
import childcareServicesData from './modules/baby/childcareServicesData';

import sidebar                from './modules/sidebar';
import views                from './modules/views';

export const reducers = {      
  babySubzoneData,  
  babyAreaData,
  preschoolLocationData,
  childcareServicesData,

  sidebar,
  views
};

export default combineReducers({
  ...reducers,
  routing: routerReducer
});
