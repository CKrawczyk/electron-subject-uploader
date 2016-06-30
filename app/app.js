import React from 'react';
import SideBar from './nav';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateUser = this.updateUser.bind(this);
    this.getChildContext = this.getChildContext.bind(this);

    this.state = {
      user: null,
    };
  }

  getChildContext() {
    return {
      user: this.state.user,
      updateUser: this.updateUser,
    };
  }

  updateUser(user) {
    this.setState({ user });
  }

  render() {
    return (
      <div className="app-main">
        <SideBar>
          {this.props.children}
        </SideBar>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
};

App.childContextTypes = {
  user: React.PropTypes.object,
  updateUser: React.PropTypes.func,
};