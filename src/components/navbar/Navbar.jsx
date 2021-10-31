import React from 'react';
import {NavLink} from 'react-router-dom';

const Navbar = () => {
  return (
    <ul className="nav">
      <li className="nav-item">
        <NavLink className="nav-link active" aria-current="page" to="/">
          Mint
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/transfer">
          Transfer
        </NavLink>
      </li>
    </ul>
  );
};

export default Navbar;
