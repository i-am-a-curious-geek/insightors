import React      from 'react';
import PropTypes  from 'prop-types';
import cx         from 'classnames';

import SidebarCategory from './SidebarCategory';

const Sidebar = ({  
  isCollapsed,  
  sidebarConfig
}) => {
  const sidebarClass = cx({
    sidebar: true,
    'sidebar--show': !isCollapsed,
    'sidebar--collapse': isCollapsed,
  });

  return (
    <div className={sidebarClass}>            
        <div className="sidebar__wrapper">
          <div className="sidebar__content">
            <ul className="sidebar__block">
                {
                  sidebarConfig.map(
                    ({category, icon, links, path}, id) => {
                      if(path) {
                        return (
                          <SidebarCategory
                            key={id}
                            category={category}
                            icon={icon}                                                
                            path={path}                                            
                          />
                        );
                      } else {
                        return (
                          <SidebarCategory
                            key={id}
                            category={category}
                            icon={icon}                    
                            links={links}
                            path={path}                                            
                          />
                        );
                      }                      
                    }
                  )
                }
            </ul>
          </div>
        </div>        
    </div>
  )
};

Sidebar.propTypes = {  
  isCollapsed:  PropTypes.bool,
  sidebarConfig: PropTypes.arrayOf(
    PropTypes.shape({      
      category:  PropTypes.string.isRequired,
      links:  PropTypes.arrayOf(
        PropTypes.shape({
          title:  PropTypes.string,
          icon:   PropTypes.string,
          link:   PropTypes.string,
          path:   PropTypes.string
        })
      )
    })
  ).isRequired
};

Sidebar.defaultProps = {  
  isCollapsed:  false
};

export default Sidebar