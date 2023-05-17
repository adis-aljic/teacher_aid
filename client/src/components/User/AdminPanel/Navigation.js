import { useContext } from 'react';
import AuthContex from '../../../store/Auth-ctx';
import classes from '../../User/AdminPanel/AdminPanel.module.css';

const Navigation = (props) => {
  const ctx = useContext(AuthContex);

  return (
    <ul className={classes.navigation}>
      <li onClick={ctx.addClassNavHandler}>Add Class</li>
      <li onClick={ctx.addStudentNavHandler}>Add student</li>
      <li onClick={ctx.RegisterClassNavHandler}>Register Class</li>
      <li onClick={ctx.UnregisterClassNavHandler}>Unregister Class</li>
      <li onClick={ctx.AddNewsNavHandler}>Add news</li>
    </ul>
  );
};

export default Navigation;
