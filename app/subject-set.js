import React from 'react';
import apiClient from 'panoptes-client';
import { LoadingIndicator } from './loading-indicator';

export default class SubjectSet extends React.Component {
  render() {
    return (
      <div>
        Subject set #{this.context.subjectSet.id}
        <br />
        This set contains {this.context.subjectSet.set_member_subjects_count} subjects:
        <br />
        <SubjectSetListing subjectSet={this.context.subjectSet} />
      </div>
    );
  }
}

SubjectSet.contextTypes = {
  subjectSet: React.PropTypes.object,
};

class SubjectSetListingRow extends React.Component {
  render() {
    let filename = '';
    if (this.props.subject.metadata.Filename) {
      filename = `- ${this.props.subject.metadata.Filename}`;
    }
    return (
      <tr key={this.props.subject.id}>
        <td>
          <small className="form-help">{this.props.subject.id}{filename}</small>
        </td>
      </tr>
    );
  }
}

SubjectSetListingRow.propTypes = {
  subject: React.PropTypes.object,
};

SubjectSetListingRow.defaultProps = {
  subject: {},
};

class SubjectSetListingTable extends React.Component {
  render() {
    const rows = [];
    for (const subject of this.props.subjects) {
      rows.push(
        <SubjectSetListingRow key={subject.id} subject={subject} />
      );
    }
    return (
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}

SubjectSetListingTable.propTypes = {
  subjects: React.PropTypes.array,
};

SubjectSetListingTable.defaultProps = {
  subjects: [],
};

class SubjectSetListing extends React.Component {
  constructor(props) {
    super(props);
    this.getSetMemberSubjects = this.getSetMemberSubjects.bind(this);
    this.onPageChange = this.onPageChange.bind(this);

    this.state = {
      page: 1,
      pageCount: NaN,
      subjects: [],
    };
  }

  componentDidMount() {
    this.getSetMemberSubjects();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.subjectSet !== this.props.subjectSet) {
      this.setState({
        page: 1,
        pageCount: NaN,
        subjects: [],
        busy: false,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.subjectSet !== this.props.subjectSet) {
      this.getSetMemberSubjects();
    }
  }

  onPageChange(e) {
    this.setState({ page: e.target.value }, this.getSetMemberSubjects);
  }

  getSetMemberSubjects() {
    this.setState({ busy: true }, () => {
      const setMemberSubjects = apiClient.type('set_member_subjects').get({
        subject_set_id: this.props.subjectSet.id,
        page: this.state.page,
      });
      setMemberSubjects.then(([setMemberSubject]) => {
        let newPageCount = NaN;
        if (setMemberSubject) {
          newPageCount = setMemberSubject.getMeta().page_count;
        }
        if (newPageCount !== this.state.pageCount) {
          this.setState({ pageCount: newPageCount });
        }
      });
      setMemberSubjects.get('subject')
        .then((subjects) => {
          this.setState({ subjects, busy: false });
        });
    });
  }

  render() {
    let options;
    if (isNaN(this.state.pageCount)) {
      options = <option>?</option>;
    } else {
      options = [];
      for (let p = 1; p <= this.state.pageCount; p++) {
        options.push(
          <option key={p} value={p}>
            {p}
          </option>
        );
      }
    }
    let table;
    if (!this.state.busy) {
      table = <SubjectSetListingTable subjects={this.state.subjects} />;
    } else {
      table = <LoadingIndicator />;
    }
    return (
      <div>
        {table}
        <nav className="pagination">
          Page <select value={this.state.page} disabled={(this.state.pageCount < 2) || (isNaN(this.state.pageCount))} onChange={this.onPageChange}>
            {options}
          </select> of {this.state.page || '?'}
        </nav>
      </div>
    );
  }
}

SubjectSetListing.propTypes = {
  subjectSet: React.PropTypes.object,
};

SubjectSetListing.defaultProps = {
  subjectSet: {},
};
