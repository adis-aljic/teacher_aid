import { useContext, useEffect, useState } from "react";
import Card from "../../UI/Card";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "react-headless-accordion";
import styles from "./Student.module.css";
import { Link } from "react-router-dom";
import AuthContex from "../../../store/Auth-ctx";

const Student = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [info, setInfo] = useState(JSON.parse(localStorage.getItem("profile")));
  const [teachers, setTeachers] = useState(
    JSON.parse(localStorage.getItem("MyClasses"))
  );
  const ctx = useContext(AuthContex);

  useEffect(() => {
    fetch("https://teacher-aid.onrender.com/api/user", {

    // fetch("http://localhost:4000/api/user", {
      mode: "cors",
      method: "POST",
      body: JSON.stringify({
        id: user.id,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((resolve) => resolve.json())
      .then((data) => {
        setInfo(data[0]);
        localStorage.setItem("profile", JSON.stringify(data[0]));
      });
    // fetch("http://localhost:4000/api/user/teachers", {
      fetch("https://teacher-aid.onrender.com/api/user/teachers", {

      mode: "cors",
      method: "GET",
    })
      .then((resolve) => resolve.json())
      .then((data) => {
        setTeachers(data);
        localStorage.setItem("MyClasses", JSON.stringify(data));
      });
  }, [user.id]);

  const infoData = [];
  if (info) {
    const codes = info.classes.map((code) => code.abbrevation);
    codes.map((x) => {
      teachers.map((teacher) => {
        teacher.classes.map((sClass) => {
          if (x === sClass.abbrevation) {
            const obj = {
              code: x,
              fullName: `${teacher.firstName} ${teacher.lastName}`,
              email: teacher.email,
              school: sClass.school,
              schoolClass: `${sClass.schoolClass} - ${sClass.departmant}`,
              subject: sClass.subject,
            };
            infoData.push(obj);
          }
        });
        localStorage.setItem("teacherData", JSON.stringify(infoData));
      });
      // setObj(infoData)
    });
  }
  return (
    <Card className={styles.card}>
      <div className={styles.profileStudent}>
        <h2>Profile</h2>
        <br></br>
        <br></br>
        {info ? (
          <p>
            Name {info.firstName} {info.lastName}
          </p>
        ) : null}
        <br></br>
        {info ? <p>Email {info.email}</p> : null}
      </div>
      <div className={styles.studentSubjects}>
        <Accordion
          as="div"
          transition={{
            duration: "500ms",
            timingFunction: "cubic-bezier(0, 0, 0.2, 1)",
          }}
        >
          {info
            ? info.classes.map((schoolClass) => {
                return (
                  <AccordionItem className={styles.accordion}>
                    <AccordionHeader className={styles.title}>
                      <h3>{schoolClass.subject}</h3>
                    </AccordionHeader>
                    <AccordionBody as="div" className={styles.body}>
                      <li>
                        <p className={styles.studentGrade}>
                          <h3>Grade</h3>
                          {info.grades
                            ? info.grades.map((grade) => grade.grade).join(", ")
                            : " No grade"}
                        </p>

                        <br></br>
                        <p className={styles.studentNote}>
                          <h3>Notes</h3>
                          {info.notes
                            ? info.notes.map((note) => note.note).join(" \n")
                            : " No notes"}
                        </p>
                        <br></br>
                        {infoData.map((obj) => {
                          return obj.code === schoolClass.abbrevation ? (
                            <>
                              Teacher : {obj.fullName}
                              <br></br>
                              Email :{" "}
                              <Link to="/message">
                                <a onClick={ctx.navigationMessageHandler}>
                                  {obj.email}
                                </a>
                              </Link>
                            </>
                          ) : null;
                        })}
                      </li>
                    </AccordionBody>
                  </AccordionItem>
                );
              })
            : null}
        </Accordion>
      </div>
    </Card>
  );
};

export default Student;
