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

class WelcomePage extends PureComponent {
  static propTypes = {
    actions: PropTypes.shape({
      enterWelcomePage: PropTypes.func.isRequired,
      leaveWelcomePage: PropTypes.func.isRequired
    })
  };

  componentDidMount() {
    const { 
      actions: {
        enterWelcomePage
      } 
    } =  this.props;
    enterWelcomePage();
  }

  componentWillUnmount() {
    const { 
      actions: {
        leaveWelcomePage
      }
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
              <small className="card__title">
                Select the menu on the left to start exploring!
              </small>   
          </CardBody>
        </Card>                               
      );
    
  }
}

const mapStateToProps = (state) => {
  return {
    currentView:  state.views.currentView
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(
      {        
        enterWelcomePage: actions.enterWelcomePage,
        leaveWelcomePage: actions.leaveWelcomePage     
      },
      dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomePage);