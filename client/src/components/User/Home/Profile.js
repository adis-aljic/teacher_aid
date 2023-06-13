import { useEffect, useRef, useState } from "react";
import Card from "../../UI/Card";
import classes from "./ListNews.module.css";
import React from "react";
// import { Accordion, AccordionItem } from "react-light-accordion";
import "./Profile.css";
import {Accordion, AccordionBody, AccordionHeader, AccordionItem} from "react-headless-accordion";
import Modal from "../../UI/Modal"


const Profile = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user);
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const [students, setStudents] = useState([]);
  const [isAddClicked, setIsAddCliked] = useState(false)
  const [studentName , setStudentName] = useState({})
  const [enteredGrade , setEnteredGrade] = useState(null)
  const [enteredDeleteGrade , setEnteredDeleteGrade] = useState(null)
  const [enteredNote, setEnteredNote ] = useState("")
const [message , setMessage] = useState("")
const [enteredNoteNbr , setEnteredNoteNbr] = useState(null)

  const enteredGradeRef = useRef()
  const enteredDeleteGradeRef = useRef()
  const enteredNoteRef = useRef()
  const enteredNoteNbrRef = useRef()

  const enteredGradeHandler = e => setEnteredGrade(e.target.value)
  const enteredDeleteGradeHandler = e => setEnteredDeleteGrade(e.target.value)
  const enteredNoteHandler = e => setEnteredNote(e.target.value)
  const enteredNoteNbrHandler = e => setEnteredNoteNbr(e.target.value)
  useEffect(() => {
    fetch("http://localhost:4000/api/user/getstudents", {
      mode: "cors",
      method: "GET",
    })
      .then((resolve) => resolve.json())
      .then((results) => {
        console.log("students");
        console.log(results);
        setStudents(results);
      });


    fetch("http://localhost:4000/api/user", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        id: `${user.id}`
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resolve) => resolve.json())
      .then((data) => {
        setProfile(data[0]);
        console.log(data);
        localStorage.setItem("profile", JSON.stringify(data[0]));
      });
    // napraviti fetch koji ide u korisnike i vraca sve korisnike sa svim razredima i onda u svaki razre
    // proci koji ima dole i ispisati koji su korisnici tu
    // napravit klikable na korisnika koji ce otoriti prozor(ili spustit) gdje ce biti opcije da se upise note ili ocjena
  }, [user.id]);
  console.log(students);
  console.log(profile);

  const addButtonHandler = e =>{
    e.preventDefault()
    setIsAddCliked(true)
    console.log(JSON.parse(e.target.value));
    setStudentName(JSON.parse(e.target.value))
  }
  const closeAddButton = () => setIsAddCliked(false)

  const addGradeHandler = e =>{
    e.preventDefault()
    console.log(studentName.id);
    console.log(enteredGrade, user.id);
    fetch("http://localhost:4000/api/grade/add",{
      method: "POST",
      mode : "cors",
      body : JSON.stringify({
        studentId : `${studentName.id}`,
        grade : `${enteredGrade}`,
        teacherId : user.id
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(resolve => resolve.json())
    .then(data => console.log(data))
  }
  const deleteGradeHandler = e =>{
    e.preventDefault()
    console.log(user.id, studentName.id);
    fetch("http://localhost:4000/api/grade/delete",{
      method: "POST",
      mode : "cors",
      body : JSON.stringify({
        studentId : `${studentName.id}`,
        grade : enteredDeleteGrade
       
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(resolve => resolve.json())
    .then(data => {

      
      setMessage(data.message)
      setTimeout(() => {
        setMessage("")
      }, 1000);
    }
    )
  }
  const addNoteHandler = e =>{
    e.preventDefault()
    console.log(enteredNote , user.id);
    fetch("http://localhost:4000/api/note/add",{
      method: "POST",
      mode : "cors",
      body : JSON.stringify({
        studentId : `${studentName.id}`,
        note : `${enteredNote}`,
        teacherId : user.id
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(resolve => resolve.json())
    .then(data => console.log(data))
  }
  const deleteNoteHandler = e =>{
    e.preventDefault()
    console.log(enteredNoteNbr);
    fetch("http://localhost:4000/api/note/delete",{
      method: "POST",
      mode : "cors",
      body : JSON.stringify({
        noteId : `${enteredNoteNbr}`,
       
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(resolve => resolve.json())
    .then(data => {

      
      setMessage(data.message)
      setTimeout(() => {
        setMessage("")
      }, 1000);
    }
    )
  }
  

  
  return (
    
    <Card className={classes.card_profile}>
      {isAddClicked && (
        <Modal className={classes.cardAddGrades}
          title={` Student ${studentName.firstName} ${studentName.lastName}`}
          message= {`Email : ${studentName.email} `}
          onConfirm={closeAddButton}>
            <form className="addNewGrade" onSubmit={addGradeHandler}>
              {/* <input  type="text" disabled={true} value={studentName.id}></input> */}
              
            <input type="number" value={enteredGrade} onChange={enteredGradeHandler} ref={enteredGradeRef} min={1} max={5} placeholder="enter grade"></input>
            <button type="submit">Add grade</button>
            </form>
            <form onSubmit={deleteGradeHandler}>
              {message && <p>{message}</p>}
              <input type="number" placeholder="grade" onChange={enteredDeleteGradeHandler} ref={enteredDeleteGradeRef} value={enteredDeleteGrade}></input>
              <button className="deleteLastGradeBtn" type="submit">Delete last grade</button>
            </form>
            <form onSubmit={addNoteHandler}   >
            <textarea placeholder="enter note" maxLength={50} value={enteredNote} onChange={enteredNoteHandler} ref={enteredNoteRef}></textarea>
            <p>{enteredNote.length}/50</p>

            <button type="submit">Add note</button>
            </form>
            <form onSubmit={deleteNoteHandler}>
              <input type="number" placeholder="Enter note number" value={enteredNoteNbr} onChange={enteredNoteNbrHandler} ref={enteredNoteNbrRef}></input>
              <button className="deleteLastGradeBtn" type="submit">Delete last note</button>
            </form>
          </Modal>
      )}
     
      <li className={classes.listProfile}>
      <h2>Profile</h2>
      <br></br>
        First Name : {profile ? profile.firstName : ""}
        <br></br>
        Last Name : {profile ? profile.lastName : ""}
        <br></br>
        email : {profile ? profile.email : ""}
        <br></br>
        role : {profile ? profile.role : ""}
        <br></br>
        subject : {profile ? profile.subject : ""}
      </li>

      <div>
        <h2>Classes</h2>
        <Accordion className="accordion" transition={{duration: "500ms", timingFunction: "cubic-bezier(0, 0, 0.2, 1)"}}>
          {profile.classes
            ? profile.classes.map((classItem) => (
                <AccordionItem >
                  <AccordionHeader >
                    <h3 className="title">Class {classItem.abbrevation}</h3>
                  </AccordionHeader>
                  <AccordionBody className="accordion-item ">

                  {students
                    ? students.map((student) => {
                      return student.classes.map((schoolClass) => {
                        return schoolClass.abbrevation ===
                        classItem.abbrevation ? (
                          <AccordionItem >
                                <AccordionHeader as="div">
                                  <h4 className="title">{student.firstName} {student.lastName}</h4>
                                </AccordionHeader>
                              <AccordionBody className="accordion-item">
                              <li
                              className={classes.listProfile}
                              key={student.id}
                              >
                              {console.log(student.grades)}

                              <div className="studentGrade">
                                <div className="gradeInput">
                                  <p>{student.email}</p>
                                  <p>{student.subject}</p>
                                  <p>{schoolClass.school}</p>
                                  <p>
                                    {schoolClass.schoolClass} -
                                    {schoolClass.departmant}
                                  </p>
                                  <p>Grade : {student.grades.length > 0 ? student.grades.map((grade) => grade.grade).join(", ") : " "}</p>

                                  <button type="submit" value={JSON.stringify(student)} onClick={addButtonHandler}>Add</button>
                                </div>
                                <div className="note">
                                  <h1>notes</h1>
                                  {console.log(student)}
                                  {
                                student.notes &&  student.notes.length > 0 ? student.notes.map((note)=>{
                                    return( <li key={note.id}>
                                       {note.id}. {note.note}

                                  </li>)
                                  }) : null
                                }
                                </div>
                              </div>
                            </li>
                              </AccordionBody>
                        </AccordionItem>
                          ) : null;
                        });
                      })
                      : null}
                      </AccordionBody>
                  ;
                      </AccordionItem>
              ))
              : null}
        </Accordion>
      </div>
    </Card>
  );
};

export default Profile;