import React, { useRef, useState, useEffect } from 'react';
import styles from './AddNews.module.css';
import * as filestack from 'filestack-js';
import Button from '../../UI/Button';
import Card from '../../UI/Card';
import { API_KEY } from '../../../firestack';
import Modal from '../../UI/Modal';
import Loader from '../../UI/Loader';
const client = filestack.init(API_KEY);


function UploadFile() {
  const [url, setUrl] = useState("");
  const [enteredTextarea, setEnteredTextarea] = useState("")
  const [eneteredClassCode, setClassCode] = useState("")
  const [ enteredTitle, setEnteredTitle ] = useState("")
  const [uploadFinished, setUploadFinished] = useState(false)
  const [inProgress, setInProgress] = useState(false)
  const [message , setMessage ] = useState("")
  const [isValidCode, setValidCode] = useState(true)
  const [isError, setIsError] = useState(null)
  const [classes, setClasses] = useState(JSON.parse(localStorage.getItem("MyClasses")))
  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    setInProgress(true)
    // fetch('http://localhost:4000/api/classes/myclasses',{
      fetch("https://teacher-aid.onrender.com/api/classes/myclasses", {

      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        id: `${user.id}`,
      }),
      headers:{
        'Content-Type': 'application/json',
      },
    })  
    .then((resolve) => resolve.json())
    .then((data) =>{
        localStorage.setItem('MyClasses', JSON.stringify(data));
        setClasses(data);
      });
      setInProgress(false)

  }, [user.id]);

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
            const url = res.filesUploaded[0].url
            setUrl(url)
        },
    };
    client.picker(options).open()
    
  };

  const handleFormSubmit = e=>{
    e.preventDefault()
    setInProgress(true)

    if(!eneteredClassCode && !enteredTextarea && !enteredTitle ){
      setInProgress(false)
        return setIsError({
          title: "All fields are required!",
          message: "One or more fields are empty"
        })
    }
    const user = JSON.parse(localStorage.getItem("user"))
    if(!classes) {
      setInProgress(false)

      return setIsError({
        title: 'Class code is not valid',
        message: 'Please input correct class code',
      });
    } 
     const schoolClass = classes.filter(x => x.abbrevation === eneteredClassCode.toUpperCase())

    if(schoolClass.length === 0) {
      setInProgress(false)
      return setIsError({
        title: 'Class is not found. ',
        message: 'Please check is class code valid or is class added',
      });
    }
    // fetch("http://localhost:4000/api/news",{
      fetch("https://teacher-aid.onrender.com/api/news", {

      method:"POST",
        body : JSON.stringify({
            url : `${url}`,
            text: `${enteredTextarea}`,
            title : `${enteredTitle}`,
            classId : schoolClass[0].id,
            school : schoolClass[0].school,
            schoolClass : schoolClass[0].schoolClass,
            departmant : schoolClass[0].departmant,
            city : schoolClass[0].city,
            user : user
          }),        
      headers: {
        'Content-Type': 'application/json',
      },
        
    })
    .then(resolve => resolve.json())
    .then(data => {

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
         setInProgress(false)

    }
  const classCodeHandler = e =>{
    e.preventDefault()
    setClassCode(e.target.value)
  }
  const errorHandler = () => {
    setIsError(null);
  };
  return (

    <Card className={styles.card}>
         {isError && (
        <Modal
          title={isError.title}
          message={isError.message}
          onConfirm={errorHandler}
        />
      )}
          {isValidCode && uploadFinished  && <p className={styles.suscesfull}>News is suscesfully added!</p>}
          {message && <p className={styles.suscesfull}>{message}</p>}
      <form onSubmit={handleFormSubmit}>
        <h2>Add news</h2>
        <input type='text' className={styles.input} ref={classCodeRef} required={true} value={eneteredClassCode} onChange={classCodeHandler} placeholder='Enter Class Code'></input>
        <input type='text' className={styles.input} ref={inputTitleRef} required={true} value={enteredTitle} onChange={titleHandler} placeholder='Enter Title'></input>
        <textarea className={styles.textarea} cols={40} rows={11} maxLength={400} required={true} ref={textareaRef} value={enteredTextarea} onChange={textAreaHandler} placeholder='Enter news'></textarea>
        <p>{enteredTextarea.length}/400</p>
          <Button className={styles.picker} type="button" onClick={uploadFileHandler}>Upload aditional file</Button>
          <Button className={styles.inputBtn} type="submit">Confirm</Button> 
          {url ? <p>File suscesfully uploaded. Please click Confirm</p> : ""}
 
      </form>
      {inProgress && <Loader />}

    </Card>
  );
}

export default UploadFile;
