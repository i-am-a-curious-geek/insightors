import { routerReducer }    from 'react-router-redux';
import { combineReducers }  from 'redux';

import babySubzoneData  from './modules/baby/babySubzoneData';
import babyAreaData from './modules/baby/babyAreaData';
import preschoolLocationData from './modules/baby/preschoolLocationData';

import sidebar                from './modules/sidebar';
import views                from './modules/views';

export const reducers = {      
  babySubzoneData,  
  babyAreaData,
  preschoolLocationData,
  
  sidebar,
  views
};

export default combineReducers({
  ...reducers,
  routing: routerReducer
});
