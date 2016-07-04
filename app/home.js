import React from 'react';
import ProjectListDisplay from './project-list';

export default class Home extends React.Component {
  render() {
    let projectList;
    if (this.context.user) {
      projectList = <ProjectListDisplay />;
    } else {
      projectList = (
        <div>
          Please sign in to see your projects
        </div>
      );
    }
    return (
      <div>
        <h3 className="landing-title">
          Zooniverse Subject Uploader
        </h3>
        {projectList}
      </div>
    );
  }
}

Home.contextTypes = {
  user: React.PropTypes.object,
};
