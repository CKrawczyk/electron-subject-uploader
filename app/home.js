import React from 'react';
import { Link } from 'react-router';

export default class Home extends React.Component {
  render() {
    let projectList;
    if (this.context.user) {
      projectList = (
        <div>
          Project List here
        </div>
      );
    }
    return (
      <div className="landing-page">
        <h3 className="landing-title">
          Zooniverse Subject Uploader
        </h3>

        <div className="landing-actions">
          <div className="landing-buttons">
            <Link type="button" className="call-to-action standard-button landing-button" to="/sign-in">
              Sign in/out
            </Link>
          </div>
        </div>
        {projectList}
      </div>
    );
  }
}

Home.contextTypes = {
  user: React.PropTypes.object,
};
