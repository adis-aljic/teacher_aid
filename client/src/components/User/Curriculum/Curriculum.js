import React, { useRef, useState } from 'react';
import classes from "./Curriculum.module.css"
import Card from '../../UI/Card';
import Modal from '../../UI/Modal';
import ListCurriculum from './ListCurriculum';
const Curriculum = () => {
  const [inputText, setInputText] = useState('');
  const [objectData, setObjectData] = useState({});
  const [classCode, setClassCode] = useState("")
  const [addedCurriculum, setAddedCurriculum] = useState(false)
  const textAreaRef = useRef()
  const inputClassCodeRef = useRef()
  const user = JSON.parse(localStorage.getItem("user"))

  const textAreaHandler = () => {
    setInputText(textAreaRef.current.value);
  };
  const classCodeHandler = () =>{
    setClassCode(inputClassCodeRef.current.value)
  }

  // kad se vrati iz baze rezz
  //     const rows = inputText.split('\n');
  // const updatedObjectData = {};

  //  rows.forEach((row) => {
  //    const dotIndex = row.indexOf('.');
  //    if (dotIndex !== -1) {
  //      const propertyName = row.slice(0, dotIndex).trim();
  //      const propertyValue = row.slice(dotIndex + 1).trim();
  //      updatedObjectData[propertyName] = propertyValue;
  //    }
  //  });
  //  console.log(updatedObjectData);
  //  setObjectData(updatedObjectData);

  const addCurriculumHandler = e =>{
    e.preventDefault()
    console.log(typeof inputText);
    fetch("http://localhost:4000/api/curriculum/addcurriculum",{
        method:"POST",
        body: JSON.stringify({
            userId : user.id,
            classCode : classCode,
            curriculum : inputText
        }),
        mode:"cors",
        headers:{
            'Content-Type': 'application/json',
        }
    })
    .then(resolve => {
      if(resolve.ok){
        console.log("resolve");
        resolve.json()
        setAddedCurriculum(true)
        setTimeout(() => {
          setAddedCurriculum(false)
        }, 1500);
      }else{
        console.log("else");
        return
      }
    }) 
    .then((data) => {
      console.log("Data");
      console.log(data)
    }
     )
     setInputText("")
     setClassCode("")
     setAddedCurriculum(false)

  }

//   const handleSave = () => {
//     const rows = inputText.split('\n');
//     const updatedObjectData = {};

//     rows.forEach((row) => {
//       const dotIndex = row.indexOf('.');
//       if (dotIndex !== -1) {
//         const propertyName = row.slice(0, dotIndex).trim();
//         const propertyValue = row.slice(dotIndex + 1).trim();
//         updatedObjectData[propertyName] = propertyValue;
//       }
//     });
    // console.log(updatedObjectData);
    // setObjectData(updatedObjectData);
    // setInputText("")
//   };

  return (

    <div className={classes.curriculum}>
        <Card>
    <form onSubmit={addCurriculumHandler}>

      <textarea ref={textAreaRef} onChange={textAreaHandler} value={inputText} />
      <input ref={inputClassCodeRef} onChange={classCodeHandler} value={classCode} placeholder="Input classcode"></input>
      <button>Save</button>
      {addedCurriculum && <p>Curriculum is added</p>}
    </form>
        </Card>
        <Card>
    <ListCurriculum></ListCurriculum>
      {/* {Object.keys(objectData).length > 0 && (
          <ul className={classes.list}>
            <h1>{title}</h1>
          {Object.entries(objectData).map(([key, value]) => (
              <li key={key}>
              <strong>{key}.</strong> {value}
            </li>
          ))}
        </ul>
      )} */}
      </Card>
    </div>
  );
};

export default Curriculum;
