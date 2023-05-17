import { useState, useRef } from 'react';
import Card from '../../UI/Card';
import Button from '../../UI/Button';
import classes from './AdminPanel.module.css';
const AddStudent = (props) => {
  const [enteredFirstName, setEnteredFirstName] = useState('');
  const [enteredLastName, setEnteredLastName] = useState('');
  const [enteredAbrevation, setEnteredAbrevation] = useState('');

  const inputFirstNameRef = useRef();
  const inputLastNameRef = useRef();
  const inputAbrevationRef = useRef();

  const firstNameHandler = (e) => {
    setEnteredFirstName(inputFirstNameRef.current.value);
  };
  const lastNameHandler = (e) => {
    setEnteredLastName(inputLastNameRef.current.value);
  };
  const abrevationHandler = (e) => {
    setEnteredAbrevation(inputAbrevationRef.current.value);
  };

  const addStudentHandler = (e) => {
    e.preventDefault();
    const firstName = inputFirstNameRef.current.value;
    const lastName = inputLastNameRef.current.value;
    const abrevation = inputAbrevationRef.current.value;
    console.log(firstName, lastName, abrevation);
  };

  return (
    <Card className={classes.height}>
      <form onSubmit={addStudentHandler}>
        <h1>Add new student</h1>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          ref={inputFirstNameRef}
          value={enteredFirstName}
          onChange={firstNameHandler}
          maxLength={10}></input>
        <input
          type="text"
          name="lastName"
          placeholder="Last name"
          ref={inputLastNameRef}
          value={enteredLastName}
          onChange={lastNameHandler}
          maxLength={20}></input>

        <input
          type="text"
          name="abrevation"
          placeholder="Enter code for class"
          value={enteredAbrevation}
          ref={inputAbrevationRef}
          onChange={abrevationHandler}></input>
        <Button type="submit">Add new student</Button>
      </form>
    </Card>
  );
};

export default AddStudent;
