import { useState, useRef } from 'react';
import Card from '../../UI/Card';
import Button from '../../UI/Button';
import classes from './AdminPanel.module.css';
import Loader from '../../UI/Loader';
import Modal from '../../UI/Modal';

const AddClass = (props) => {
  const [enteredSchool, setEnteredSchool] = useState('');
  const [enteredClass, setEnteredClass] = useState('');
  const [enteredDepartmant, setEnteredDepartmant] = useState('');
  const [enteredAbrevation, setEnteredAbrevation] = useState('');
  const [enteredCity, setEnteredCity] = useState('');
  const [enteredAbbCity, setEnteredAbbCity] = useState('');
  const [inProgress, setInProgress] = useState(false)
  const [isError ,setIsError] = useState(null)
  const [enteredSubject, setEnteredSubject] = useState('');

  const inputSchoolRef = useRef();
  const inputClassRef = useRef();
  const inputDepartmantRef = useRef();
  const inputCityRef = useRef();
  const inputCityAbbRef = useRef();
  const inputAbbRef = useRef();
  const inputSubjectRef = useRef();

  const subjectHandler = (e) => {
    setEnteredSubject(inputSubjectRef.current.value);
  };

  const schoolHandler = (e) => {
    setEnteredSchool(inputSchoolRef.current.value);
  };
  const classHandler = (e) => {
    setEnteredClass(inputClassRef.current.value);
  };
  const departmantHandler = (e) => {
    setEnteredDepartmant(inputDepartmantRef.current.value);
  };
  const cityHandler = (e) => {
    setEnteredCity(inputCityRef.current.value);
  };
  const cityAbbHandler = (e) => {
    setEnteredAbbCity(inputCityAbbRef.current.value);
  };

  const changeAbbHandler = () => {
    setEnteredAbrevation(inputAbbRef.current.value);
  };

  const addClassHandler = (e) => {
    e.preventDefault();
    setInProgress(true)
    const school = inputSchoolRef.current.value;
    const city = inputCityRef.current.value;
    const cityAbb = inputCityAbbRef.current.value;
    const schoolClass = inputClassRef.current.value;
    const departmant = inputDepartmantRef.current.value;
    const abb = inputAbbRef.current.value;
    fetch('http://localhost:4000/api/classes/createclass', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        school: `${school.toUpperCase()}`,
        city: `${city.toUpperCase()}`,
        cityAbb: `${cityAbb.toUpperCase()}`,
        schoolClass: `${schoolClass.toUpperCase()}`,
        departmant: `${departmant}`,
        abbrevation: `${abb}`,
        subject : `${enteredSubject.toUpperCase()}`,

      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resolve) => resolve.json())
      .then((data) => {
        console.log(data);
        setIsError({
          title:"Class is added",
          message: `Class ${data.school}   ${data.schoolClass} - ${data.departmant} 
           is added. Class code : ${data.abbrevation} `
        })
        setEnteredSchool('');
        setEnteredCity('');
        setEnteredAbbCity('');
        setEnteredClass('');
        setEnteredDepartmant('');
        setEnteredAbrevation('');
        setEnteredSubject("")

      });
      setInProgress(false)
  };
  const errorHandler = () =>{
    setIsError(null)
  }
  return (
    

<Card className={classes.height}>
{isError && (
        <Modal
          title={isError.title}
          message={isError.message}
          onConfirm={errorHandler}
        />
      )}      <form onSubmit={addClassHandler}>
        <h1>Add new class</h1>
        <input
          type="text"
          name="school"
          placeholder="School"
          ref={inputSchoolRef}
          value={enteredSchool}
          onChange={schoolHandler}
          maxLength={22}></input>
        <input
          type="text"
          name="city"
          placeholder="City"
          ref={inputCityRef}
          value={enteredCity}
          onChange={cityHandler}
          maxLength={20}></input>
        <input
          type="text"
          name="city_abb"
          placeholder="City(2 Letters)"
          ref={inputCityAbbRef}
          value={enteredAbbCity}
          onChange={cityAbbHandler}
          maxLength={2}></input>

        <input
          type="text"
          name="class"
          placeholder="Class"
          ref={inputClassRef}
          value={enteredClass}
          onChange={classHandler}
          maxLength={1}></input>

        <input
          type="text"
          name="departmant"
          placeholder="Departmant"
          ref={inputDepartmantRef}
          value={enteredDepartmant}
          onChange={departmantHandler}
          maxLength={1}></input>
        <input
          type="text"
          name="abrevation"
          placeholder="Abrevation ex. ETS_2A"
          value={enteredAbrevation}
          onChange={changeAbbHandler}
          ref={inputAbbRef}></input>
              <input
          type="text"
          name="subject"
          placeholder="Enter subject"
          value={enteredSubject}
          ref={inputSubjectRef}
          onChange={subjectHandler}></input>
        <Button className={classes.buttonAddClass} type="submit">
          Add new class
        </Button>
      </form>
      {inProgress && <Loader />}

  </Card>

  

  );
};

export default AddClass;
