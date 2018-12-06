import { routerReducer }    from 'react-router-redux';
import { combineReducers }  from 'redux';

import childrenSubzoneData  from './modules/children/childrenSubzoneData';
import childrenAreaData from './modules/children/childrenAreaData';
import preschoolLocationData from './modules/children/preschoolLocationData';
import childcareServicesData from './modules/children/childcareServicesData';

import elderlySubzoneData  from './modules/elderly/elderlySubzoneData';
import elderlyAreaData from './modules/elderly/elderlyAreaData';
import eldercareServicesData from './modules/elderly/eldercareServicesData';

import sidebar                from './modules/sidebar';
import views                from './modules/views';

export const reducers = {      
  childrenSubzoneData,  
  childrenAreaData,
  preschoolLocationData,
  childcareServicesData,

  elderlySubzoneData,  
  elderlyAreaData,
  eldercareServicesData,

  sidebar,
  views
};

export default combineReducers({
  ...reducers,
  routing: routerReducer
});