import React from 'react';
import Layout from './layout';
import auth from 'panoptes-client/lib/auth';
import { withRouter } from 'react-router';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.updateUser = this.updateUser.bind(this);
    this.updateProject = this.updateProject.bind(this);
    this.updateSubjectSet = this.updateSubjectSet.bind(this);
    this.getChildContext = this.getChildContext.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleHomeClick = this.handleHomeClick.bind(this);

    this.state = {
      user: null,
      project: null,
      subjectSet: null,
    };
  }

  getChildContext() {
    return {
      user: this.state.user,
      updateUser: this.updateUser,
      project: this.state.project,
      updateProject: this.updateProject,
      subjectSet: this.state.subjectSet,
      updateSubjectSet: this.updateSubjectSet,
    };
  }

  updateUser(user) {
    this.setState({ user });
  }

  updateProject(project) {
    this.setState({ project });
  }

  updateSubjectSet(subjectSet) {
    this.setState({ subjectSet });
  }

  handleSignOut() {
    this.props.router.push('/');
    this.setState({
      user: null,
      project: null,
      subjectSet: null,
    });
    auth.signOut();
  }

  handleHomeClick() {
    this.setState({
      project: null,
      subjectSet: null,
    });
  }

  render() {
    return (
      <div className="wrapper">
        <Layout handleSignOut={this.handleSignOut} handleHomeClick={this.handleHomeClick}>
          {this.props.children}
        </Layout>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
  router: React.PropTypes.object,
};

App.childContextTypes = {
  user: React.PropTypes.object,
  updateUser: React.PropTypes.func,
  project: React.PropTypes.object,
  updateProject: React.PropTypes.func,
  subjectSet: React.PropTypes.object,
  updateSubjectSet: React.PropTypes.func,
};

export default withRouter(App);
