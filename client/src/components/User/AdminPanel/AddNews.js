import React, { useRef, useState } from 'react';
import classes from './AddNews.module.css';
import * as filestack from 'filestack-js';
import Button from '../../UI/Button';
import Card from '../../UI/Card';
import { API_KEY } from '../../../firestack';


const client = filestack.init(API_KEY);

function UploadFile() {
  const [url, setUrl] = useState("");
  const [enteredTextarea, setEnteredTextarea] = useState("")
  const [eneteredClassCode, setClassCode] = useState("")
  const [ enteredTitle, setEnteredTitle ] = useState("")
  const [uploadFinished, setUploadFinished] = useState(false)

  const textareaRef = useRef()
  const classCodeRef = useRef()
  const inputTitleRef = useRef()
  
  const textAreaHandler =e =>{
      setEnteredTextarea(e.target.value)
    }
  const titleHandler =e =>{
      setEnteredTitle(e.target.value)
    }


const uploadFileHandler = (event) => {
    event.preventDefault();
    const options = {
        maxFiles: 3,
        uploadInBackground: false,
        onUploadDone: (res) => {
            console.log(res);
            const url = res.filesUploaded[0].url
            console.log(url);
            setUrl(url)
            // setReset(true)
        },
    };
    client.picker(options).open()
    
  };

  const handleFormSubmit = e=>{
    e.preventDefault()
    if(!eneteredClassCode && !enteredTextarea && !enteredTitle ){
        return
    }
    const classes = JSON.parse(localStorage.getItem("classList"))
    const user = JSON.parse(localStorage.getItem("user"))
    if(!classes) {
      return console.log("ovo treba henldat los class code");
    }
    const schoolClass = classes.filter(x => x.abbrevation === eneteredClassCode)
    console.log(schoolClass[0]);
    console.log(url, " - fd",enteredTextarea," - ta", enteredTitle, schoolClass[0].id); 

    fetch("http://localhost:4000/api/news",{
        method:"POST",
        body : JSON.stringify({
            url : `${url}`,
            text: `${enteredTextarea}`,
            title : `${enteredTitle}`,
            classes : schoolClass[0],
            user : user
        }),        
      headers: {
        'Content-Type': 'application/json',
      },
        
    })
    .then(resolve => resolve.json())
    .then(data => console.log(data))

    setClassCode("")
    setEnteredTextarea("")
    setEnteredTitle("")
        setUploadFinished(true)
         setTimeout(() => setUploadFinished(false), 1000)
    }
  const classCodeHandler = e =>{
    e.preventDefault()
    setClassCode(e.target.value)
  }
//   const resetHandler = () =>{
//     setReset(false)
//     setClassCode("")
//     setEnteredTextarea("")
//   }
  return (
    <Card className={classes.card}>
      <form onSubmit={handleFormSubmit}>
        <input type='text' className={classes.input} ref={classCodeRef} required={true} value={eneteredClassCode} onChange={classCodeHandler} placeholder='Enter Class Code'></input>
        <input type='text' className={classes.input} ref={inputTitleRef} required={true} value={enteredTitle} onChange={titleHandler} placeholder='Enter Title'></input>
        <textarea className={classes.textarea} cols={40} rows={11} maxLength={400} required={true} ref={textareaRef} value={enteredTextarea} onChange={textAreaHandler} placeholder='Enter news'></textarea>
        <p>{enteredTextarea.length}/400</p>
          <Button className={classes.picker} type="button" onClick={uploadFileHandler}>Upload aditional file</Button>
          {/* <Button type="button" onChange={resetHandler} >Reset</Button> */}
          <Button className={classes.inputBtn} type="submit">Confirm</Button> 
          {url ? <p>File suscesfully uploaded. Please click Confirm</p> : ""}
          {uploadFinished && <p className={classes.suscesfull}>News is suscesfully added!</p>}
 
      </form>
 
    </Card>
  );
}

export default UploadFile;
