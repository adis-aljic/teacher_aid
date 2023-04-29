import React, { useEffect, useState } from 'react';
const AuthContex = React.createContext({
  isLogged: false,

  setIsLogged: () => {},
  onLogin: () => {},
  onRegistred: () => {},
  isError: null,
  setIsError: () => {},
});

export const AuthContexProvider = (props) => {
  const [isError, setIsError] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [isRegistred, setIsRegistred] = useState(null);

  const Auth = localStorage.getItem('Logged_in');

  useEffect(() => {
    if (Auth === '1') {
      setIsLogged(true);
    }
  }, [Auth]);

  const loginHandler = (email, password) => {
    if (email === 'adis.qm@gmail.com' && password === 'Wireless123%') {
      setIsLogged(true);
      localStorage.setItem('Logged_in', '1');
      console.log(email, password);
    } else {
      setIsError({
        title: 'Unauthorized access',
        message: 'Wrong email or password',
      });
      return;
    }
  };
  const registredHandler = (obj) => {
    setIsRegistred(obj);
    console.log(isRegistred);
  };
  const errorHandler = () => {
    setIsError(null);
  };

  return (
    <AuthContex.Provider
      value={{
        isLogged: isLogged,
        onLogin: loginHandler,
        onRegistred: registredHandler,
        isError: isError,
        errorHandler: errorHandler,
      }}>
      {props.children}
    </AuthContex.Provider>
  );
};

export default AuthContex;
