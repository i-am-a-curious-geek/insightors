import React        from 'react';
import PropTypes    from 'prop-types';
import { Link } from 'react-router-dom';

import ToggleButton from './ToggleButton';
import TopbarButton from './TopbarButton';

const Header = ({    
  toggleSidebar
}) => (
  <div className="topbar">
    <div className="topbar__wrapper">
      <div className="topbar__left">         
        <ToggleButton
          onClick={toggleSidebar}
        />
        <Link className="topbar__logo" to="/" />       
      </div>
      <div className="topbar__right"></div>  
    </div>   
  </div>
);

Header.propTypes = {  
  toggleSidebar: PropTypes.func
};

export default Header;