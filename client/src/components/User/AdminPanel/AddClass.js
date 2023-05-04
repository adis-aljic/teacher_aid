import { useState, useRef } from "react";
import Card from "../../UI/Card"
import Button from "../../UI/Button";
import classes from "./AddClass.module.css"

const AddClass = props =>{
    const [enteredSchool , setEnteredSchool] = useState("")
    const [enteredClass , setEnteredClass] = useState("")
    const [enteredDepartmant , setEnteredDepartmant] = useState("")
    const [enteredAbrevation , setEnteredAbrevation] = useState("")
    const [enteredCity, setEnteredCity] = useState("")

    const inputSchoolRef = useRef()
    const inputClassRef = useRef()
    const inputDepartmantRef = useRef()
    const inputCityRef = useRef()
    
    const schoolHandler = e =>{
        setEnteredSchool(inputSchoolRef.current.value)
    }
    const  classHandler= e =>{
        setEnteredClass(inputClassRef.current.value)
    }
    const departmantHandler = e =>{
        setEnteredDepartmant(inputDepartmantRef.current.value)
    }
    const cityHandler = e =>{
        setEnteredCity(inputCityRef.current.value)
    }
    const schoolAbbr = (string) =>{
        return string.split(" ").map((x)=>x[0]).join("")
    }
    
    const addClassHandler = (e) =>{
        e.preventDefault()
        setEnteredAbrevation(`${schoolAbbr(enteredSchool)}_${enteredCity}_${enteredClass}-${enteredDepartmant}`)
        const school = inputSchoolRef.current.value
        const city = inputCityRef.current.value
        const schoolClass = inputClassRef.current.value
        const departmant = inputDepartmantRef.current.value
        const abb = enteredAbrevation
        console.log(school,city,schoolClass,departmant,abb);

    }

    return(
        <Card className={classes.height}>
            <form onSubmit={addClassHandler}>
                <h1>Add new class</h1>
            <input
              type="text"
              name="school"
              placeholder="School"
              ref={inputSchoolRef}
              value={enteredSchool}
              onChange={schoolHandler}
              maxLength={22}></input>
            <input
              type="text"
              name="ciy"
              placeholder="City(2 Letters)"
              ref={inputCityRef}
              value={enteredCity}
              onChange={cityHandler}
              maxLength={2}></input>

            <input
              type="text"
              name="class"
              placeholder="Class"
              ref={inputClassRef}
              value={enteredClass}
              onChange={classHandler}
              maxLength={1}></input>

            <input
              type="text"
              name="departmant"
              placeholder="Departmant"
              ref={inputDepartmantRef}
              value={enteredDepartmant}
              onChange={departmantHandler}
              maxLength={1}>

              </input>
            <input
              type="text"
              name="abrevation"
              placeholder="Abrevation ex. ETS_2A"
              value={enteredAbrevation}
              disabled={true}
              ></input>
            <Button type="submit">Add new class</Button>

            </form>


        </Card>
    )
    

    
}

export default AddClass;