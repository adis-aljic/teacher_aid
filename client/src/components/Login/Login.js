import { useContext, useRef, useState } from 'react';
import './Login.css';
import styles from '../UI/Modal.module.css';
import validatePassword from './passwordValidation';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import AuthContex from '../../store/Auth-ctx';
import 'cors';
import { useNavigate } from 'react-router-dom';
import {Watch} from "react-loader-spinner"

const Login = (props) => {
  const Navigate = useNavigate();
  const ctx = useContext(AuthContex);
  const [isError, setIsError] = useState(null);
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredRegEmail, setEnteredRegEmail] = useState('');
  const [enteredRegPassword, setEnteredRegPassword] = useState('');
  const [enteredFirstName, setEnteredFirstName] = useState('');
  const [enteredLastName, setEnteredLastName] = useState('');
  const [enteredSubject, setEnteredSubject] = useState('');
  const [forgotPass, setForgotPass] = useState(false);
  const [inputEmailForgetEmail, setInputEmailForgetEmail] = useState('');
  const [recievedNewPass, setRecievedNewPass] = useState(false);
  const [inProgress, setInProgress] = useState(false)

  const inputedEmail = useRef();
  const inputedPassword = useRef();
  const inputedRegEmail = useRef();
  const inputedRegPassword = useRef();
  const inputedFirstName = useRef();
  const inputedLastName = useRef();
  const inputedSubject = useRef();
  const inputedForgetPassEmailRef = useRef();

  const emailChangeHandler = () => {
    setEnteredEmail(inputedEmail.current.value);
  };
  const passwordChangeHandler = () => {
    setEnteredPassword(inputedPassword.current.value);
  };
  const emailRegChangeHandler = () => {
    setEnteredRegEmail(inputedRegEmail.current.value);
  };
  const passwordRegChangeHandler = () => {
    setEnteredRegPassword(inputedRegPassword.current.value);
  };
  const firstNameChangeHandler = () => {
    setEnteredFirstName(inputedFirstName.current.value);
  };
  const lastNameChangeHandler = () => {
    setEnteredLastName(inputedLastName.current.value);
  };
  const subjectChangeHandler = () => {
    setEnteredSubject(inputedSubject.current.value);
  };

  const forgotPasswordHandler = () => {
    setForgotPass(true);
  };
  const clearForgetenPasswordHandler = () => {
    setForgotPass(false);
  };
  const forgetPassEmailHandler = (e) => {
    setInputEmailForgetEmail(inputedForgetPassEmailRef.current.value);
  };
  const errorHandler = () => {
    setIsError(null);
  };

  const onRegistredSubmitHandler = (e) => {
    e.preventDefault();

    const email = inputedRegEmail.current.value;
    const password = inputedRegPassword.current.value;
    const first_name = inputedFirstName.current.value;
    const last_name = inputedLastName.current.value;
    const subject = inputedSubject.current.value;
    if (!email.includes('@')) {
      setIsError({
        title: 'Email is not valid',
        message: 'Please input correct email',
      });
      return;
    }
    if (first_name.length < 2 && last_name.length < 2) {
      setIsError({
        title: 'Invalid data format',
        message: 'First and Last name must be at least three characters long',
      });
      return;
    }

    if (!validatePassword(password)) {
      setIsError({
        title: 'Invalid password format',
        message:
          'Password must contain one capital letter, one special character, one number and at least 8 characters',
      });
      return;
    }
    fetch('http://localhost:4000/api/newuser', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`,
        firstName: `${first_name}`,
        lastName: `${last_name}`,
        subject: `${subject}`,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resolve) => resolve.json())
      .then((data) => {
        ctx.onRegistred(data);

        console.log(data);
      });
    setEnteredRegEmail('');
    setEnteredFirstName('');
    setEnteredLastName('');
    setEnteredRegPassword('');
    setEnteredSubject('');
    setIsError({
      title: 'Account created',
      message:
        'You account is suscesfuly created. You will recieved email with confirmation email. After confirmination you will be able to log in.',
    });
  };

  const onLoginSubmitHandler = (e) => {
    e.preventDefault();
    setInProgress(true)

    const email = inputedEmail.current.value;
    const password = inputedPassword.current.value;
    if (!email.includes('@')) {
      setIsError({
        title: 'Email is not valid',
        message: 'Please input correct email',
      });
      return;
    }

    if (!validatePassword(password)) {
      setIsError({
        title: 'Invalid password format',
        message:
          'Password must contain one capital letter, one special character, one number and at least 8 characters',
      });
      return;
    }

    fetch('http://localhost:4000/api/user/login', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resolve) => resolve.json())
      .then((data) => {
        console.log(data);
        ctx.onLogin(data);
        if (data.isAuth) {
          Navigate('/home');
        }
      });

    setEnteredEmail('');
    setEnteredPassword('');
    setInProgress(false)
  };

  const forgottenPassworOnSubmitdHandler = (e) => {
    e.preventDefault();
setInProgress(true)
fetch('http://localhost:4000/api/user/forgetenpassword', {
  method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        email: `${inputEmailForgetEmail}`,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resolve) => resolve.json())
      .then((data) => {
        console.log(data);
        setRecievedNewPass(true);
      });
      setForgotPass(false);
    setInputEmailForgetEmail('');
    setInProgress(false)
  };
  const clearRecievedNewPass = () => {
    setRecievedNewPass(false);
  };
  return (
    <>

    {inProgress &&    
    <Modal className="none" title="Loading ...">

    <Watch
  height="240"
  width="240"
  radius="48"
  color="blue"
  ariaLabel="watch-loading"
  wrapperStyle={{
zIndex: 10,
}}
wrapperClassName=""
visible={true}
/>
</Modal>
}
      {recievedNewPass && (
        <Modal
          title="Pasword Recovered"
          message="Please check your new password in email!"
          onConfirm={clearRecievedNewPass}></Modal>
      )}
      {forgotPass && (
        <Modal
          title="Forgoten password"
          message="After you enter your new email and new password you will recieved email with password"
          onConfirm={clearForgetenPasswordHandler}
          className={styles.none}>
          <input
            placeholder="email"
            type="email"
            value={inputEmailForgetEmail}
            ref={inputedForgetPassEmailRef}
            onChange={forgetPassEmailHandler}></input>
          <form onSubmit={forgottenPassworOnSubmitdHandler}>
            <Button type="submit">Send</Button>
          </form>
        </Modal>
      )}
      {isError && (
        <Modal
          title={isError.title}
          message={isError.message}
          onConfirm={errorHandler}
        />
      )}
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true"></input>

        <div className="signup">
          <form onSubmit={onRegistredSubmitHandler}>
            <label htmlFor="chk" aria-hidden="true">
              Sign up
            </label>

            <input
              type="email"
              name="email"
              placeholder="Email"
              ref={inputedRegEmail}
              value={enteredRegEmail}
              onChange={emailRegChangeHandler}></input>
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              ref={inputedFirstName}
              value={enteredFirstName}
              onChange={firstNameChangeHandler}></input>
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              ref={inputedLastName}
              value={enteredLastName}
              onChange={lastNameChangeHandler}></input>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              ref={inputedSubject}
              value={enteredSubject}
              onChange={subjectChangeHandler}></input>
            <input
              type="password"
              name="pswd"
              placeholder="Password"
              ref={inputedRegPassword}
              value={enteredRegPassword}
              onChange={passwordRegChangeHandler}></input>
            <Button type="submit">Sign up</Button>
          </form>
        </div>

        <div className="login">
          <form onSubmit={onLoginSubmitHandler}>
            <label htmlFor="chk" aria-hidden="true">
              Login
            </label>
            <input
              type="e-mail"
              name="e-mail"
              placeholder="Email"
              ref={inputedEmail}
              value={enteredEmail}
              onChange={emailChangeHandler}></input>
            <input
              ref={inputedPassword}
              type="password"
              name="password"
              placeholder="Password"
              value={enteredPassword}
              onChange={passwordChangeHandler}></input>
            <Button type="submit">Login</Button>
          </form>
          <button onClick={forgotPasswordHandler} className="forget_pass">
            Forgot password ?
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
