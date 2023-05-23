import React, { useRef, useState, useEffect } from 'react';
import styles from './AddNews.module.css';
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
  const [message , setMessage ] = useState("")
  const [isValidCode, setValidCode] = useState(true)
  const [classes, setClasses] = useState(JSON.parse(localStorage.getItem("MyClasses")))
  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    fetch('http://localhost:4000/api/classes/myclasses', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        id: `${user.id}`,
      }),     headers: {
        'Content-Type': 'application/json',
      },
    })  .then((resolve) => resolve.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem('classList', JSON.stringify(data));
        setClasses(data);
      });
  }, []);

console.log(classes);
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
        fromSources : ["local_file_system"],
        // accept: ["image/*",".image/jpeg",".pdf","text/*"],
        // acceptFn: (file, options) => {
        //   const mimeFromExtension = options.mimeFromExtension(file.originalFile.name);
        //   if(options.acceptMime.length && !options.acceptMime.includes(mimeFromExtension)) {
        //     return Promise.reject('Cannot accept that file. Please upload txt, pdf or image file.')
        //   }
        //   return Promise.resolve()
        // },
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
    const user = JSON.parse(localStorage.getItem("user"))
    console.log(classes);
    if(!classes) {
      return console.log("ovo treba henldat los class code");
    }  const schoolClass = classes.filter(x => x.abbrevation === eneteredClassCode)

    console.log(schoolClass, " add news class");
    if(!schoolClass) {
      console.log("hendlat");
      return
    }
    fetch("http://localhost:4000/api/news",{
      method:"POST",
        body : JSON.stringify({
            url : `${url}`,
            text: `${enteredTextarea}`,
            title : `${enteredTitle}`,
            classes : schoolClass[0],
            // user : user
          }),        
      headers: {
        'Content-Type': 'application/json',
      },
        
    })
    .then(resolve => resolve.json())
    .then(data => 
      {

        console.log(data)
        if(data.statusCode === 401){
          setValidCode(false)
          setMessage(data.message)
          setTimeout(() => {
              setMessage("")
              setValidCode(true)
          }, (2000));
        }
      }
      )
      
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
    <Card className={styles.card}>
          {isValidCode && uploadFinished  && <p className={styles.suscesfull}>News is suscesfully added!</p>}
          {message && <p className={styles.suscesfull}>{message}</p>}
      <form onSubmit={handleFormSubmit}>
        <input type='text' className={styles.input} ref={classCodeRef} required={true} value={eneteredClassCode} onChange={classCodeHandler} placeholder='Enter Class Code'></input>
        <input type='text' className={styles.input} ref={inputTitleRef} required={true} value={enteredTitle} onChange={titleHandler} placeholder='Enter Title'></input>
        <textarea className={styles.textarea} cols={40} rows={11} maxLength={400} required={true} ref={textareaRef} value={enteredTextarea} onChange={textAreaHandler} placeholder='Enter news'></textarea>
        <p>{enteredTextarea.length}/400</p>
          <Button className={styles.picker} type="button" onClick={uploadFileHandler}>Upload aditional file</Button>
          {/* <Button type="button" onChange={resetHandler} >Reset</Button> */}
          <Button className={styles.inputBtn} type="submit">Confirm</Button> 
          {url ? <p>File suscesfully uploaded. Please click Confirm</p> : ""}
 
      </form>
 
    </Card>
  );
}

export default UploadFile;
