import { useEffect, useState } from "react";
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

  useEffect(() => {
    console.log("sto ne fetchas ????");
    fetch("http://localhost:4000/api/user/getstudents", {
      mode: "cors",
      method: "GET",
    })
      .then((resolve) => resolve.json())
      .then((results) => {
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
  
  return (
    
    <Card className={classes.card_profile}>
      {isAddClicked && (
        <Modal
          title={` Student ${studentName.firstName} ${studentName.lastName}`}
          message={studentName.email}
          onConfirm={closeAddButton}>
            <form className="addNewGrade">
            <input placeholder="enter grade"></input>
            <button type="submit">Add grade</button>
            </form>
            <form >
            <textarea placeholder="enter note"></textarea>
            <button type="submit">Add note</button>
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
                              {console.log(student)}

                              <div className="studentGrade">
                                <div className="gradeInput">
                                  <p>{student.email}</p>
                                  <p>{student.subject}</p>
                                  <p>{schoolClass.school}</p>
                                  <p>
                                    {schoolClass.schoolClass} -
                                    {schoolClass.departmant}
                                  </p>
                                  <p>Grade : {student.grade || " "}</p>

                                  <button type="submit" value={JSON.stringify(student)} onClick={addButtonHandler}>Add</button>
                                </div>
                                <div className="note">
                                  <h1>notes</h1>
                                  <p>Lorem ipsun</p>
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