import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  makeStyles,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Avatar,
  TextField,
  MenuItem,
  FormHelperText,
} from '@material-ui/core';
import Logo from '../assets/images/logo.svg';
import { connect } from 'react-redux';
import { setAuthedUser as setAuthedUserAction } from '../actions/authedUser';

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    textAlign: 'center',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  textField: {
    width: '100%',
    display: 'flex',
  },
  option: {
    display: 'flex',
  },
  avatar: {
    marginRight: '1rem',
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
    width: '100%',
  },
}));

const Signin = ({ users, dispatch, isLogedin, location }) => {
  const classes = useStyles();
  const [authedUser, setAuthedUser] = React.useState('');
  const [error, setError] = React.useState(false);

  const handleChange = (event) => {
    setAuthedUser(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (authedUser) {
      setError(false);
      dispatch(setAuthedUserAction(authedUser));
    } else {
      setError(true);
    }
  };

  if (isLogedin) {
    return <Redirect to={location.state.from} />;
  }
  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.header}
        title="Welcome to Woud You Rather!"
        subheader="Please signin to continue"
      />
      <CardMedia className={classes.media} image={Logo} title="Paella dish" />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <TextField
            className={classes.textField}
            select
            label="Select"
            value={authedUser}
            onChange={handleChange}
            helperText="Select a user"
          >
            {users.map((option) => (
              <MenuItem className={classes.option} key={option.id} value={option.id}>
                <Avatar className={classes.avatar} alt={option.name} src={option.avatarURL} />
                <Typography>{option.name}</Typography>
              </MenuItem>
            ))}
          </TextField>
          {error && <FormHelperText error>Please select a user</FormHelperText>}
          <Button type="submit" variant="contained" color="primary" className={classes.button}>
            Sign in
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

function mapStateToProps({ users, authedUser }) {
  const formattedUsers = Object.keys(users).map((id) => {
    const user = users[id];
    return {
      id,
      name: user.name,
      avatarURL: user.avatarURL,
    };
  });

  return {
    users: formattedUsers,
    isLogedin: authedUser ? true : false,
  };
}

export default connect(mapStateToProps)(Signin);
