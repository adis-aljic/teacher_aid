import { useEffect, useState } from 'react';
import Card from '../../UI/Card';
const ClassesList = (props) => {
  const [classesList, setClassesList] = useState();
  useEffect(() => {
    // const fetch = fetch('http://localhost:4000/api/classes/list')
    //   .then((resolve) => resolve.json())
    //   .then((data) => {
    //     console.log(data);
    //     setClassesList(data);
    //   });
    const Fetchdata = async () => {
      const response = await fetch('http://localhost:4000/api/classes/list');
      const data = await response.json();
      setClassesList(data);
    };
    Fetchdata();
  }, []);
  console.log(classesList);
  return (
    <Card>
      {classesList.map((classItem) => (
        <li>{classItem}</li>
      ))}
    </Card>
  );
};
export default ClassesList;
