import { useState, useRef } from 'react';
import Card from '../../UI/Card';
import Button from '../../UI/Button';
import Loader from '../../UI/Loader';
import Modal from '../../UI/Modal';
const AddStudent = (props) => {
  const [enteredFirstName, setEnteredFirstName] = useState('');
  const [enteredLastName, setEnteredLastName] = useState('');
  const [enteredAbrevation, setEnteredAbrevation] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredSubject, setEnteredSubject] = useState('');
  const [message, setEnteredMessage] = useState("");
  // const [isValid , setIsValid] = useState(false)
  const [inProgress, setInProgress] = useState(false)
  const [isError, setIsError] = useState(null)

  const inputFirstNameRef = useRef();
  const inputLastNameRef = useRef();
  const inputAbrevationRef = useRef();
  const inputEmailRef = useRef();
  const inputSubjectRef = useRef();
  const classes = JSON.parse(localStorage.getItem("MyClasses"))

console.log(classes);
  const firstNameHandler = (e) => {
    setEnteredFirstName(inputFirstNameRef.current.value);
  };
  const lastNameHandler = (e) => {
    setEnteredLastName(inputLastNameRef.current.value);
  };
  const abrevationHandler = (e) => {
    setEnteredAbrevation(inputAbrevationRef.current.value);
  };
  const emailHandler = (e) => {
    setEnteredEmail(inputEmailRef.current.value);
  };
  const subjectHandler = (e) => {
    setEnteredSubject(inputSubjectRef.current.value);
  };

  const addStudentHandler = (e) => {
    e.preventDefault();
    setInProgress(true)
    if(!enteredFirstName || !enteredLastName || !enteredSubject || !enteredEmail) {
      setInProgress(false)
      setEnteredFirstName("")
        setEnteredLastName("")
        setEnteredSubject("")
        setEnteredAbrevation("")
        setEnteredEmail("")
        setEnteredMessage("All fields must be inputed!")
        setTimeout(() => {
          setEnteredMessage("")
        }, 1000);
      return 
    }
    const myClass = classes.filter(classes => classes.abbrevation === enteredAbrevation)
    console.log(myClass);
    if(myClass.length === 0) {
      setInProgress(false)
      setEnteredFirstName("")
        setEnteredLastName("")
        setEnteredSubject("")
        setEnteredAbrevation("")
        setEnteredEmail("")
        setIsError({
          title: "Class is not found",
          message : "Please check if you are entered right class code"
        })
      return
      //  setEnteredMessage("Class is not found")
    }
    fetch('http://localhost:4000/api/user/newstudent', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        email: `${enteredEmail}`,
        password: `${enteredEmail.slice(0,enteredEmail.indexOf("@"))}_${Math.trunc(Math.random()*10000+1000)}`,
        firstName: `${enteredFirstName}`,
        lastName: `${enteredLastName}`,
        subject : `${enteredSubject}`,
        role : "student",
        classId : myClass[0].id
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resolve) => resolve.json())
      .then((data) => {

        console.log(data);
        setEnteredFirstName("")
        setEnteredLastName("")
        setEnteredSubject("")
        setEnteredAbrevation("")
        setEnteredEmail("")
        console.log(data);
        // setEnteredMessage(data.message)
        // setIsValid(true)
        // setTimeout(() => {
        //   setIsValid(false)
        //   setEnteredMessage("")
        // }, (1000));
        console.log(Response);

        if(data.statusCode > 299){
          setInProgress(false)
        return  setIsError({title: "Error",
        message: `${data.message}`})
        }
        setIsError({title: "User is added",
        message: `Student ${data.firstName} ${data.lastName} is added to class ${enteredAbrevation}`})
      });
      setInProgress(false)

  };
  const errorHandler = () => setIsError(false)
  return (
    <Card >
              {isError && (
        <Modal
          title={isError.title}
          message={isError.message}
          onConfirm={errorHandler}
        />
      )}
      {/* {isValid ?  message || <p>Student is added.</p> : <p>{message}</p>} */}
{message ? {message} : ""}
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
          type="email"
          name="email"
          placeholder="Enter email"
          value={enteredEmail}
          ref={inputEmailRef}
          onChange={emailHandler}></input>
        <input
          type="text"
          name="abrevation"
          placeholder="Enter code for class"
          value={enteredAbrevation}
          ref={inputAbrevationRef}
          onChange={abrevationHandler}></input>
        <input
          type="text"
          name="subject"
          placeholder="Enter subject"
          value={enteredSubject}
          ref={inputSubjectRef}
          onChange={subjectHandler}></input>
        <Button type="submit">Add new student</Button>
      </form>
      {inProgress && <Loader />}
    </Card>

  );
};

export default AddStudent;
