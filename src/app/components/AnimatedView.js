import React, { PureComponent } from 'react';
import PropTypes            from 'prop-types';
import { withRouter }       from 'react-router-dom';

class AnimatedView extends PureComponent {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    const {      
      children
    } = this.props;

    return (
      <div>
        <div className="theme-light">
          <main>
            <div>
              { children }
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default withRouter(AnimatedView);