import React from 'react';
import { Link } from 'react-router';

export default class ProjectSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.loadData = this.loadData.bind(this);

    this.state = {
      error: null,
      loading: false,
      subjectSets: [],
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    this.setState({ loading: true });
    this.context.project.get('subject_sets')
      .then((subjectSets) => {
        this.setState({ subjectSets, loading: false });
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  }

  handleChangeSubjectSet(subjectSet) {
    this.context.updateSubjectSet(subjectSet);
  }

  render() {
    const subjectSetList = [];
    if (!this.state.loading) {
      for (const subjectSet of this.state.subjectSets) {
        const subjectSetListLabel = subjectSet.display_name || <i>'Untitled subject set'</i>;
        subjectSetList.push(
          <li key={subjectSet.id}>
            <Link
              to={`${this.context.project.id}/subject-set/${subjectSet.id}`}
              activeClassName="active"
              className="nav-list-item"
              title="A subject is an image (or group of images) to be analyzed."
              onClick={this.handleChangeSubjectSet.bind(this, subjectSet)}
            >
              {subjectSetListLabel}
            </Link>
          </li>
        );
      }
    }
    return (
      <ul className="nav-list">
        <li>
          <div className="nav-list-header">
            Project #{this.context.project.id}
          </div>
        </li>
        {subjectSetList}
      </ul>
    );
  }
}

ProjectSidebar.contextTypes = {
  project: React.PropTypes.object,
  subjectSet: React.PropTypes.object,
  updateSubjectSet: React.PropTypes.func,
};
