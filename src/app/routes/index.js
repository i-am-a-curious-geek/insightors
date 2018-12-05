import React                        from 'react';
import {
  Route,
  Switch
}                                   from 'react-router-dom';
import { ConnectedRouter }      	from 'react-router-redux';
import { default as BabyConnected } from '../views/Baby';
import { default as PageNotFound } from '../views/PageNotFound'; 

export const Routes = () => (
  	<Switch>            
	  <Route exact path="/" component={BabyConnected}/>	  	
	  <Route exact path="/baby" component={BabyConnected}/>		 
	  <Route component={PageNotFound}/>
	</Switch>
);

export default Routes;