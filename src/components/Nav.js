import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Avatar, Button } from '@material-ui/core';

const Nav = ({ user }) => {
  return (
    <nav className="nav">
      <div className="nav-container">
        <NavLink to="/" exact activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/add" activeClassName="active">
          New Question
        </NavLink>
        <NavLink to="/leaderboard" activeClassName="active">
          Leader Board
        </NavLink>
      </div>
      {user && (
        <div className="nav-signin">
          <span>Hello {user.name}</span>
          <Avatar alt={user.name} src={user.avatarURL} />
          <Button>Logout</Button>
        </div>
      )}
    </nav>
  );
};

function mapStateToProps({ authedUser, users }) {
  const user = users[authedUser];

  if (!user) return { authedUser };
  return { user };
}

export default connect(mapStateToProps)(Nav);
