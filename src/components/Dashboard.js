import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import { Typography } from '@material-ui/core';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Typography component="h2" variant="h2">
          Questions
        </Typography>
        {this.props.questionIds.map((id) => (
          <Question id={id} key={id} />
        ))}
      </div>
    );
  }
}

function mapStateToProps({ questions }) {
  return {
    questionIds: Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp),
  };
}

export default connect(mapStateToProps)(Dashboard);
