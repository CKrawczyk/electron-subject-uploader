import React from 'react';

export class Project extends React.Component {
  render() {
    return (
      <div>
        Project info for #{this.context.project.id}
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

export class SubjectSet extends React.Component {
  render() {
    return (
      <div>
        Subject set #{this.context.subjectSet.id}
      </div>
    );
  }
}

SubjectSet.contextTypes = {
  subjectSet: React.PropTypes.object,
};
