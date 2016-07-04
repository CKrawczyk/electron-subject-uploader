import React from 'react';

export const ProjectSidebar = (props, context) => {
  return (
    <ul className="nav-list">
      <li>
        <div className="nav-list-header">
          Project #{context.project.id}
        </div>
      </li>
    </ul>
  );
};

ProjectSidebar.contextTypes = {
  project: React.PropTypes.object,
};
