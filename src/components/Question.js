import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { formatQuestion } from '../utils/helpers';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginBottom: '1rem',
  },
  content: {
    flex: '1 1 0',
  },
  cover: {
    width: 151,
  },
}));

const Question = ({ question }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.cover} image={question.authorAvatar} />
      <CardContent className={classes.content}>
        <Typography component="h6" variant="h6" color="textPrimary">
          Would you rather
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {question.optionOne.text} or {question.optionTwo.text}
        </Typography>
        <Button variant="contained" color="primary" component={Link} to={`/questions/${question.id}`}>
          View Poll
        </Button>
      </CardContent>
    </Card>
  );
};

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  const author = users[question.author];

  return {
    authedUser,
    question: formatQuestion(question, author),
  };
}

export default connect(mapStateToProps)(Question);
