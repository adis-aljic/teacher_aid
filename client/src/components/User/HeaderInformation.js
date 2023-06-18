

import {  useContext } from 'react';
import Button from '../UI/Button';
import { Link } from 'react-router-dom';
import classes from './HeaderInformation.module.css';
import "./Hamburger.css"
import AuthContex from '../../store/Auth-ctx';

const HeaderInformation = (props) => {
  const ctx = useContext(AuthContex)
  return (
    <>
       <nav>
      <div className="navbar">
        <div className="container nav-container">
            <input className="checkbox" type="checkbox" name="" id="" />
            <div className="hamburger-lines">
              <span className="line line1"></span>
              <span className="line line2"></span>
              <span className="line line3"></span>
            </div>  
        
          <div className="menu-items">
          <div className={classes.box}>
<div className={classes.container}>
  
<div className={classes.navigation}>
  {props.user.role === "student" && (
    <Link to="/student">
      <Button onClick={ctx.navigationStudentHandler}>Home</Button>
    </Link>
  )}
  {props.user.role === "student" && (
    <Link to="/message">
      <Button onClick={ctx.navigationMessageHandler}>Send Message</Button>
    </Link>
  )}
  {props.user.role === 'teacher' && (
    <Link to="/home">

    <Button onClick={ctx.navigationHomeHandler}>Home</Button>
    </Link>

  )}
  {props.user.role === 'teacher' && (
    <Link to="/admin">
    <Button onClick={ctx.navigationAddClassHandler}>Admin panel</Button>
    </Link>
  )}
  {props.user.role === 'teacher' && (
                <Link to="/curriculum">

    <Button onClick={ctx.navigationCuricculumHandler}>Curicculum</Button>
    </Link>

)}
  {props.user.role && 
                          <Link to="/login">

  <Button onClick={ctx.onLogout}>Logout</Button>
  </Link>
  }

</div>
</div>
</div>


          </div>
        </div>
      </div>
    </nav>
    </>
  );
};





export default HeaderInformation;
