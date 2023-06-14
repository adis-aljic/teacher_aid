import { useEffect, useState } from "react"
import Card from "../../UI/Card"
import {Accordion, AccordionBody, AccordionHeader, AccordionItem} from "react-headless-accordion";
import styles from "./Student.module.css"

const Student = props =>{
    const user = JSON.parse(localStorage.getItem("user"))
    const [info , setInfo] = useState(JSON.parse(localStorage.getItem("profile")))
    const [teachers , setTeachers] = useState(JSON.parse(localStorage.getItem("MyClasses")))
    console.log(user)
    useEffect(()=>{
        console.log("unutra");
        fetch("http://localhost:4000/api/user",{
            // mode :"cors",
            method : "POST",
            body : JSON.stringify({
                id : user.id
            }),
            headers : {"Content-Type" : "application/json"}
        })
        .then(resolve => resolve.json())
        .then(data => {
            console.log(data[0]);
            setInfo(data[0])
            localStorage.setItem("profile", JSON.stringify(data[0]))
        })
        fetch("http://localhost:4000/api/user/teachers",{
            mode :"cors",
            method : "GET",
        //   body : JSON.stringify({id : user.id}),
            // headers : {"Content-Type" : "application/json"}
        })
        .then(resolve => resolve.json())
        .then(data => {
            console.log(data);
            setTeachers(data)
            localStorage.setItem("MyClasses", JSON.stringify(data))
            
          
        })
    },[user.id])
    console.log(info);
    return(
        <Card>
            {console.log(info.classes[0])}
            {info ? <p>Name {info.firstName} {info.lastName}</p> : null}
            {info ? <p>Email {info.email}</p> : null}
            {/* {info ? <p>Subject {info.subject}</p> : null} */}
            <Accordion as="div" transition={{duration: "500ms", timingFunction: "cubic-bezier(0, 0, 0.2, 1)"}}>
            {info ? info.classes.map(schoolClass => {
              return (
                    <AccordionItem className={styles.accordion} >
                        <AccordionHeader className={styles.title}>
                        <h3> {schoolClass.school} {schoolClass.schoolClass}-{schoolClass.departmant} </h3>
                        </AccordionHeader>
                        <AccordionBody as="div" className={styles.body}>
                            <li>
                               Grade : {schoolClass.grade ? schoolClass.grade.join(" ,") : " no grade"}

                             <br></br>
                             Notes : {schoolClass.notes ? schoolClass.notes.join(" ,") : " no notes"}
                             <br></br>
              {     teachers ?          teachers.forEach(teacher =>{
                  return   teacher.classes.forEach(classes =>{

                    //   console.log(classes)
                    //   console.log(schoolClass)
           (classes.abbrevation === schoolClass.abbrevation)  ?
            <p>Teacher :  {teacher.firstName} {teacher.lastName} </p> : "null"
                    
                })
            }) : null}
                            </li>
                        </AccordionBody>
                    </AccordionItem>
                  )
                }) : null}
                </Accordion>
           
        </Card>
    )
}

export default Student