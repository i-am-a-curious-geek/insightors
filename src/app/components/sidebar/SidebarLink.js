import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const SidebarLink = ({
  title,   
  link
}) => (
  <NavLink to={link}>
    <li className="sidebar__link">    
      <p className="sidebar__link-title">{title}</p>
    </li>
  </NavLink>
);


SidebarLink.propTypes = {
  title: PropTypes.string.isRequired,  
  link: PropTypes.string
};

SidebarLink.defaultProps = {
  title: "",  
  link: "/"
};

export default SidebarLink;