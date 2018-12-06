import React, {
  Component
}                             from 'react';
import PropTypes              from 'prop-types';
import { default as Header }      from 'components/header/Header';
import { default as Sidebar }      from 'components/sidebar/Sidebar';

import { default as Routes }       from '../routes';

// Mapping State to Props
// Mapping Dispatch to Props
import { connect }            from 'react-redux';
import {
  bindActionCreators,
  compose
}                             from 'redux';
import { withRouter }         from 'react-router';
import { navigation }         from '../config/sidebar';
import * as viewsActions        from '../redux/modules/views';
import * as sidebarActions from '../redux/modules/sidebar';

import * as fetchChildrenAreaDataIfNeeded from '../redux/modules/children/childrenAreaData';
import * as fetchElderlyAreaDataIfNeeded from '../redux/modules/elderly/elderlyAreaData';

class Layout extends Component {    

  static propTypes = {  
    match:    PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history:  PropTypes.object.isRequired,

    sidebarIsOpen: PropTypes.bool,    
    childrenAreaDataIsFetching:  PropTypes.bool,
    elderlyAreaDataIsFetching:  PropTypes.bool,

    actions: PropTypes.shape({
      enterChildren: PropTypes.func,
      leaveChildren: PropTypes.func,  
      
      enterElderly: PropTypes.func,
      leaveElderly: PropTypes.func,  

      fetchChildrenAreaDataIfNeeded:     PropTypes.func,
      fetchElderlyAreaDataIfNeeded:     PropTypes.func,

      openSidebar:   PropTypes.func,
      closeSidebar:  PropTypes.func,
      toggleSidebar:  PropTypes.func
    })
  };

  componentDidMount() {
    const { actions: { toggleSidebar } } = this.props;    
    toggleSidebar();   
  }

  componentWillMount() {  
    const { actions: { enterWelcomePage } } = this.props;    
    enterWelcomePage();    

    const { actions: { fetchChildrenAreaDataIfNeeded } } = this.props;    
    fetchChildrenAreaDataIfNeeded(); 

    const { actions: { fetchElderlyAreaDataIfNeeded } } = this.props;    
    fetchElderlyAreaDataIfNeeded();     
  }

  componentWillUnmount() {
    const { actions: { leaveWelcomePage } } = this.props;
    leaveWelcomePage();
  }  

  render() {   
    const { sidebarIsOpen } = this.props;

    return (
      <div className="layout">
        <Header 
          toggleSidebar={this.handlesToggleSidebarClick}
        />      
        <Sidebar           
          sidebarConfig={navigation.sidebarConfig}
          isCollapsed={sidebarIsOpen}
        />    
        <div className={ sidebarIsOpen ? "container__wrap" : "container__wrap container--collapse"} >
          <div className="container">             
              <Routes />                                           
          </div>
        </div>
      </div>            
    );
  }


  handlesToggleSidebarClick = (event) => {
    if (event) {
      event.preventDefault();
    }
    const { actions: { toggleSidebar } } = this.props;
    toggleSidebar();
  }

}    

const mapStateToProps = (state) => {
  return {        
    sidebarIsOpen: state.sidebar.isOpen
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(
      {
        ...viewsActions,
        ...sidebarActions,
        ...fetchChildrenAreaDataIfNeeded,
        ...fetchElderlyAreaDataIfNeeded
      },
      dispatch)
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Layout);