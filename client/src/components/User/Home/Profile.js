import { useEffect, useState } from "react";
import Card from "../../UI/Card";
import classes from "./ListNews.module.css"

const Profile = props =>{
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(user);
    const [data, setData] = useState([])
    if(data.length ===0){
        setData(JSON.parse(localStorage.getItem("user_data")))
    }
    useEffect(()=>{
            console.log("njeanjnjnaejen");
        fetch("http://localhost:4000/api/user",{
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                id: `${user.id}`,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(resolve => resolve.json())
        .then(result =>
        {
            
            console.log(result)
            setData(result)
            localStorage.setItem("user_data",JSON.stringify(result))
        } 
        )
        
    },[user.id])
    
    console.log(data);
return(
    <Card className={classes.card_profile}>
     
     <li key={data[0].id} className={classes.listNews}>
            First Name : {data[0].firstName }
            <br></br>
        Last Name : {data[0].lastName }
            <br></br>
        email : {data[0].email }
            <br></br>
        role : {data[0].role }
            <br></br>
        subject : {data[0].subject }
        </li>
            <br></br>
    
 
    </Card>
)
}

export default Profile;