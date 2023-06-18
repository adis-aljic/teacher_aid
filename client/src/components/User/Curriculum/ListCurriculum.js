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
import pdfForm from "./Monthly_plan_form.pdf";
// import pdfFile from "..\..\..\src\assets\monthly_plan_10m.pdf"
import {
  findSchoolYear,
  countWeeksInMonths,
  secondDate,
  getClassesPerMonths,
} from "./functionForCalculatingMonthlyCurriculums";

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
  const [classCode, setClassCode] = useState("");
  const [pdf, setPdf] = useState(false);
  const [choosenMonth, setChooseMonth] = useState("September");
  const [formData, setFormData] = useState({});
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
  const inputClassCodeRef = useRef();

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
  const classCodeHandler = (e) => setClassCode(e.target.value);

  const septembarRadioHandler = () => setChooseMonth("September");
  const oktobarRadioHandler = () => setChooseMonth("October");
  const novembarRadioHandler = () => setChooseMonth("November");
  const decembarRadioHandler = () => setChooseMonth("December");
  const januarRadioHandler = () => setChooseMonth("January");
  const februarRadioHandler = () => setChooseMonth("February");
  const martRadioHandler = () => setChooseMonth("Mart");
  const aprilRadioHandler = () => setChooseMonth("April");
  const mayRadioHandler = () => setChooseMonth("May");
  const juneRadioHandler = () => setChooseMonth("June");

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
  // console.log(curriculum[0]);

  const monthlyPlanHandler = () => {
    setMonthlyPlan(true);
    setPdf(false);
  };
  const monthlyPlanCloseHandler = () => setMonthlyPlan(false);

  const onSubmitMonthlyPlanHandler = async (e) => {
    e.preventDefault();
    monthlyPlanCloseHandler();
    setPdf(true);
    // countWeeksInMonths()
    const year1 = findSchoolYear().year1;
    const year2 = findSchoolYear().year2;
    const schoolCalendar = countWeeksInMonths(year1, year2);
    console.log(choosenMonth);
    console.log(schoolCalendar);
    const week1 = countWeeksInMonths(year1, year2).find(
      ({ month }) => month === choosenMonth
    ).startDates[0];
    const week2 = countWeeksInMonths(year1, year2).find(
      ({ month }) => month === choosenMonth
    ).startDates[1];
    const week3 = countWeeksInMonths(year1, year2).find(
      ({ month }) => month === choosenMonth
    ).startDates[2];
    const week4 = countWeeksInMonths(year1, year2).find(
      ({ month }) => month === choosenMonth
    ).startDates[3];
    const week5 = countWeeksInMonths(year1, year2).find(
      ({ month }) => month === choosenMonth
    ).startDates[4];
    const date1 = secondDate(week1)
      ? `${week1} - ${secondDate(week1)}`
      : undefined;
    const date2 = secondDate(week2)
      ? `${week2} - ${secondDate(week2)}`
      : undefined;
    const date3 = secondDate(week3)
      ? `${week3} - ${secondDate(week3)}`
      : undefined;
    const date4 = secondDate(week4)
      ? `${week4} - ${secondDate(week4)}`
      : undefined;
    const date5 = secondDate(week5)
      ? `${week5} - ${secondDate(week5)}`
      : undefined;
    // console.log(date1,date2,date3,date4,date5);
    const currentCurriculum = curriculum.find(
      ({ classCode }) => classCode === classCode
    );
    const classesPerMonths = getClassesPerMonths(
      currentCurriculum.curriculum,
      schoolCalendar,
      numberOfClassesPerWeek,
      choosenMonth
    );
    console.log(classesPerMonths);
    const data = {
      // classCode ,
      month: choosenMonth,
      // numberOfClassesPerWeek,
      // curriculum : currentCurriculum,
      school: classes.find((x) => x.abbrevation === classCode).school,
      subjec: user.subject,
      teacher: `${user.firstName} ${user.lastName}`,
      schoolClass: `${
        classes.find((x) => x.abbrevation === classCode).schoolClass
      } ${classes.find((x) => x.abbrevation === classCode).departmant}`,
      year1: year1.toString(),
      year2: year2.toString(),
      date1,
      date2,
      date3,
      date4,
      date5,
      text1: classesPerMonths.slice(0, numberOfClassesPerWeek).join(" "),
      textarea_33cfnu: classesPerMonths
        .slice(numberOfClassesPerWeek, numberOfClassesPerWeek * 2)
        .join(" "),
      text3: classesPerMonths
        .slice(numberOfClassesPerWeek * 2, numberOfClassesPerWeek * 3)
        .join(" "),
      text4: classesPerMonths
        .slice(numberOfClassesPerWeek * 3, classesPerMonths * 4)
        .join(" "),
      text5: classesPerMonths
        .slice(numberOfClassesPerWeek * 4, classesPerMonths * 5)
        .join(" "),

      // schoolyear 1 i 2
      //
    };
    setFormData(data);
    console.log(data);
  };

  const pdfHandler = () => {
    setPdf(false);
  };
  // console.log(pdf, monthlyPlan);
  return (
    <div className={styles.pdf}>
      {monthlyPlan && !pdf && (
        <Modal
          className={styles.modalMP}
          title="Monthly plan"
          message="Please enter number of classes per months"
          onConfirm={monthlyPlanCloseHandler}
        >
          <form onSubmit={onSubmitMonthlyPlanHandler} className="form">
            <div className={styles.inputs}>
              <div className={styles.headerModalInput}>
                <input
                  type="number"
                  min={1}
                  className={styles.nbrClPW}
                  ref={inputNumberOfClassesPerWeekRef}
                  value={numberOfClassesPerWeek}
                  required={true}
                  onChange={numberOfClassesPerWeekHandler}
                  placeholder="Number of classes/week"
                ></input>
                <input
                  className={styles.nbrClPW}
                  ref={inputClassCodeRef}
                  value={classCode}
                  required={true}
                  onChange={classCodeHandler}
                  placeholder="Class code"
                ></input>
              </div>
            </div>
            <div className="modal-mp">
              
                {/* <input
                  ref={inputSeptRef}
                  value={enteredSept}
                  min={0}
                  onChange={septHandler}
                  placeholder="Septembar"
                ></input> */}
                  <div>
                 <div className={styles.rbtn}>
                <label htmlFor="sept">Septembar</label>
                <input
                  id="sept"
                  type="radio"
                  name="chooseMonth"
                  checked={true}
                  onChange={septembarRadioHandler}
                  ></input>
                  </div>
                {/* <input
                  ref={inputOktRef}
                  value={enteredOkt}
                  min={0}
                  onChange={oktHandler}
                  placeholder="October"
                ></input> */}
                 <div className={styles.rbtn}>

                <label htmlFor="oct">Oktobar</label>

                <input
                  id="oct"
                  type="radio"
                  name="chooseMonth"
                  onChange={oktobarRadioHandler}
                  ></input>
                  </div>
              
                    
                {/* <input
                  ref={inputNovRef}
                  value={enteredNov}
                  min={0}
                  onChange={novHandler}
                  placeholder="November"
                ></input> */}
                 <div className={styles.rbtn}>

                <label htmlFor="nov">Novembar</label>

                <input
                  id="nov"
                  type="radio"
                  name="chooseMonth"
                  onChange={novembarRadioHandler}
                  ></input>
                      </div>
                {/* <input
                  ref={inputDecRef}
                  value={enteredDec}
                  min={0}
                  onChange={decHandler}
                  placeholder="December"
                ></input> */}

                </div>
                <div>
                   <div className={styles.rbtn}>

                <label htmlFor="dec">December</label>

                <input
                  id="dec"
                  type="radio"
                  name="chooseMonth"
                  onChange={decembarRadioHandler}
                  ></input>
                  </div>
                  {/* </div> */}
                  {/* <div> */}
                {/* <input
                  ref={inputJanRef}
                  value={enteredJan}
                  min={0}
                  onChange={janHandler}
                  placeholder="January"
                ></input> */}
                 <div className={styles.rbtn}>

                <label htmlFor="jan">Januar</label>

                <input
                  id="jan"
                  type="radio"
                  name="chooseMonth"
                  onChange={januarRadioHandler}
                  ></input>
                  </div>


                {/* <input
                  ref={inputFebRef}
                  value={enteredFeb}
                  min={0}
                  onChange={febHandler}
                  placeholder="February"
                ></input> */}
                  <div className={styles.rbtn}> 

                <label htmlFor="feb">Februar</label>

                <input
                  id="feb"
                  type="radio"
                  name="chooseMonth"
                  onChange={februarRadioHandler}
                  ></input>
                  </div>
                {/* <input
                  ref={inputMartRef}
                  value={enteredMart}
                  min={0}
                  onChange={martHandler}
                  placeholder="Mart"
                ></input> */}
                </div>
                <div>
                <div className={styles.rbtn}> 

                <label htmlFor="mart">Mart</label>

                <input
                  id="mart"
                  type="radio"
                  name="chooseMonth"
                  onChange={martRadioHandler}
                  ></input>
                  </div>
                {/* <input
                  ref={inputAprRef}
                  value={enteredApr}
                  min={0}
                  onChange={aprHandler}
                  placeholder="April"
                ></input> */}
                <div className={styles.rbtn}> 

                <label htmlFor="apr">April</label>

                <input
                  id="apr"
                  type="radio"
                  name="chooseMonth"
                  onChange={aprilRadioHandler}
                  ></input>
                  </div>
                {/* <input
                  ref={inputMayRef}
                  value={enteredMay}
                  min={0}
                  onChange={mayHandler}
                  placeholder="May"
                ></input> */}
                <div className={styles.rbtn}> 

                <label htmlFor="may">Maj</label>

                <input
                  id="may"
                  type="radio"
                  name="chooseMonth"
                  onChange={mayRadioHandler}
                  ></input>
                  </div>
              
                {/* <input
                  ref={inputJuneRef}
                  value={enteredJune}
                  min={0}
                  onChange={juneHandler}
                  placeholder="June"
                ></input> */}
                <div className={styles.rbtn}> 

                <label htmlFor="jun">Juni</label>

                <input
                  id="jun"
                  type="radio"
                  name="chooseMonth"
                  onChange={juneRadioHandler}
                  ></input>
                  </div>
                  </div>

              </div>
            <div>
              <button type="submit">Preview</button>
            </div>
          </form>
        </Modal>
      )}
      
      <Card className="cardCurr">
        {/* {console.log(user)} */}
        {pdf ? (
          <PdfFormPreview
            onClick={pdfHandler}
            pdfUrl={pdfForm}
            formData={formData}
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
                      <div className="CurriculumList">
                        <br></br>
                        <h4>Curriculum</h4>
                        <br></br>
                        {/* {console.log(curriculum[0].curriculum)} */}

                        {curriculumItem.curriculum
                          .replaceAll("\t", " ")
                          .split("\n")
                          .map((item) => {
                            return <li >{item}</li>;
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
      
    </div>
  );
};
export default ListCurriculum;
