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

class PageNotFound extends PureComponent {
  static propTypes = {
    actions: PropTypes.shape({
      enterPageNotFound: PropTypes.func.isRequired,
      leavePageNotFound: PropTypes.func.isRequired
    })
  };

  componentDidMount() {
    const { 
      actions: {
        enterPageNotFound
      } 
    } =  this.props;
    enterPageNotFound();
  }

  componentWillUnmount() {
    const { 
      actions: {
        leavePageNotFound
      }
    } = this.props;
    leavePageNotFound();
  }

  render() {
    return(                                    
      <Card className="page-not-found">
        <CardBody> 
            <b className="not-found-text">4</b> 
            <svg className="icon icon-cross-face">
              <use xlinkHref="#icon-cross-face"></use>
            </svg>                               
            <b className="not-found-text">4</b> 
            <h3 className="card__title"><b>PAGE NOT FOUND</b></h3>                
            <Link to="/"> 
              <button className="btn btn-back-to-home form-control">Back to Site</button>
            </Link>
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
        enterPageNotFound: actions.enterPageNotFound,
        leavePageNotFound: actions.leavePageNotFound,     
      },
      dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageNotFound);