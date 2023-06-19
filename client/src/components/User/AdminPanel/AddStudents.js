import { useState, useRef } from 'react';
import Card from '../../UI/Card';
import Button from '../../UI/Button';
import Loader from '../../UI/Loader';
import Modal from '../../UI/Modal';
import styles from "./AddStudents.module.css"
const AddStudent = (props) => {
  const [enteredFirstName, setEnteredFirstName] = useState('');
  const [enteredLastName, setEnteredLastName] = useState('');
  const [enteredAbrevation, setEnteredAbrevation] = useState('');
  const [enteredAbrevation1, setEnteredAbrevation1] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [message, setEnteredMessage] = useState("");
  const [enteredExistEmail , setEnteredExistEmail] = useState("")
  const [inProgress, setInProgress] = useState(false)
  const [isError, setIsError] = useState(null)

  const inputFirstNameRef = useRef();
  const existEmailRef = useRef();
  const inputLastNameRef = useRef();
  const inputAbrevationRef = useRef();
  const inputAbrevationRef1 = useRef();
  const inputEmailRef = useRef();
  const classes = JSON.parse(localStorage.getItem("MyClasses"))

  const firstNameHandler = (e) => {
    setEnteredFirstName(inputFirstNameRef.current.value);
  };
  const lastNameHandler = (e) => {
    setEnteredLastName(inputLastNameRef.current.value);
  };
  const abrevationHandler = (e) => {
    setEnteredAbrevation(inputAbrevationRef.current.value);
  };
  const abrevationHandler1 = (e) => {
    setEnteredAbrevation1(inputAbrevationRef1.current.value);
  };
  const emailHandler = (e) => {
    setEnteredEmail(inputEmailRef.current.value);
  };
  const existEmailHandler = (e) => {
    setEnteredExistEmail(existEmailRef.current.value);
  };
  const existingStudentHandler = e=>{
    e.preventDefault()
    if(!enteredExistEmail || !enteredAbrevation1){
      setEnteredMessage("All fields must be inputed!")
        setTimeout(() => {
          setEnteredMessage("")
        }, 1000);
      return
    }
    const myClass = classes.filter(classes => classes.abbrevation === enteredAbrevation1)
    console.log(myClass);
    if(myClass.length === 0) {
      setEnteredExistEmail("")
        setEnteredAbrevation1("")
        setIsError({
          title: "Class is not found",
          message : "Please check if you are entered right class code"
        })

        return
      }
    // fetch("http://localhost:4000/api/user/findAndAddStudent",{
      fetch("https://teacher-aid.onrender.com/api/user/findAndAddStudent", {

      method : "POST",
      mode : "cors",
      body : JSON.stringify({
        email : enteredExistEmail,
        classId : myClass[0].id
      }),
      headers : {"Content-Type" : "application/json"}
    })
    .then(resolve => resolve.json())
    .then(data => {
      if(data.statusCode > 299){
        setInProgress(false)
      return  setIsError({title: "Error",
      message: `${data.message}`})
      }
      setIsError({title: "User is added",
      message: `Student ${data.firstName} ${data.lastName} is added to class ${enteredAbrevation}`})
    })
    setEnteredExistEmail("")
    setEnteredAbrevation1("")
  }

  const addStudentHandler = (e) => {
    e.preventDefault();
    setInProgress(true)
    if(!enteredFirstName || !enteredLastName || !enteredEmail) {
      setInProgress(false)
      setEnteredFirstName("")
        setEnteredLastName("")
        setEnteredAbrevation("")
        setEnteredEmail("")
        setEnteredMessage("All fields must be inputed!")
        setTimeout(() => {
          setEnteredMessage("")
        }, 1000);
      return 
    }
    const myClass = classes.filter(classes => classes.abbrevation === enteredAbrevation.toUpperCase())
    console.log(myClass);
    if(myClass.length === 0) {
      setInProgress(false)
      setEnteredFirstName("")
        setEnteredLastName("")
        setEnteredAbrevation("")
        setEnteredEmail("")
        setIsError({
          title: "Class is not found",
          message : "Please check if you are entered right class code"
        })
      return
    }
    // fetch('http://localhost:4000/api/user/newstudent', {
      fetch("https://teacher-aid.onrender.com/api/user/newstudent", {

      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        email: `${enteredEmail}`,
        password : "Adis123%",
        // password: `${enteredEmail.slice(0,enteredEmail.indexOf("@"))}_${Math.trunc(Math.random()*10000+1000)}`,
        firstName: `${enteredFirstName}`,
        lastName: `${enteredLastName}`,
        role : "student",
        classId : myClass[0].id
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resolve) => resolve.json())
      .then((data) => {

        setEnteredFirstName("")
        setEnteredLastName("")
        setEnteredAbrevation("")
        setEnteredEmail("")
     
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
    <Card className={styles.addStudents}>
              {isError && (
        <Modal
          title={isError.title}
          message={isError.message}
          onConfirm={errorHandler}
        />
      )}
{message ? message : ""}
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
    
        <Button type="submit">Add new student</Button>
      </form>
      <br></br>
       <p>-- or --</p>
      <br></br>
       <h2> Add existing student by email </h2>
       <form onSubmit={existingStudentHandler}>
        <input
        ref={existEmailRef}
        value={enteredExistEmail}
        onChange={existEmailHandler}
        placeholder='Email'
        ></input>
        <input
        ref={inputAbrevationRef1}
        value={enteredAbrevation1}
        onChange={abrevationHandler1}
        placeholder='Class Code'
        ></input>
        <Button type="submit">Add student</Button>
       </form>
      {inProgress && <Loader />}
    </Card>

  );
};

export default AddStudent;
