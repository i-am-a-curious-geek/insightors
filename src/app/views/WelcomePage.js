import React, {
  PureComponent
}                       from 'react';
import PropTypes        from 'prop-types';
import { Card, CardBody, Col } from 'reactstrap';
import {
  default as AnimatedView
}                         from 'components/AnimatedView';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as actions           from '../redux/actions';
import * as sidebarActions from '../redux/modules/sidebar';

class WelcomePage extends PureComponent {
  static propTypes = {
    actions: PropTypes.shape({
      enterWelcomePage: PropTypes.func.isRequired,
      leaveWelcomePage: PropTypes.func.isRequired,

      toggleSidebar:  PropTypes.func
    })
  };

  componentDidMount() {
    const { 
      actions: { enterWelcomePage } 
    } =  this.props;
    enterWelcomePage();
  }

  componentWillUnmount() {
    const { 
      actions: { leaveWelcomePage }
    } = this.props;
    leaveWelcomePage();
  }

  render() {
    return(                                    
      <Card className="page-not-found">
        <CardBody>            
            <h3 className="card__title">
              <b className="not-found-text"><small style={{whiteSpace: "nowrap", "color": "#a30032"}}>WELCOME</small> <small style={{whiteSpace: "nowrap", "color": "#a30032"}}>TO</small> <small style={{whiteSpace: "nowrap", "color": "#a30032"}}>INSIGHT             
                <svg className="icon icon-eye">
                  <use xlinkHref="#icon-eye"></use>
                </svg> 
                RS!</small>
              </b>
            </h3>
            <small className="card__title" style={{whiteSpace: "nowrap", textAlign: "center"}}>
              To start exploring, select the left menu 
                <span className="menu-icon" onClick={this.handlesToggleSidebarClick}>
                  <svg className="icon icon-bars" style={{width: 20, height: 20}}>
                    <use xlinkHref="#icon-bars"></use>
                  </svg>
                </span>
            </small>   
        </CardBody>
      </Card>                               
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
    currentView:  state.views.currentView,
    sidebarIsOpen: state.sidebar.isOpen
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(
      {        
        enterWelcomePage: actions.enterWelcomePage,
        leaveWelcomePage: actions.leaveWelcomePage,
        ...sidebarActions   
      },
      dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomePage);