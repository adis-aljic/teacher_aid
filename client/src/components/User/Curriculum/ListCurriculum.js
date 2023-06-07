import Card from "../../UI/Card";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "react-headless-accordion";
import "../Home/Profile.css";
import { useEffect, useRef, useState } from "react";
import Button from "../../UI/Button";
import Modal from "../../UI/Modal";
import styles from "./Curriculum.module.css";
import { PDFDocument, PDFName, StandardFonts } from "pdf-lib";
import PdfFormPreview from "../../pdfViewer/PdfFormPreview";

// import pdfFile from "..\..\..\src\assets\monthly_plan_10m.pdf"
const ListCurriculum = (props) => {
  const [curriculum, setCurriculum] = useState(
    JSON.parse(localStorage.getItem("curriculumList"))
  );
  const [monthlyPlan, setMonthlyPlan] = useState(false);
  const [enteredSept, setEnteredSept] = useState("");
  const [enteredOkt, setEnteredOkt] = useState("");
  const [enteredNov, setEnteredNov] = useState("");
  const [enteredDec, setEnteredDec] = useState("");
  const [enteredJan, setEnteredJan] = useState("");
  const [enteredFeb, setEnteredFeb] = useState("");
  const [enteredMart, setEnteredMart] = useState("");
  const [enteredApr, setEnteredApr] = useState("");
  const [enteredMay, setEnteredMay] = useState("");
  const [enteredJune, setEnteredJune] = useState("");
  const [numberOfClassesPerWeek, setNumberOfClassesPerWeek] = useState(1);
  const [pdf, setPdf] = useState(false);

  const inputSeptRef = useRef();
  const inputOktRef = useRef();
  const inputNovRef = useRef();
  const inputDecRef = useRef();
  const inputJanRef = useRef();
  const inputFebRef = useRef();
  const inputMartRef = useRef();
  const inputAprRef = useRef();
  const inputMayRef = useRef();
  const inputJuneRef = useRef();
  const inputNumberOfClassesPerWeekRef = useRef();

  const user = JSON.parse(localStorage.getItem("user"));
  const classes = JSON.parse(localStorage.getItem("MyClasses"));

  const numberOfClassesPerWeekHandler = (e) =>
    setNumberOfClassesPerWeek(parseInt(e.target.value));
  const septHandler = (e) => setEnteredSept(e.target.value);
  const oktHandler = (e) => setEnteredOkt(e.target.value);
  const novHandler = (e) => setEnteredNov(e.target.value);
  const decHandler = (e) => setEnteredDec(e.target.value);
  const janHandler = (e) => setEnteredJan(e.target.value);
  const febHandler = (e) => setEnteredFeb(e.target.value);
  const martHandler = (e) => setEnteredMart(e.target.value);
  const aprHandler = (e) => setEnteredApr(e.target.value);
  const mayHandler = (e) => setEnteredMay(e.target.value);
  const juneHandler = (e) => setEnteredJune(e.target.value);

  useEffect(() => {
    fetch(`http://localhost:4000/api/curriculum/list`, {
      mode: "cors",
      method: "POST",
      body: JSON.stringify({
        id: `${user.id}`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resolve) => resolve.json())
      .then((data) => {
        setCurriculum(data);
        console.log("fetchano");
        localStorage.setItem("curriculumList", JSON.stringify(data));
      });
  }, []);
  console.log(curriculum[0]);

  const monthlyPlanHandler = () => {
    setMonthlyPlan(true);
    setPdf(false);
  };
  const monthlyPlanCloseHandler = () => setMonthlyPlan(false);

  const onSubmitMonthlyPlanHandler = async (e) => {
    e.preventDefault();
    monthlyPlanCloseHandler();
    setPdf(true);
  };

  const pdfHandler = () => {
    setPdf(false);
  };
  console.log(pdf, monthlyPlan);
  return (
    <div className={styles.pdf}>
      {monthlyPlan && !pdf && (
        <Modal
          className={styles.modalMP}
          title="Monthly plan"
          message="Please enter number of classes per months"
          onConfirm={monthlyPlanCloseHandler}
        >
          <form onSubmit={onSubmitMonthlyPlanHandler}>
            <div>
              <input
                className={styles.nbrClPW}
                ref={inputNumberOfClassesPerWeekRef}
                value={numberOfClassesPerWeek}
                required={true}
                onChange={numberOfClassesPerWeekHandler}
                placeholder="Number of classes/week"
              ></input>
            </div>
            <div className="modal-mp">
              <div>
                <input
                  ref={inputSeptRef}
                  value={enteredSept}
                  min={0}
                  onChange={septHandler}
                  placeholder="Septembar"
                ></input>
                <input
                  ref={inputOktRef}
                  value={enteredOkt}
                  min={0}
                  onChange={oktHandler}
                  placeholder="October"
                ></input>
                <input
                  ref={inputNovRef}
                  value={enteredNov}
                  min={0}
                  onChange={novHandler}
                  placeholder="November"
                ></input>
                <input
                  ref={inputDecRef}
                  value={enteredDec}
                  min={0}
                  onChange={decHandler}
                  placeholder="December"
                ></input>
                <input
                  ref={inputJanRef}
                  value={enteredJan}
                  min={0}
                  onChange={janHandler}
                  placeholder="January"
                ></input>
              </div>

              <div>
                <input
                  ref={inputFebRef}
                  value={enteredFeb}
                  min={0}
                  onChange={febHandler}
                  placeholder="February"
                ></input>
                <input
                  ref={inputMartRef}
                  value={enteredMart}
                  min={0}
                  onChange={martHandler}
                  placeholder="Mart"
                ></input>
                <input
                  ref={inputAprRef}
                  value={enteredApr}
                  min={0}
                  onChange={aprHandler}
                  placeholder="April"
                ></input>
                <input
                  ref={inputMayRef}
                  value={enteredMay}
                  min={0}
                  onChange={mayHandler}
                  placeholder="Septembar"
                ></input>
                <input
                  ref={inputJuneRef}
                  value={enteredJune}
                  min={0}
                  onChange={juneHandler}
                  placeholder="June"
                ></input>
              </div>
            </div>
            <div>
              <button type="submit">Preview</button>
            </div>
          </form>
        </Modal>
      )}
      (
      <Card>
        {console.log(user)}
        {pdf ? (
          <PdfFormPreview
            onClick={pdfHandler}
            pdfUrl={"Monthly plan form.pdf"}
            formData={{
              teacher: user.firstName,
            }}
          ></PdfFormPreview>
        ) : (
          <Accordion
            className="accordion"
            transition={{
              duration: "500ms",
              timingFunction: "cubic-bezier(0, 0, 0.2, 1)",
            }}
          >
            {curriculum &&
              curriculum.map((curriculumItem) => {
                return (
                  <AccordionItem>
                    <AccordionHeader>
                      <h3 className="title">{curriculumItem.classCode}</h3>
                    </AccordionHeader>
                    <AccordionBody className="accordion-item">
                      {classes &&
                        classes.map((SchoolClass) => {
                          return (
                            <div className="listCurriculum">
                              {SchoolClass.abbrevation ===
                              curriculumItem.classCode ? (
                                <li
                                  key={SchoolClass.id}
                                  className="profileCurriculumList"
                                >
                                  <h4>School Class Information</h4>
                                  <br></br>
                                  School : {SchoolClass.school}
                                  <br></br>
                                  City : {SchoolClass.city}
                                  <br></br>
                                  Class Code : {SchoolClass.abbrevation}
                                  <br></br>
                                  School Class : {
                                    SchoolClass.schoolClass
                                  } - {SchoolClass.departmant}
                                </li>
                              ) : null}
                            </div>
                          );
                        })}
                      <div>
                        <br></br>
                        <h4>Curriculum</h4>
                        <br></br>
                        {console.log(curriculum[0].curriculum)}
                        {curriculumItem.curriculum
                          .replaceAll("\t", " ")
                          .split("\n")
                          .map((item) => {
                            return <li className="CurriculumList">{item}</li>;
                          })}
                        <Button className="btn-mp" onClick={monthlyPlanHandler}>
                          Get monthly plan
                        </Button>
                      </div>
                    </AccordionBody>
                  </AccordionItem>
                );
              })}
          </Accordion>
        )}
      </Card>
      )
    </div>
  );
};
export default ListCurriculum;
