import React, { Component } from 'react';
import { Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import cx from 'classnames';
import SidebarLink from './SidebarLink';
import {
  Motion,
  spring
}                       from 'react-motion';

export default class SidebarCategory extends Component {
  static propTypes = {
    category: PropTypes.string.isRequired,
    icon: PropTypes.string,    
    title: PropTypes.string,  
    path:  PropTypes.string, 
    links: PropTypes.arrayOf(PropTypes.element)
  };

  static defaultProps = {
    icon: ""
  };

  constructor() {
    super();
    this.state = {
      collapse: false,
    };
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  render() {
    const {
      category, 
      icon, 
      links,
      path
    } = this.props;

    const categoryClass = cx({
      'sidebar__category-wrap': true,
      'sidebar__category-wrap--open': this.state.collapse,
    });
      if(path) {
        return (<div className={categoryClass}>          
          <button className="sidebar__link sidebar__category">
             {icon ? 
                  <div>
                    <svg className={`icon icon-${icon} sidebar__link-icon`}>
                      <use xlinkHref={`#icon-${icon}`}></use>
                    </svg> 
                    <p className="sidebar__link-title">
                      <Link to={path}>
                        <b>{category}</b>
                      </Link>
                    </p>  
                  </div>
               : <p className="sidebar__link-title">
                  <b>{category}</b>                               
                </p> 
             } 
          </button>
        </div>);
      } else {
        return (<div className={categoryClass}>          
          <button className="sidebar__link sidebar__category" onClick={this.toggle}>
             {icon ? 
                  <div>
                    <svg className={"icon icon-" + icon + " sidebar__link-icon"}>
                      <use xlinkHref={"#icon-" + icon}></use>
                    </svg> <p className="sidebar__link-title"><b>{category}</b>                  
                    </p> 
                  </div>
               : <p className="sidebar__link-title">
                  <b>{category}</b>                 
                </p> 
             } 
             <Motion
                style={{
                  deg: (this.state.collapse) ? spring(0) : spring(180)
                }}>
                {
                  ({ deg }) => {
                    return (
                      <svg className="icon icon-chevron-up pull-right sidebar__link-icon-chevron"  style={{
                          WebkitTransform:  `rotate(${deg}deg)`,
                          transform:        `rotate(${deg}deg)`,                        
                        }}>
                        <use xlinkHref="#icon-chevron-up"></use>
                      </svg>
                    )
                  }
                }
              </Motion>                       
          </button>
          <Collapse isOpen={this.state.collapse} className="sidebar__submenu-wrap">
            <ul className="sidebar__submenu">
              <div>
                {
                  links.map(
                    ({title, link}, id) => {
                      return (
                        <SidebarLink
                          key={id}
                          title={title}                                    
                          link={link}                   
                        />
                      );
                    }
                  )
                }
              </div>
            </ul>
          </Collapse>
        </div>)        
      }
  }
}