import React from 'react';
import { Link, withRouter } from 'react-router';
import apiClient from 'panoptes-client';

export class ProjectLink extends React.Component {
  constructor(props) {
    super(props);
    this.handleProjectChange = this.handleProjectChange.bind(this);
  }

  handleProjectChange() {
    this.context.updateProject(this.props.project);
  }

  render() {
    let avatar;
    let owner;
    if (this.props.avatar) {
      avatar = <img className="lab-index-project-row__avatar" alt={this.props.project.display_name} src={this.props.avatar.src} />;
    }
    if (this.props.owner) {
      owner = <small>by {this.props.owner.display_name}</small>;
    }
    return (
      <div className="lab-index-project-row">
        <Link
          to={`${this.props.project.id}`}
          className="lab-index-project-row__link lab-index-project-row__group lab-index-project-row__action"
          onClick={this.handleProjectChange}
        >
          {avatar}
          <div className="lab-index-project-row__description">
            <strong className="lab-index-project-row__name">{this.props.project.display_name}</strong>{' '}
            {owner}
          </div>
        </Link>
      </div>
    );
  }
}

ProjectLink.defaultProps = {
  project: {},
  avatar: null,
  owner: null,
};

ProjectLink.propTypes = {
  project: React.PropTypes.object,
  avatar: React.PropTypes.object,
  owner: React.PropTypes.object,
};

ProjectLink.contextTypes = {
  updateProject: React.PropTypes.func,
};

export class ProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.loadData = this.loadData.bind(this);
    this.handlePageChagne = this.handlePageChagne.bind(this);

    this.state = {
      loading: false,
      pages: 0,
      projects: [],
      avatars: {},
      owners: {},
      error: null,
    };
  }

  componentDidMount() {
    this.loadData(this.props.roles, this.props.page, this.props.withAvatars, this.props.withOwners);
  }

  loadData(roles, page) {
    this.setState({
      avatars: {},
      owners: {},
      error: null,
      loading: true,
    });

    const include = [];
    if (this.props.withAvatars) {
      include.push('avatar');
    }
    if (this.props.withOwners) {
      include.push('owners');
    }

    const query = {
      current_user_roles: roles,
      page,
      include,
      sort: 'display_name',
    };

    apiClient.type('projects').get(query)
      .then((projects) => {
        this.setState({ projects });
      })
      .catch((error) => {
        this.setState({ error });
      })
      .then(() => {
        this.setState({ loading: false });
      })
      .then(() => {
        this.state.projects.forEach((project) => {
          if (this.props.withAvatars) {
            project.get('avatar')
              .catch(() => {})
              .then((avatar) => {
                this.state.avatars[project.id] = avatar;
                this.forceUpdate();
              });
          }
          if (this.props.withOwners) {
            project.get('owner')
              .catch(() => null)
              .then((owner) => {
                this.state.owners[project.id] = owner;
                this.forceUpdate();
              });
          }
        });
      });
  }

  handlePageChagne(e) {
    this.props.onChangePage(parseFloat(e.target.value));
  }

  render() {
    let pages = 1;
    if (this.state.projects.length > 0) {
      pages = this.state.projects[0].getMeta().page_count;
    }
    pages = Math.max(pages, this.props.page);
    let pageSelect;
    if (!(this.state.error || pages === 1)) {
      const pageSelectInner = [];
      for (let i = 1; i <= pages; i++) {
        pageSelectInner.push(<option key={i} value={i}>{i}</option>);
      }
      pageSelect = (
        <small className="form-help">
          Page{' '}
          <select value={this.props.page} disabled={this.state.loading} onChange={this.handlePageChagne}>
            {pageSelectInner}
          </select>
        </small>
      );
    }
    let content;
    if (this.state.loading) {
      content = <small className="form-help">Loading...</small>;
    } else if (this.state.error) {
      content = <p className="form-help error">{this.state.error.toString()}</p>;
    } else if (this.state.projects.length === 0) {
      content = <p className="form-help">No projects</p>;
    } else {
      const contentInner = [];
      for (const project of this.state.projects) {
        contentInner.push(
          <li key={project.id} className="lab-index-project-list__item">
            <ProjectLink
              project={project}
              avatar={this.state.avatars[project.id]}
              owner={this.state.owners[project.id]}
            />
          </li>
        );
      }
      content = (
        <ul className="lab-index-project-list">
          {contentInner}
        </ul>
      );
    }
    return (
      <div>
        <header>
          <p>
            <strong className="form-label">{this.props.title}</strong>
            <pageSelect />
          </p>
        </header>
        {content}
      </div>
    );
  }
}

ProjectList.defaultProps = {
  title: '',
  page: 1,
  roles: [],
  withAvatars: false,
  withOwners: false,
};

ProjectList.propTypes = {
  title: React.PropTypes.string,
  page: React.PropTypes.number,
  roles: React.PropTypes.array,
  withAvatars: React.PropTypes.bool,
  withOwners: React.PropTypes.bool,
  onChangePage: React.PropTypes.func,
};

class ProjectListDisplay extends React.Component {
  handlePageChange(which, page) {
    const queryUpdate = {};
    queryUpdate[which] = page;
    const newQuery = Object.assign({}, this.props.location.query, queryUpdate);
    const newLoaction = Object.assign({}, this.props.location, { query: newQuery });
    this.props.router.push(newLoaction);
  }

  render() {
    return (
      <div>
        <ProjectList
          title="Your projects"
          page={this.props.location.query['owned-page']}
          roles={['owner', 'workaround']}
          withAvatars
          onChangePage={this.handlePageChange.bind(this, 'owned-page')}
        />
        <hr />
        <ProjectList
          title="Collaborations"
          page={this.props.location.query['collaborations-page']}
          roles={['collaborator']}
          withOwners
          style={{ fontSize: '0.8em' }}
          onChangePage={this.handlePageChange.bind(this, 'collaborations-page')}
        />
      </div>
    );
  }
}

ProjectListDisplay.defaultProps = {
  location: {
    query: {
      'owned-page': 1,
      'collaborations-page': 1,
    },
  },
};

ProjectListDisplay.propTypes = {
  location: React.PropTypes.object,
  router: React.PropTypes.object,
};

export default withRouter(ProjectListDisplay);
