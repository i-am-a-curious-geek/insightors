export {
	fetchChildrenSubzoneDataIfNeeded
} from './modules/children/childrenSubzoneData';
export {
	fetchChildrenAreaDataIfNeeded
} from './modules/children/childrenAreaData';
export {
	fetchPreschoolLocationDataIfNeeded
} from './modules/children/preschoolLocationData';
export {
	fetchChildcareServicesDataIfNeeded
} from './modules/children/childcareServicesData';


export {
	fetchElderlySubzoneDataIfNeeded
} from './modules/elderly/elderlySubzoneData';
export {
	fetchElderlyAreaDataIfNeeded
} from './modules/elderly/elderlyAreaData';
export {
	fetchEldercareServicesDataIfNeeded
} from './modules/elderly/eldercareServicesData';

export {
	fetchChasClinicsDataIfNeeded
} from './modules/elderly/chasClinicsData';

export {
	toggleSidebar,
	openSidebar,
	closeSidebar
} from './modules/sidebar';

export {	
	enterChildren,
	leaveChildren,

	enterElderly,
	leaveElderly,

	enterPageNotFound,
	leavePageNotFound,

	enterWelcomePage,
	leaveWelcomePage
}                                     from './modules/views';
