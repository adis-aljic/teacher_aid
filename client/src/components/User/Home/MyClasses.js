import Card from '../../UI/Card';

const MyClasses = (props) => {
  let classes = JSON.parse(localStorage.getItem('classList'));
  let user = JSON.parse(localStorage.getItem('user'));

  console.log(classes);
  console.log(user);

  return (
    <Card className={props.className}>
      <h1>My Classes</h1>
      {classes.map((classItem) => {
        if (classItem.teacherId === user.id && classItem.selected) {
          <>
            <li key={classItem.id}>
              {classItem.school} - {classItem.city}
            </li>
            <br></br>
            {classItem.schoolClass}-{classItem.departmant}
            <br></br>
            {classItem.abbrevation}
            <br></br>
          </>;
        }
      })}
    </Card>
  );
};

export default MyClasses;
