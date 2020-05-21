import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="nav">
      <div className="nav-container">
        <NavLink to="/" exact activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/new" activeClassName="active">
          New Question
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
