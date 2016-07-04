import React from 'react';
import Layout from './layout';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateUser = this.updateUser.bind(this);
    this.updateProject = this.updateProject.bind(this);
    this.getChildContext = this.getChildContext.bind(this);

    this.state = {
      user: null,
      project: null,
    };
  }

  getChildContext() {
    return {
      user: this.state.user,
      updateUser: this.updateUser,
      project: this.state.project,
      updateProject: this.updateProject,
    };
  }

  updateUser(user) {
    this.setState({ user });
  }

  updateProject(project) {
    this.setState({ project });
  }

  render() {
    return (
      <div className="wrapper">
        <Layout>
          {this.props.children}
        </Layout>
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
  project: React.PropTypes.object,
  updateProject: React.PropTypes.func,
};
