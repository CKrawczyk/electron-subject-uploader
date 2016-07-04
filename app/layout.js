import React from 'react';
import { IndexLink } from 'react-router';
import SignInForm from './sign-in-form';
import auth from 'panoptes-client/lib/auth';
import ProjectSidebar from './project-sidebar';

export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleHomeClick = this.handleHomeClick.bind(this);
  }

  handleSignOut() {
    auth.signOut().then(() => {
      this.context.updateUser(null);
      this.context.updateProject(null);
      this.context.updateSubjectSet(null);
    });
  }

  handleHomeClick() {
    this.context.updateProject(null);
    this.context.updateSubjectSet(null);
  }

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
        <button type="button" className="minor-button header-grid__sign-out" onClick={this.handleSignOut}>
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
            <IndexLink to="/" className="header-grid__home" onClick={this.handleHomeClick}>
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
};

Layout.contextTypes = {
  user: React.PropTypes.object,
  updateUser: React.PropTypes.func,
  project: React.PropTypes.object,
  updateProject: React.PropTypes.func,
  updateSubjectSet: React.PropTypes.func,
};
