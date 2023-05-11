import { useEffect } from 'react';
import Card from '../../UI/Card';
import Button from '../../UI/Button';
const ClassesList = (props) => {
  let classesList = JSON.parse(localStorage.getItem('classList'));
  const refreshListHandler = () => {
    fetch('http://localhost:4000/api/classes/list')
      .then((resolve) => resolve.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem('classList', JSON.stringify(data));
        classesList = data;
        console.log('refreshovano');
      });
  };
  useEffect(() => {
    fetch('http://localhost:4000/api/classes/list')
      .then((resolve) => resolve.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem('classList', JSON.stringify(data));
        classesList = data;
      });
  }, []);

  return (
    <>
      <Card className={props.className}>
        <h1>Classes:</h1>
        {classesList.map((classItem) => (
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
        ))}
        <Button onClick={refreshListHandler}>Refresh</Button>
      </Card>
    </>
  );
};
export default ClassesList;
