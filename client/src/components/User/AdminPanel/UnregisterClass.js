import { useRef, useState } from 'react';
import Button from '../../UI/Button';
import Card from '../../UI/Card';

const RegistrerClass = () => {
  const [searchSchool, setSearchSchool] = useState('');
  const [filteredSchool, setFilteredSchool] = useState([]);
  let classesList = JSON.parse(localStorage.getItem('classList'));
  const [enteredClassCode, setEneteredClassCode] = useState('');
  const classCodeRef = useRef();
  const [text, setText] = useState('');

  const classCodeHandler = () => {
    setEneteredClassCode(classCodeRef.current.value);
  };


  const unregisterClassHandler = (e) => {
    e.preventDefault();
    if (!enteredClassCode) {
      setText('Please enter school class code.');
      return;
    }
    const result = classesList.find(
      (classItem) => classItem.abbrevation === enteredClassCode
    );
    console.log('result');
    const user = JSON.parse(localStorage.getItem('user'));
    fetch('http://localhost:4000/api/classes/unregisterclass', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        userId: `${user.id}`,
        classId: `${result.id}`,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resolve) => resolve.json())
      .then((data) => {
        console.log(data);
      });
  };

  const searchSchoolHandler = (e) => {
    e.preventDefault();
    setSearchSchool(e.target.value);
    if (searchSchool.length === 0) {
      setText('');
    }

    const found = classesList.filter((schoolClass) =>
      schoolClass.school.includes(searchSchool)
    );
    setFilteredSchool(found);

    if (found.length === 0) {
      setText('School not found. Try again !!!');
    }
    if (searchSchool.length < 2 && filteredSchool.length === 0) {
      setText('');
      setFilteredSchool([]);
    }
  };
  return (
    <Card>
      <h1>Unregistred class</h1>
      <input
        type="search"
        value={searchSchool}
        onChange={searchSchoolHandler}
        placeholder="Search ..."></input>
      {filteredSchool.length > 0 ? (
        filteredSchool.map((x) => (
          <>
            <p key={x.id}>
              {x.school}
              {x.class}
              {x.abbrevation}
            </p>
          </>
        ))
      ) : (
        <p>{text} </p>
      )}
     
      <form onSubmit={unregisterClassHandler}>
        <input
          type="text"
          name="classCode"
          placeholder="Class Code"
          ref={classCodeRef}
          value={enteredClassCode}
          onChange={classCodeHandler}></input>
        <Button type="submit">Unregister Class</Button>
      </form>
    </Card>
  );
};
export default RegistrerClass;
