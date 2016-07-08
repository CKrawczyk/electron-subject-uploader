import React from 'react';
import { IndexLink } from 'react-router';
import SignInForm from './sign-in-form';
import ProjectSidebar from './project-sidebar';

export default class Layout extends React.Component {
  render() {
    let currentUser;
    let signIn;
    let signOut;
    if (this.context.user) {
      currentUser = (
        <div className="header-grid__current-user">
          Signed in as {this.context.user.login}
        </div>
      );
      signOut = (
        <button type="button" className="minor-button header-grid__sign-out" onClick={this.props.handleSignOut}>
          Sign out
        </button>
      );
    } else {
      signIn = <SignInForm className="header-grid__user" />;
    }
    let sidebar;
    if (this.context.project) {
      sidebar = <ProjectSidebar />;
    } else {
      sidebar = (
        <ul className="nav-list">
          <li>
            <div className="nav-list-header">
              Please select a project
            </div>
          </li>
        </ul>
      );
    }
    return (
      <div className="app">
        <div className="app__header">
          <div className="header-grid">
            {currentUser}
            {signOut}
            {signIn}
            <IndexLink to="/" className="header-grid__home" onClick={this.props.handleHomeClick}>
              Home
            </IndexLink>
          </div>
        </div>
        <div className="app__sidebar content-container">
          {sidebar}
        </div>
        <div className="app__content">
          <hr />
          <div className="content-container">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  children: React.PropTypes.node,
  router: React.PropTypes.object,
  handleSignOut: React.PropTypes.func,
  handleHomeClick: React.PropTypes.func,
};

Layout.contextTypes = {
  user: React.PropTypes.object,
  project: React.PropTypes.object,
};
