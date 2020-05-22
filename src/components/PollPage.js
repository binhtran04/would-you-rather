import React from 'react';
import { connect } from 'react-redux';
import { formatQuestion } from '../utils/helpers';
import { handleSaveQuestionAnswer } from '../actions/shared';
import {
  makeStyles,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  FormControl,
  FormHelperText,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '1rem',
  },
  header: {
    width: '100%',
  },
  content: {
    flex: '1 1 0',
  },
  cover: {
    width: 151,
  },
  formControl: {
    margin: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}));

const PollPage = (props) => {
  const { question } = props;

  return question.authedUserAnswer ? <PollResult {...props} /> : <PollAnswerQuestion {...props} />;
};

const PollAnswerQuestion = ({ question, ...props }) => {
  const classes = useStyles();
  const [answer, setAnswer] = React.useState(null);
  const [error, setError] = React.useState(false);

  const handleRadioChange = (event) => {
    setAnswer(event.target.value);
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (answer === null) {
      setError(true);
    } else {
      setError(false);
      props.dispatch(handleSaveQuestionAnswer({ qid: question.id, answer }));
    }
  };

  return (
    <Card className={classes.root}>
      <CardHeader className={classes.header} title={`${question.authorName} asks:`} />
      <CardMedia className={classes.cover} image={question.authorAvatar} />
      <CardContent className={classes.content}>
        <Typography component="h5" variant="h5" color="textPrimary">
          Would you rather ...
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl component="fieldset" className={classes.formControl} error={error}>
            <RadioGroup aria-label="quiz" name="quiz" value={answer} onChange={handleRadioChange}>
              <FormControlLabel value="optionOne" control={<Radio />} label={question.optionOne.text} />
              <FormControlLabel value="optionTwo" control={<Radio />} label={question.optionTwo.text} />
            </RadioGroup>
            {error && <FormHelperText>Please select one option</FormHelperText>}
            <Button type="submit" variant="outlined" color="primary" className={classes.button}>
              Submit
            </Button>
          </FormControl>
        </form>
      </CardContent>
    </Card>
  );
};

const PollResult = ({ question }) => {
  const classes = useStyles();

  const { totalVoteCount, voteOneCount, voteTwoCount } = React.useMemo(() => {
    const voteOneCount = question.optionOne.votes.length;
    const voteTwoCount = question.optionTwo.votes.length;
    const totalVoteCount = voteOneCount + voteTwoCount;

    return { totalVoteCount, voteOneCount, voteTwoCount };
  }, [question.optionOne.votes.length, question.optionTwo.votes.length]);

  return (
    <Card className={classes.root}>
      <CardHeader className={classes.header} title={`Asked by ${question.authorName}`} />
      <CardMedia className={classes.cover} image={question.authorAvatar} />
      <CardContent className={classes.content}>
        <Typography component="h5" variant="h5" color="textPrimary">
          Result:
        </Typography>

        <Card className={classes.root}>
          <CardContent>
            <Typography component="p" variant="body1" color="textPrimary">
              Would you rather {question.optionOne.text} {question.authedUserAnswer === 'optionOne' && <CheckIcon />}
            </Typography>
            <Typography component="p" variant="body1" color="textPrimary">
              {`${(voteOneCount / totalVoteCount) * 100} %`}
            </Typography>
            <Typography component="p" variant="body1" color="textPrimary">
              {voteOneCount} out of {totalVoteCount} votes
            </Typography>
          </CardContent>
        </Card>
        <Card className={classes.root}>
          <CardContent>
            <Typography component="p" variant="body1" color="textPrimary">
              Would you rather {question.optionTwo.text} {question.authedUserAnswer === 'optionTwo' && <CheckIcon />}
            </Typography>
            <Typography component="p" variant="body1" color="textPrimary">
              {`${(voteTwoCount / totalVoteCount) * 100} %`}
            </Typography>
            <Typography component="p" variant="body1" color="textPrimary">
              {voteTwoCount} out of {totalVoteCount} votes
            </Typography>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

function mapStateToProps({ authedUser, users, questions }, props) {
  const { id } = props.match.params;
  const question = questions[id];
  const author = users[question.author];

  return {
    authedUser,
    question: formatQuestion(question, author, authedUser),
  };
}

export default connect(mapStateToProps)(PollPage);
