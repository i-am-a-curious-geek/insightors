import React      from 'react';
import PropTypes  from 'prop-types';
import { Link } from 'react-router-dom';

const TopbarButton = ({ caption, path, icon }) => (  
  <div>
    <Link className="topbar__button" to={path}> 
    	 <svg className={`icon icon-${icon}`}>
            <use xlinkHref={`#icon-${icon}`}></use>
          </svg>         
    </Link>
  </div>
);

TopbarButton.propTypes = {
  path: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default TopbarButton;