import React from 'react';
import { IndexLink } from 'react-router';
import SignInForm from './sign-in-form';
import auth from 'panoptes-client/lib/auth';

export class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut() {
    auth.signOut().then(() => {
      this.context.updateUser(null);
    });
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
    return (
      <div className="app">
        <div className="app__header">
          <div className="header-grid">
            {currentUser}
            {signOut}
            {signIn}
            <IndexLink to="/" className="header-grid__home">
              Home
            </IndexLink>
          </div>
        </div>
        <div className="app__sidebar">
          <ul className="nav-list">
            <li><IndexLink to="/" activeClassName="active" className="nav-list-item">
              Home
            </IndexLink></li>
          </ul>
        </div>
        <div className="app__content">
          <hr />
          {this.props.children}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  children: React.PropTypes.node,
};

Header.contextTypes = {
  updateUser: React.PropTypes.func,
  user: React.PropTypes.object,
};
