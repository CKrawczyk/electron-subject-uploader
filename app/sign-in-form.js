import React from 'react';
import ReactDom from 'react-dom';
import { LoadingIndicator } from './loading-indicator';
import auth from 'panoptes-client/lib/auth';

export default class SignInForm extends React.Component {
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
      signedIn: false,
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
    this.setState({ working: true }, () => {
      const { login, password } = this.state;
      auth.signIn({ login, password })
        .then((user) => {
          this.setState({ working: false, error: null, signedIn: true }, () => {
            if (this.props.onSuccess) {
              this.props.onSuccess(user);
            }
          });
        })
        .catch((error) => {
          this.setState({ working: false, error }, () => {
            ReactDom.findDOMNode(this).querySelector('[name="login"]').focus();
            if (this.props.onFailure) {
              this.props.onFailure(error);
            }
          });
        });
      if (this.props.onSubmit) {
        this.props.onSubmit(e);
      }
    });
  }

  handleSignOut() {
    this.setState({ busy: true }, () => {
      auth.signOut().then(() => {
        this.setState({ busy: false, password: '', signedIn: false });
      });
    });
  }

  render() {
    const disabled = this.state.busy;
    let signOut;
    let signIn;
    let error;
    let busy;
    if (this.state.signedIn) {
      signOut = (
        <div className="form-help">
          Signed in as {this.state.login}{' '}
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
            vlaue={this.state.login}
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
            value={this.state.password}
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
};
