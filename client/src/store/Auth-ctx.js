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
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    if (Auth === user.token) {
      setIsLogged(true);
    }
  }, [Auth, user.token]);

  const loginHandler = (props) => {
    if (props) {
      setIsLogged(true);
      localStorage.setItem('Logged_in', props.token);
      localStorage.setItem('user', JSON.stringify(props));
    } else {
      setIsError({
        title: 'Unauthorized access',
        message: 'Wrong email or password',
      });
      return;
    }
  };
  const registredHandler = (props) => {
    setIsRegistred(props);
    console.log(isRegistred);
  };
  const errorHandler = () => {
    setIsError(null);
  };

  return (
    <AuthContex.Provider
      value={{
        isLogged,
        onLogin: loginHandler,
        onRegistred: registredHandler,
        isError,
        errorHandler,
        user,
      }}>
      {props.children}
    </AuthContex.Provider>
  );
};

export default AuthContex;
