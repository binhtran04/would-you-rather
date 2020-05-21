import React from 'react';

const PollPage = () => {
  return <div>poll</div>;
};

function mapStateToProps({ authedUser, users, questions }, props) {
  const { id } = props.match.params;

  return {
    id,
  };
}

export default PollPage;
