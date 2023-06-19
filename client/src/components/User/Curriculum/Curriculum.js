import React, { useRef, useState } from 'react';
import classes from "./Curriculum.module.css"
import Card from '../../UI/Card';
import ListCurriculum from './ListCurriculum';
const Curriculum = () => {
  const [inputText, setInputText] = useState('');
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

  const addCurriculumHandler = e =>{
    e.preventDefault()
    console.log(typeof inputText);
    // fetch("http://localhost:4000/api/curriculum/addcurriculum",{
      fetch("https://teacher-aid.onrender.com/api/curriculum/addcurriculum", {

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


  return (

    <div className={classes.curriculum}>
        <Card className={classes.formCurriculum}>
          
          <h2>Add curriculum</h2>
          <br></br>
    <form onSubmit={addCurriculumHandler}>

      <textarea ref={textAreaRef} onChange={textAreaHandler} value={inputText} />
      <input ref={inputClassCodeRef} onChange={classCodeHandler} value={classCode} placeholder="Input classcode"></input>
      <button>Save</button>
      {addedCurriculum && <p>Curriculum is added</p>}
    </form>
        </Card>
        <Card>
    <ListCurriculum></ListCurriculum>

      </Card>
    </div>
  );
};

export default Curriculum;
