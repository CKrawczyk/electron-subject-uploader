import React from 'react';

export default class Project extends React.Component {
  render() {
    return (
      <div>
        Project info for #{this.context.project.id}
        <hr />
        {this.props.children}
      </div>
    );
  }
}

Project.propTypes = {
  children: React.PropTypes.node,
};

Project.contextTypes = {
  project: React.PropTypes.object,
};
