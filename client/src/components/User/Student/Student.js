import { useEffect, useState } from "react"
import Card from "../../UI/Card"

const Student = props =>{
    const user = JSON.parse(localStorage.getItem("user"))
    const [info , setInfo] = useState()
    console.log(user)
    useEffect(()=>{
        fetch("http://localhost:4000/api/user",{
            mode :"cors",
            method : "POST",
            body : JSON.stringify({
                id : user.id
            }),
            headers : {"Content-Type" : "application/json"}
        })
        .then(resolve => resolve.json())
        .then(data => setInfo(data[0]))
    },[user.id])
    console.log(info);
    return(
        <Card>
            {info ? <p>Name {info.firstName} {info.lastName}</p> : null}
            {info ? <p>Email {info.email}</p> : null}
            {info ? <p>Subject {info.subject}</p> : null}
           
        </Card>
    )
}

export default Student