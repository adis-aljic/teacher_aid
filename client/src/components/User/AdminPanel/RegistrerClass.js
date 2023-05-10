import { useRef, useState } from 'react';
import Button from '../../UI/Button';
import Card from '../../UI/Card';

const RegistrerClass = () => {
  const [searchSchool, setSearchSchool] = useState('');
  const [filteredSchool, setFilteredSchool] = useState([]);
  let classesList = JSON.parse(localStorage.getItem('classList'));
  const [enteredClassCode, setEneteredClassCode] = useState('');
  const classCodeRef = useRef();

  const classCodeHandler = () => {
    setEneteredClassCode(classCodeRef.current.value);
  };

  const onSubmitRegistrerClassHandler = (e) => {
    e.preventDefault();
    console.log('submitano');
    const result = classesList.find(
      (classItem) => classItem.abbrevation === enteredClassCode
    );
    console.log(result);
    const user = JSON.parse(localStorage.getItem('user'));
    fetch('http://localhost:4000/api/user/addclass', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        id: `${result.id}`,
        school: `${result.school}`,
        city: `${result.city}`,
        cityAbb: `${result.cityAbb}`,
        schoolClass: `${result.schoolClass}`,
        departmant: `${result.departmant}`,
        abbrevation: `${result.abbrevation}`,
      }),
      headers: {
        'Content-Type': 'application/json',
        auth: `${user.token}`,
      },
    })
      .then((resolve) => resolve.json())
      .then((data) => {
        console.log(data);
      });
  };

  const searchSchoolHandler = (e) => {
    setSearchSchool(e.target.value);
    console.log(searchSchool);
    const found = classesList.filter((schoolClass) =>
      schoolClass.school.includes(searchSchool)
    );
    console.log(found);
    setFilteredSchool(found);
  };
  return (
    <Card>
      <h1>Find and registred class</h1>
      <input
        type="search"
        value={searchSchool}
        onChange={searchSchoolHandler}
        placeholder="Search ..."></input>
      {filteredSchool.length > 0
        ? filteredSchool.map((x) => (
            <>
              <p>{x.school}</p>
              <p>{x.class}</p>
              <p>{x.abbrevation}</p>
            </>
          ))
        : 'School not found !'}
      <form onSubmit={onSubmitRegistrerClassHandler}>
        <input
          type="text"
          name="classCode"
          placeholder="Class Code"
          ref={classCodeRef}
          value={enteredClassCode}
          onChange={classCodeHandler}></input>
      </form>

      <Button type="submit">Register Class</Button>
    </Card>
  );
};

export default RegistrerClass;
