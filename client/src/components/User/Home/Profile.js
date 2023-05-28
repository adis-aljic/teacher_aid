import { useEffect, useState } from "react";
import Card from "../../UI/Card";
import classes from "./ListNews.module.css"

const Profile = props =>{
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(user);
    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem("profile")))
    const [myClasses, setMyClasses] = useState([])

    // setProfile()
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
        .then(data =>
        {
                console.log("dataaaa");
            setProfile(data[0])
            localStorage.setItem("profile",JSON.stringify(data[0]))
            setMyClasses(data[0].classes)
            console.log(data[0])
        } 
        )
    
        
    },[])
    
    console.log(profile, " profile");

    // console.log(classesList);
    return(
    <Card className={classes.card_profile}>
        <li key={profile.id}  className={classes.listProfile}>
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
        {console.log(myClasses)}
            {
                myClasses.map((item, index)=> {
           {console.log(item)} 
           
                <li key={index}  className={classes.listProfile}>
              School : { item.school}
              <br></br>
              Class : {item.schoolClass} - {item.departmant}
              <br></br>
              Class code : {item.abbrevation}
       </li> 
    })}

 
    </Card>
)
}

export default Profile;