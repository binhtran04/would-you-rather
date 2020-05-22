import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
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
    </nav>
  );
};

export default Nav;
