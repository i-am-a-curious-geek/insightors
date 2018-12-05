import React      from 'react';
import PropTypes  from 'prop-types';

const ToggleButton = ({ onClick }) => (  
  <div className="toggle__button" onClick={onClick}>
    <div className="topbar__button" > 
		<svg className="icon icon-bars">
	       <use xlinkHref="#icon-bars"></use>
	    </svg>         
    </div>
  </div>
);

ToggleButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default ToggleButton;