import React from 'react';

import {
  makeStyles,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
  Button,
  Input,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { connect } from 'react-redux';
import { handleSaveQuestion } from '../actions/shared';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '1rem',
  },
  header: {
    width: '100%',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  },
  content: {
    flex: '1 1 0',
  },
  cover: {
    width: 151,
  },
  formControl: {
    padding: theme.spacing(3),
    display: 'flex',
  },
  input: {
    width: '100%',
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}));

const NewQuestion = (props) => {
  const classes = useStyles();
  const [form, setForm] = React.useState({ optionOneText: '', optionTwoText: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
    props.dispatch(
      handleSaveQuestion({
        optionOneText: form.optionOneText,
        optionTwoText: form.optionTwoText,
        author: props.authedUser,
      })
    );

    props.history.push('/');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card className={classes.root}>
      <CardHeader className={classes.header} title="Create a new question" variant="h2" />
      <CardContent className={classes.content}>
        <Typography component="h6" variant="h6" color="textPrimary">
          Would you rather ...
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <FormControl className={classes.formControl}>
            <Input
              className={classes.input}
              placeholder="Option one text here"
              value={form.optionOneText}
              name="optionOneText"
              onChange={handleChange}
            />
          </FormControl>
          <Typography component="p" variant="subtitle1" color="textPrimary" align="center">
            Or
          </Typography>
          <FormControl className={classes.formControl}>
            <Input
              className={classes.input}
              placeholder="Option two text here"
              value={form.optionTwoText}
              name="optionTwoText"
              onChange={handleChange}
            />
          </FormControl>
          <Button type="submit" variant="outlined" color="primary" className={classes.button}>
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(NewQuestion);
