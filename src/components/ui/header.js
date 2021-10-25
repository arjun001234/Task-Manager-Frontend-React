import React from "react";
import { Link } from 'react-router-dom';
import {useLocation} from 'react-router-dom'

const Header = () => {

  const {pathname} = useLocation();

  return (
    <header className="home-header slideDownInAnim">
        <p className="header-text">Task Manager App</p>
        <div>
        <Link to='/home' className={`${pathname.includes('home') && 'active-page'}`} >Home</Link>
        <Link to='/profile' className={`${pathname.includes('profile') && 'active-page'}`}>Profile</Link>
        </div>
      </header>
  );
};

export default Header;
