import React, { useRef, useState } from 'react';
import classes from './AddNews.module.css';
import * as filestack from 'filestack-js';
import Button from '../../UI/Button';
import Card from '../../UI/Card';
const client = filestack.init('ACZJipOIURtOeZs5TGJjJz');


function UploadFile() {
  const [url, setUrl] = useState("");
  const [enteredTextarea, setEnteredTextarea] = useState("")
  const [eneteredClassCode, setClassCode] = useState("")
  const [ reset, setReset ] = useState(false)

  const textareaRef = useRef()
  const classCodeRef = useRef()
  
  const textAreaHandler =e =>{
      setEnteredTextarea(e.target.value)
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
            setReset(true)
        },
    };
    client.picker(options).open()
    
  };

  const handleFormSubmit = e=>{
    e.preventDefault()
    if(!eneteredClassCode){
        return
    }
    const classes = JSON.parse(localStorage.getItem("classList"))
    const schoolClass = classes.filter(x => x.abbrevation === eneteredClassCode)
    console.log(schoolClass);
    console.log(url, " - fd",enteredTextarea," - ta",schoolClass[0].id,); 
  }
  const classCodeHandler = e =>{
    e.preventDefault()
    setClassCode(e.target.value)
  }
  const resetHandler = () =>{
    setReset(false)
    setClassCode("")
    setEnteredTextarea("")
  }
  return (
    <Card>
      <form onSubmit={handleFormSubmit}>
        <input type='text' ref={classCodeRef} value={eneteredClassCode} onChange={classCodeHandler} placeholder='Enter Class code'></input>
        <textarea ref={textareaRef} value={enteredTextarea} onChange={textAreaHandler} placeholder='Enter news'></textarea>
     
          {/* <Button type="button" onClick={uploadFileHandler} disabled={reset} >Upload aditional file</Button> */}
          <Button type="button" onChange={resetHandler} >Reset</Button>
          {url ? "File suscesfully uploaded" : ""}
          <Button className={classes.input} type="submit" >

           Confirm
        </Button> 
 
      </form>
 
    </Card>
  );
}

export default UploadFile;
