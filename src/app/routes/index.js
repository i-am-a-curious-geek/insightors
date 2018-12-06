import React                        from 'react';
import {
  Route,
  Switch
}                                   from 'react-router-dom';
import { ConnectedRouter }      	from 'react-router-redux';
import { default as ChildrenConnected } from '../views/Children';
import { default as ElderlyConnected } from '../views/Elderly';
import { default as PageNotFound } from '../views/PageNotFound'; 
import { default as WelcomePage } from '../views/WelcomePage'; 

export const Routes = () => (
  	<Switch>            	  	
  	  <Route exact path="/" component={WelcomePage} />
	  <Route path="/children" component={ChildrenConnected}/>	
	  <Route path="/elderly" component={ElderlyConnected}/>		 	  
  	  <Route component={PageNotFound} />
	</Switch> 	  
);

export default Routes;