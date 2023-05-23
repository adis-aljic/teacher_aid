import { useRef, useState, useEffect } from 'react';
import Button from '../../UI/Button';
import Card from '../../UI/Card';

const RegistrerClass = () => {
  const [searchSchool, setSearchSchool] = useState('');
  const [filteredSchool, setFilteredSchool] = useState([]);
  const [enteredClassCode, setEneteredClassCode] = useState('');
  const classCodeRef = useRef();
  const [text, setText] = useState('');
  const [myClasses, setMyClasses] = useState(JSON.parse(localStorage.getItem("classList")))
  useEffect(()=>{
    fetch("http://localhost:4000/api/classes/list")
    .then(resolve => resolve.json())
    .then(data => {
      console.log(data);
      setMyClasses(data)
      localStorage.setItem("classList", JSON.stringify(data))

    }
    
    )
  },[])
  // const myClasses = localStorage.getItem("classList")
  const classCodeHandler = () => {
    setEneteredClassCode(classCodeRef.current.value);
  };

  const onSubmitRegistrerClassHandler = (e) => {
    e.preventDefault();
    console.log(enteredClassCode);
    if (!enteredClassCode) {
      setText('Please enter school class code.');
      return;
    }
    console.log('submitano');
    console.log(myClasses);
    const result = myClasses.find(
      (classItem) => classItem.abbrevation === enteredClassCode
    );
    console.log(result);
    if(!result) {
      return console.log("nema id");
    }
    const user = JSON.parse(localStorage.getItem('user'));
    fetch('http://localhost:4000/api/classes/addclass', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        id: `${result.id}`,
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
    e.preventDefault();
    setSearchSchool(e.target.value);
    if (searchSchool.length === 0) {
      setText('');
    }

    const found = myClasses.filter((schoolClass) =>
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
      <h1>Registred class</h1>
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
      <form onSubmit={onSubmitRegistrerClassHandler}>
        <input
          type="text"
          name="classCode"
          placeholder="Class Code"
          ref={classCodeRef}
          value={enteredClassCode}
          onChange={classCodeHandler}></input>
        <Button type="submit">Register Class</Button>
      </form>
  
    </Card>
  );
};
export default RegistrerClass;
