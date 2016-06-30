import React from 'react';
import ReactDom from 'react-dom';
import { LoadingIndicator } from './loading-indicator';
import auth from 'panoptes-client/lib/auth';
import { withRouter } from 'react-router';

class SignInForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);

    this.state = {
      busy: false,
      login: '',
      password: '',
      error: null,
    };
  }

  handleInputChange(e) {
    const newState = {
      [e.target.name]: e.target.value,
    };
    this.setState(newState);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ busy: true }, () => {
      const { login, password } = this.state;
      auth.signIn({ login, password })
        .then((user) => {
          this.setState({ busy: false, error: null, password: '' }, () => {
            if (this.context.updateUser) {
              this.context.updateUser(user);
              this.props.router.push('/');
            }
          });
        })
        .catch((error) => {
          this.setState({ busy: false, error }, () => {
            ReactDom.findDOMNode(this).querySelector('[name="login"]').focus();
            if (this.props.onFailure) {
              this.props.onFailure(error);
            }
          });
        });
    });
  }

  handleSignOut() {
    this.setState({ busy: true }, () => {
      auth.signOut().then(() => {
        this.setState({ busy: false, password: '' });
        this.context.updateUser(null);
      });
    });
  }

  render() {
    const disabled = (this.context.user != null) || this.state.busy;
    let signOut;
    let signIn;
    let error;
    let busy;
    let user = {
      login: undefined,
      password: undefined,
    };
    if (this.context.user) {
      user = this.context.user;
      signOut = (
        <div className="form-help">
          Signed in as {user.login}{' '}
          <button type="button" className="minor-button" onClick={this.handleSignOut}>Sign out</button>
        </div>
      );
    } else {
      signIn = (
        <button
          type="submit"
          className="standard-button full"
          disabled={disabled || this.state.login.length === 0 || this.state.password.length === 0}
        >
          Sign in
        </button>
      );
    }
    if (this.state.error) {
      let innerError;
      if (this.state.error.message.match(/invalid(.+)password/i)) {
        innerError = 'Username or password incorrect';
      } else {
        innerError = <span>{this.state.error.toString()}</span>;
      }
      error = (
        <div className="form-help error">
          {innerError}
        </div>
      );
    } else if (this.state.busy) {
      busy = <LoadingIndicator />;
    }
    return (
      <form method="POST" onSubmit={this.handleSubmit}>
        <label>
          User name or Email Address
          <input
            type="text"
            className="standard-input full"
            name="login"
            vlaue={user.login}
            disabled={disabled}
            autoFocus
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Password
          <input
            type="password"
            className="standard-input full"
            name="password"
            value={user.password}
            disabled={disabled}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <div style={{ textAlign: 'center' }}>
          {signIn}
          {signOut}
          {error}
          {busy}
        </div>
      </form>
    );
  }
}

SignInForm.propTypes = {
  onSuccess: React.PropTypes.func,
  onFailure: React.PropTypes.func,
  onSubmit: React.PropTypes.func,
  user: React.PropTypes.object,
  router: React.PropTypes.object,
};

SignInForm.contextTypes = {
  updateUser: React.PropTypes.func,
  user: React.PropTypes.object,
};

export default withRouter(SignInForm);
