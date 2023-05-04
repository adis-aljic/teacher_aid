import {  useContext } from 'react';
import Button from '../UI/Button';
import classes from './HeaderInformation.module.css';
import AuthContex from '../../store/Auth-ctx';

const HeaderInformation = (props) => {
  const ctx = useContext(AuthContex)
  return (
    <>
      <div className={classes.box}>
        <div className={classes.container}>
          <p>
            Welcome {props.user.firstName} {props.user.lastName}
          </p>
          <p>Subject : {props.user.subject}</p>
        </div>
        <div className={classes.navigation}>
          {props.user.role === 'teacher' && (
            <Button onClick={ctx.navigationHomeHandler}>Home</Button>
          )}
          {props.user.role === 'teacher' && (
            <Button onClick={ctx.navigationAddClassHandler}>Admin panel</Button>
          )}
          {props.user.role === 'teacher' && (
            <Button onClick={ctx.navigationCuricculumHandler}>Curicculum</Button>
          )}
          {props.user.role && <Button onClick={ctx.onLogout}>Logout</Button>}
        </div>
      </div>
    </>
  );
};

export default HeaderInformation;
