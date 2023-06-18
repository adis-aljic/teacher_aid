import { useContext } from 'react';
import AuthContex from '../../../store/Auth-ctx';
import classes from '../../User/AdminPanel/AdminPanel.module.css';
import "./Navigation.css"

const Navigation = (props) => {
  const ctx = useContext(AuthContex);

  return (
    <nav>
    <div class="navbar1">
      <div class="container1 nav-container1">
          <input class="checkbox" type="checkbox" name="" id="" />
          <div class="hamburger-lines1">
            <span class="line1 line11"></span>
            <span class="line1 line22"></span>
            <span class="line1 line33"></span>
          </div>  
      
        <div class="menu-items1">
    <ul className={classes.navigation}>
      <li onClick={ctx.addClassNavHandler}>Add Class</li>
      <li onClick={ctx.addStudentNavHandler}>Add student</li>
      <li onClick={ctx.RegisterClassNavHandler}>Register Class</li>
      <li onClick={ctx.UnregisterClassNavHandler}>Unregister Class</li>
      <li onClick={ctx.AddNewsNavHandler}>Add news</li>
    </ul>
    </div>
    </div>
    </div>
    </nav>
  );
};

export default Navigation;
