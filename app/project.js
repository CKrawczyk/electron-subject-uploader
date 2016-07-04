import React from 'react';

export default class Project extends React.Component {
  render() {
    return (
      <div>
        Project info for #{this.context.project.id}
      </div>
    );
  }
}

Project.contextTypes = {
  project: React.PropTypes.object,
};
