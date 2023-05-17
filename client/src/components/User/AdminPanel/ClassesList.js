import { useEffect, useState } from 'react';

import Button from '../../UI/Button';
import Card from '../../UI/Card';
import styles from './AdminPanel.module.css';

const ClassesList = (props) => {
  const [classes, setClasses] = useState([]);

  // let classesList = JSON.parse(localStorage.getItem('classList'));
  const refreshListHandler = () => {
    fetch('http://localhost:4000/api/classes/list')
      .then((resolve) => resolve.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem('classList', JSON.stringify(data));
        setClasses(data);
        console.log('refreshovano');
      });
  };
  useEffect(() => {
    fetch('http://localhost:4000/api/classes/list')
      .then((resolve) => resolve.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem('classList', JSON.stringify(data));
        setClasses(data);
      });
  }, []);

  return (
    <>
      <div className={styles.classList}>
        <div>
          <h1>Classes:</h1>
          {classes
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
          <Button onClick={refreshListHandler}>Refresh</Button>
        </div>
      </div>
    </>
  );
};
export default ClassesList;
