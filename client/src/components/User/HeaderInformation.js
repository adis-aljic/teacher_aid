import classes from './HeaderInformation.module.css';

const HeaderInformation = (props) => {
  return (
    <div className={classes.container}>
      <p>
        Welcome {props.user.firstName} {props.user.lastName}
      </p>
      <p>Subject : {props.user.subject}</p>
    </div>
  );
};

export default HeaderInformation;
