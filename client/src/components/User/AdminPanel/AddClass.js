import { useState, useRef } from 'react';
import Card from '../../UI/Card';
import Button from '../../UI/Button';
import classes from './AdminPanel.module.css';

const AddClass = (props) => {
  const [enteredSchool, setEnteredSchool] = useState('');
  const [enteredClass, setEnteredClass] = useState('');
  const [enteredDepartmant, setEnteredDepartmant] = useState('');
  const [enteredAbrevation, setEnteredAbrevation] = useState('');
  const [enteredCity, setEnteredCity] = useState('');
  const [enteredAbbCity, setEnteredAbbCity] = useState('');

  const inputSchoolRef = useRef();
  const inputClassRef = useRef();
  const inputDepartmantRef = useRef();
  const inputCityRef = useRef();
  const inputCityAbbRef = useRef();
  const inputAbbRef = useRef();

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
        school: `${school}`,
        city: `${city}`,
        cityAbb: `${cityAbb}`,
        schoolClass: `${schoolClass}`,
        departmant: `${departmant}`,
        abbrevation: `${abb}`,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resolve) => resolve.json())
      .then((data) => {
        console.log(data);
        setEnteredSchool('');
        setEnteredCity('');
        setEnteredAbbCity('');
        setEnteredClass('');
        setEnteredDepartmant('');
        setEnteredAbrevation('');
      });
  };

  return (
    <Card className={classes.height}>
      <form onSubmit={addClassHandler}>
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
        <Button className={classes.buttonAddClass} type="submit">
          Add new class
        </Button>
      </form>
    </Card>
  );
};

export default AddClass;
