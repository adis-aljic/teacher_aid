import { useEffect, useRef, useState } from "react";
import Card from "../../UI/Card";
import classes from "./ListNews.module.css";
import styles from "./Profile.module.css";
import React from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "react-headless-accordion";
import Modal from "../../UI/Modal";

const Profile = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const [students, setStudents] = useState([]);
  const [isAddClicked, setIsAddCliked] = useState(false);
  const [studentName, setStudentName] = useState({});
  const [enteredGrade, setEnteredGrade] = useState(null);
  const [enteredDeleteGrade, setEnteredDeleteGrade] = useState(null);
  const [enteredNote, setEnteredNote] = useState("");
  const [message, setMessage] = useState("");
  const [enteredNoteNbr, setEnteredNoteNbr] = useState(null);

  const enteredGradeRef = useRef();
  const enteredDeleteGradeRef = useRef();
  const enteredNoteRef = useRef();
  const enteredNoteNbrRef = useRef();

  const enteredGradeHandler = () =>
    setEnteredGrade(enteredGradeRef.current.value);
  const enteredDeleteGradeHandler = () =>
    setEnteredDeleteGrade(enteredDeleteGradeRef.current.value);
  const enteredNoteHandler = () => setEnteredNote(enteredNoteRef.current.value);
  const enteredNoteNbrHandler = () =>
    setEnteredNoteNbr(enteredNoteNbrRef.current.value);
 
  useEffect(() => {
    // fetch("http://localhost:4000/api/user/getstudents", {
      fetch("https://teacher-aid.onrender.com/api/user/getstudents", {

      mode: "cors",
      method: "GET",
    })
      .then((resolve) => resolve.json())
      .then((results) => setStudents(results));


    // fetch("http://localhost:4000/api/user", {
      fetch("https://teacher-aid.onrender.com/api/user", {

      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        id: `${user.id}`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resolve) => resolve.json())
      .then((data) => {
        console.log(data[0]);
        setProfile(data[0]);
        localStorage.setItem("profile", JSON.stringify(data[0]));
      });
  }, [user.id]);
      console.log(profile);
  const addButtonHandler = (e) => {
    e.preventDefault();
    setIsAddCliked(true);
    setStudentName(JSON.parse(e.target.value));
  };
  const closeAddButton = () => setIsAddCliked(false);

  const addGradeHandler = (e) => {
    e.preventDefault();

    // fetch("http://localhost:4000/api/grade/add", {
      fetch("https://teacher-aid.onrender.com/api/grade/add", {

      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        studentId: `${studentName.id}`,
        grade: `${enteredGrade}`,
        teacherId: user.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resolve) => resolve.json())
      .then((data) => {
        setMessage(data.message);
        setTimeout(() => {
          setMessage("");
        }, 1000);
      });
      setEnteredGrade("")
  };
  const deleteGradeHandler = (e) => {
    e.preventDefault();
    // fetch("http://localhost:4000/api/grade/delete", {
      fetch("https://teacher-aid.onrender.com/api/grade/delete", {

      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        studentId: `${studentName.id}`,
        grade: enteredDeleteGrade,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resolve) => resolve.json())
      .then((data) => {
        setMessage(data.message);
        setTimeout(() => {
          setMessage("");
        }, 1000);
      });
      setEnteredDeleteGrade("")
  };
  const addNoteHandler = (e) => {
    e.preventDefault();
    // fetch("http://localhost:4000/api/note/add", {
      fetch("https://teacher-aid.onrender.com/api/note/add", {

      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        studentId: `${studentName.id}`,
        note: `${enteredNote}`,
        teacherId: user.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resolve) => resolve.json())
      .then(() => {
        setMessage("Note is added");
        setTimeout(() => {
          setMessage("");
        }, 1000);
      });
      setEnteredNote("")
  };
  const deleteNoteHandler = (e) => {
    e.preventDefault();
    // fetch("http://localhost:4000/api/note/delete", {
      fetch("https://teacher-aid.onrender.com/api/note/delete", {

      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        noteId: `${enteredNoteNbr}`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resolve) => resolve.json())
      .then((data) => {
        setMessage(data.message);
        setTimeout(() => {
          setMessage("");
        }, 1000);
      });
      setEnteredNoteNbr("")
  };

  return (
    <Card className={styles.cardHomeProfile}>
      {isAddClicked && (
        <Modal
          className={styles.cardAddGrades}
          title={` Student ${studentName.firstName} ${studentName.lastName}`}
          message={`Email : ${studentName.email} `}
          onConfirm={closeAddButton}
        >
          <form  className="addNewGrade" onSubmit={addGradeHandler}>
            <input
              type="number"
              value={enteredGrade}
              onChange={enteredGradeHandler}
              ref={enteredGradeRef}
              min={1}
              max={5}
              placeholder="Enter grade"
            ></input>
            <button type="submit">Add grade</button>
          </form>
          <form  onSubmit={deleteGradeHandler} className={styles.deleteGrade}>
            {message && <p>{message}</p>}
            <input
              type="number"
              placeholder="Grade"
              onChange={enteredDeleteGradeHandler}
              ref={enteredDeleteGradeRef}
              value={enteredDeleteGrade}
            ></input>
            <button  type="submit">
              Delete grade
            </button>
          </form>
          <form  onSubmit={addNoteHandler}>
            <textarea
              placeholder="Enter note"
              maxLength={50}
              value={enteredNote}
              onChange={enteredNoteHandler}
              ref={enteredNoteRef}
            ></textarea>
            <p>{enteredNote.length}/50</p>

            <button type="submit">Add note</button>
          </form>
          <form  onSubmit={deleteNoteHandler} className={styles.deleteNote}>
            <input
              type="number"
              placeholder="Enter note number"
              value={enteredNoteNbr}
              onChange={enteredNoteNbrHandler}
              ref={enteredNoteNbrRef}
            ></input>
            <button className={styles.deleteLastGradeBtn} type="submit">
              Delete last note
            </button>
          </form>
        </Modal>
      )}
      <div className={styles.card_profile}>
        <ul className={styles.listProfile}>
          <li key={ profile ? profile.id : 1}>
            <h2>Profile</h2>
            <br></br>
            Name : {profile ? `${profile.firstName}  ${profile.lastName}` : ""}
           
            <br></br>
            Email : {profile ? profile.email : ""}
            <br></br>
            role : {profile ? profile.role : ""}
            <br></br>
          </li>
        </ul>

        <div className={styles.listClasses}>
          <Accordion
            className={styles.accordion}
            transition={{
              duration: "500ms",
              timingFunction: "cubic-bezier(0, 0, 0.2, 1)",
            }}
          >
            <h1>Classes</h1>
            {profile
              ? profile.classes.map((classItem) => (
                  <AccordionItem>
                    <AccordionHeader className="btnTitle">
                      <h3 className={styles.title}>
                        Class {classItem.abbrevation}
                      </h3>
                    </AccordionHeader>
                    <hr></hr>
                    <AccordionBody className={styles["accordion-item"]}>
                      {students
                        ? students.map((student) => {
                            return student.classes.map((schoolClass) => {
                              return schoolClass.abbrevation ===
                                classItem.abbrevation ? (
                                <AccordionItem  className={styles.acc}>
                                  <AccordionHeader as="div">
                                    <h4 className={styles.title}>
                                      {student.firstName} {student.lastName}
                                    </h4>
                                  </AccordionHeader>
                                  <AccordionBody
                                    className={styles["accordion-item"]}
                                  >
                                  {student ?    <li
                                      className={classes.listProfile}
                                      key={student.id}
                                    >
                                      <div className={styles.studentGrade}>
                                        <div className={styles.gradeInput}>
                                          <p>{student.email}</p>
                                          <p>{student.subject}</p>
                                          <p>{schoolClass.school}</p>
                                          <p>
                                          Class :    {schoolClass.schoolClass} -
                                            {schoolClass.departmant}
                                          </p>
                                          <p>
                                          Grade : 
                                            {student.grades.length > 0
                                              ? student.grades
                                                  .map((grade) => grade.grade)
                                                  .join(", ")
                                              : " No grade "}
                                          </p>

                                          <button
                                            type="submit"
                                            value={JSON.stringify(student)}
                                            onClick={addButtonHandler}
                                          >
                                            Add
                                          </button>
                                        </div>
                                        <div className={styles.note}>
                                          <div>
                                            <h3>notes</h3>
                                          </div>

                                          <ul>
                                            {student.notes &&
                                            student.notes.length > 0 ? (
                                              student.notes.map((note) => {
                                                return (
                                                  <li key={note.id} style={{listStyleType: "none"}}>
                                                    {note.id}. {note.note}
                                                  </li>
                                                );
                                              })
                                            ) : (
                                              <p>No notes ... </p>
                                            )}
                                          </ul>
                                        </div>
                                      </div>
                                    </li> :  <p>
                                       No students "
                                      </p>}
                                  </AccordionBody>
                                </AccordionItem>
                              ) : null;
                            });
                          })
                        : null}
                    </AccordionBody>
                  </AccordionItem>
                ))
              : null}
          </Accordion>
        </div>
      </div>
    </Card>
  );
};

export default Profile;
