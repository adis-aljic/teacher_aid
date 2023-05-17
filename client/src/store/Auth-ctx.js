import React, { useEffect, useState } from 'react';

const AuthContex = React.createContext({
  isLogged: false,

  setIsLogged: () => {},
  onLogin: () => {},
  onRegistred: () => {},
  isError: null,
  setIsError: () => {},
  navAddClass: false,
  navAddStudent: false,
  navAddNews: false,
  navRegisterClass: false,
  navUnregisterClass: false,
  navigationAddClassHandler: () => {},
  navigationCuricculumHandler: () => {},
  navigationHomeHandler: () => {},
  addStudentNavHandler: () => {},
  addClassNavHandler: () => {},
  RegisterClassNavHandler: () => {},
  UnregisterClassNavHandler: () => {},
  AddNewsNavHandler: () => {},
  adminPanelNav: '',
});

export const AuthContexProvider = (props) => {
  const [isError, setIsError] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [isRegistred, setIsRegistred] = useState(null);
  const [navigation, setNavigation] = useState('home');
  // const [navAddClass, setNavAddClass] = useState(false);
  // const [navAddStudent, setNavAddStudent] = useState(false);
  // const [navRegisterClass, setNavRegisterClass] = useState(false);
  // const [navUnregisterClass, setNavUnregisterClass] = useState(false);
  // const [navAddNews, setNavAddNews] = useState(false);
  const [adminPanelNav, setNav] = useState('');

  let Auth = localStorage.getItem('Logged_in');
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    if (Auth) {
      setIsLogged(true);
    }
  }, [Auth]);

  const loginHandler = (props) => {
    console.log(props);
    if (!props.isAuth) {
      setIsError({
        title: 'Unauthorized access',
        message: `${props.message}`,
      });
      return;
    } else {
      setIsLogged(true);
      localStorage.setItem('Logged_in', props.token);
      localStorage.setItem('user', JSON.stringify(props));
    }
  };
  const registredHandler = (props) => {
    setIsRegistred(props);
    console.log(isRegistred);
  };
  const errorHandler = () => {
    setIsError(null);
  };

  const logoutHandler = (props) => {
    localStorage.removeItem('user');
    localStorage.removeItem('Logged_in');
    localStorage.removeItem('classList');
    setIsLogged(false);
  };
  const navigationAddClassHandler = () => {
    setNavigation('add class');
  };
  const navigationHomeHandler = () => {
    setNavigation('home');
  };
  const navigationCuricculumHandler = () => {
    setNavigation('curicculum');
  };

  const addClassNavHandler = () => {
    // setNavAddClass(true);
    setNav('addClass');
  };
  const addStudentNavHandler = () => {
    // setNavAddStudent(true);
    setNav('addStudent');
  };
  const RegisterClassNavHandler = () => {
    // setNavRegisterClass(true);
    setNav('regClass');
  };
  const UnregisterClassNavHandler = () => {
    // setNavUnregisterClass(true);
    setNav('unRegClass');
  };
  const AddNewsNavHandler = () => {
    // setNavAddNews(true);
    setNav('addNews');
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
        onLogout: logoutHandler,
        navigationAddClassHandler,
        navigationCuricculumHandler,
        navigationHomeHandler,
        navigation,
        addClassNavHandler,
        addStudentNavHandler,
        AddNewsNavHandler,
        RegisterClassNavHandler,
        UnregisterClassNavHandler,
        // navAddClass,
        // navAddNews,
        // navAddStudent,
        // navRegisterClass,
        // navUnregisterClass,
        adminPanelNav,
      }}>
      {props.children}
    </AuthContex.Provider>
  );
};

export default AuthContex;
