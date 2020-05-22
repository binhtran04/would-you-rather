import React from 'react';
import { connect } from 'react-redux';
import { Typography, Card, makeStyles, CardMedia, CardContent, CardHeader, Badge } from '@material-ui/core';
import Filter1Icon from '@material-ui/icons/Filter1';
import Filter2Icon from '@material-ui/icons/Filter2';
import Filter3Icon from '@material-ui/icons/Filter3';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom: '1rem',
  },
  cover: {
    width: 151,
  },
  content: {
    flex: '1 1 50%',
  },
  score: {
    flex: '1 1 25%',
    textAlign: 'center',
  },
  scoreHeader: {
    borderBottom: '1px solid rgba(0,0,0,0.1)',
  },
}));

const LeaderBoard = ({ sortedUsers }) => {
  return (
    <>
      <Typography component="h2" variant="h2" gutterBottom>
        Leader Board
      </Typography>
      {sortedUsers.map((user, idx) => (
        <LeaderBoardCard key={user.id} user={user} rank={idx + 1} />
      ))}
    </>
  );
};

const resolveBadge = (rank) => (
  <Badge>
    {rank === 1 && <Filter1Icon />}
    {rank === 2 && <Filter2Icon />}
    {rank === 3 && <Filter3Icon />}
  </Badge>
);

const LeaderBoardCard = ({ user, rank }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.cover} image={user.avatarURL}>
        {resolveBadge(rank)}
      </CardMedia>
      <CardContent className={classes.content}>
        <Typography component="h6" variant="h6" color="textPrimary">
          {user.name}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Answered questions: {user.answerNumber}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Created questions: {user.questionNumber}
        </Typography>
      </CardContent>
      <CardContent className={classes.score}>
        <Card>
          <CardHeader className={classes.scoreHeader} title="Score"></CardHeader>
          <CardContent>{user.answerNumber + user.questionNumber}</CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

function mapStateToProps({ users }) {
  const sortedUsers = Object.keys(users)
    .map((id) => {
      const { name, avatarURL, answers, questions } = users[id];
      return {
        id,
        name,
        avatarURL,
        answerNumber: Object.keys(answers).length,
        questionNumber: questions.length,
      };
    })
    .sort((a, b) => b.answerNumber + b.questionNumber - (a.answerNumber + a.questionNumber));
  return {
    sortedUsers,
  };
}

export default connect(mapStateToProps)(LeaderBoard);
