import Card from '../UI/Card';

const User = (props) => {
  return (
    <Card>
      <p>First Name : {props.user.firstName}</p>
      <p>Last Name : {props.user.lastName}</p>
      <p>Email : {props.user.email}</p>
    </Card>
  );
};

export default User;
