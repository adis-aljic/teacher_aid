import { useEffect, useState } from "react";
import Card from "../../UI/Card";
import classes from "./ListNews.module.css"
import React from 'react';
import { Accordion, AccordionItem } from 'react-light-accordion';
import  "./Profile.css"


const Profile = props =>{
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(user);
    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem("profile")))
    const [students, setStudents ] = useState([])
        

    useEffect(()=>{     
        fetch("http://localhost:4000/api/user/getstudents",{
            mode: 'cors',
           
        })
        .then(resolve => resolve.json())
        .then(results => {

            setStudents(results)
        }
        )       
            
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
            setProfile(data[0])
            localStorage.setItem("profile",JSON.stringify(data[0]))
         
           
        } 
        )
        // napraviti fetch koji ide u korisnike i vraca sve korisnike sa svim razredima i onda u svaki razre
        // proci koji ima dole i ispisati koji su korisnici tu
        // napravit klikable na korisnika koji ce otoriti prozor(ili spustit) gdje ce biti opcije da se upise note ili ocjena
        
    },[])
        console.log(students);

   const classCodes = profile.classes.map(schoolClass =>{

   })

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
        
        <div>
    <h1>Classes</h1>
    <Accordion atomic={true}>



        {profile.classes
          ? profile.classes.map((classItem) => (
                  <AccordionItem title={` Class Code : ${classItem.abbrevation}`}>
              <li className={classes.listProfile}>
       
            
                  Class code : {classItem.abbrevation}
                
                <br></br>
                 School : {classItem.school}
                  <br></br>
                 Class : {classItem.schoolClass}-{classItem.departmant}
                  <br></br>
    
              </li>
       </AccordionItem>
       
       ))
       : ''}
          
       </Accordion>
     </div>

 
    </Card>
)
}

export default Profile;