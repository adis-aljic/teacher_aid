

import {  useContext } from 'react';
import Button from '../UI/Button';
import classes from './HeaderInformation.module.css';
import AuthContex from '../../store/Auth-ctx';
import { Link } from 'react-router-dom';

const HeaderInformation = (props) => {
  const ctx = useContext(AuthContex)
  return (
    <>
      <div className={classes.box}>
        <div className={classes.container}>
          <p>
            Welcome {props.user.firstName} {props.user.lastName}
          </p>
        </div>
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
    </>
  );
};

export default HeaderInformation;
