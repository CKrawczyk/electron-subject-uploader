import React from 'react';
import { IndexLink } from 'react-router';

export default class SideBar extends React.Component {
  render() {
    return (
      <div className="panoptes-main">
        <div className="columns-container content-container">
          <div>
            <ul className="nav-list">
              <li><IndexLink to="/" activeClassName="active" className="nav-list-item">
                Home
              </IndexLink></li>
              <li><IndexLink to="/sign-in" activeClassName="active" className="nav-list-item">
                User
              </IndexLink></li>
            </ul>
          </div>
          <hr />
          <div className="column">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

SideBar.propTypes = {
  children: React.PropTypes.node,
};

SideBar.contextTypes = {
  user: React.PropTypes.object,
};
