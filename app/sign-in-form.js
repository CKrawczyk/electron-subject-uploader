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

  render() {
    const disabled = (this.context.user != null) || this.state.busy;
    let signIn;
    let error;
    let className = 'sign-in-form';
    if (this.props.className) {
      className = `${this.props.className} ${className}`;
    }
    const user = this.context.user || { login: undefined, password: undefined };
    if (this.state.busy) {
      signIn = <LoadingIndicator className="sign-in-form__submit" />;
    } else {
      signIn = (
        <button
          type="submit"
          className="standard-button sign-in-form__submit"
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
    }
    return (
      <form className={className} method="POST" onSubmit={this.handleSubmit}>
        <input
          type="text"
          className="standard-input sign-in-form__username"
          name="login"
          vlaue={user.login}
          disabled={disabled}
          autoFocus
          onChange={this.handleInputChange}
          placeholder="User name or Email"
        />
        <input
          type="password"
          className="standard-input sign-in-form__password"
          name="password"
          value={user.password}
          disabled={disabled}
          onChange={this.handleInputChange}
          placeholder="Password"
        />
        {signIn}
        {error}
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
  className: React.PropTypes.string,
};

SignInForm.contextTypes = {
  updateUser: React.PropTypes.func,
  user: React.PropTypes.object,
};

export default withRouter(SignInForm);
