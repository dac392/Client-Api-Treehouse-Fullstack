import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context';

const Header = ()=>{
  const { authUser } = useContext(Context);
  // const authUser = false;
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo"><Link to='/'>Courses</Link></h1>
        <nav>
          {
            authUser
            ? <ul className='header--signedin'>
                <li>Welcome, {authUser.firstName} {authUser.lastName}</li>
                <li><Link className="signin" to="/logout">Log Out</Link></li>
              </ul>
            : <ul className='header--signedin'>
                <li><Link className="signup" to="/signup">Sign Up</Link></li>
                <li><Link className="signin" to="/login">Log In</Link></li>
              </ul>
          }
        </nav>
      </div>
    </header>
  );
}

export default Header;
