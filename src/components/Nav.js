import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles, Avatar, Button, AppBar, Toolbar, Typography, Link } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { setAuthedUser } from '../actions/authedUser';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  navContainer: {
    display: 'flex',
    flex: 1,
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  navSignin: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(0, 1, 0, 1),
  },
}));

const Nav = ({ user, dispatch }) => {
  const classes = useStyles();

  const handleLogout = () => {
    dispatch(setAuthedUser(null));
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <div className={classes.navContainer}>
          <Link color="inherit" component={NavLink} to="/" exact activeClassName="MuiLink-underlineAlways">
            Home
          </Link>
          <Link color="inherit" component={NavLink} to="/add" activeClassName="MuiLink-underlineAlways">
            New Question
          </Link>
          <Link color="inherit" component={NavLink} to="/leaderboard" activeClassName="MuiLink-underlineAlways">
            Leader Board
          </Link>
        </div>
        {user && (
          <div className={classes.navSignin}>
            <Typography>Hello {user.name}</Typography>
            <Avatar className={classes.avatar} alt={user.name} src={user.avatarURL} />
            <Button variant="outlined" color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

function mapStateToProps({ authedUser, users }) {
  const user = users[authedUser];

  if (!user) return { authedUser };
  return { user };
}

export default connect(mapStateToProps)(Nav);
