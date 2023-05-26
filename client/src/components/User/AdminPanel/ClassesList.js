import { useEffect, useState } from 'react';

import Button from '../../UI/Button';
import styles from './AdminPanel.module.css';

const ClassesList = (props) => {
  const [classes, setClasses] = useState([]);
 

  // let classesList = JSON.parse(localStorage.getItem('classList'));
  const user = JSON.parse(localStorage.getItem("user"))
  useEffect(() => {
    fetch('http://localhost:4000/api/classes/myclasses', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        id: `${user.id}`,
      }),     
      headers: {
        'Content-Type': 'application/json',
      },
    })  
    .then((resolve) => resolve.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem('classList', JSON.stringify(data));
        setClasses(data);
      });
  }, [user.id]);
  const refreshListHandler = () => {
    

    fetch('http://localhost:4000/api/classes/myclasses', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        id: `${user.id}`,
      }),     headers: {
        'Content-Type': 'application/json',
      },
    }) 
    .then((resolve) => resolve.json())
    .then((data) => {
        console.log(data);
        localStorage.setItem('myClasses', JSON.stringify(data));
        setClasses(data);
        console.log('refreshovano');
      });
  };

  return (
    <>
      <div className={styles.classList}>
        <div>
          <h1>Classes:</h1>
          {classes.length>0
            ? classes.map((classItem) => (
                <>
                  <li key={classItem.id}>
                    {classItem.school}
                    <br></br>
                    {classItem.schoolClass}-{classItem.departmant}
                    <br></br>
                    {classItem.abbrevation}
                  </li>
                  <br></br>
                </>
              ))
            : ''}
        </div>
        <div>
          <Button className={styles.btn} onClick={refreshListHandler}>Refresh</Button>
        </div>
      </div>
    </>
  );
};
export default ClassesList;
