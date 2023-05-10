import './index.css';
import Footer from './components/UI/Footer';
import Header from './components/UI/Header';
import Login from './components/Login/Login';
import { useContext } from 'react';
import AuthContex from './store/Auth-ctx';
import Modal from './components/UI/Modal';
import HeaderInformation from './components/User/HeaderInformation';
import AddClass from './components/User/AdminPanel/AddClass';
import Card from './components/UI/Card';
import AddStudent from './components/User/AdminPanel/AddStudents';
import classes from './App.module.css';
import ClassesList from './components/User/AdminPanel/ClassesList';
import RegistrerClass from './components/User/AdminPanel/RegistrerClass';
import { Routes, Route } from 'react-router-dom';
function App() {
  const ctx = useContext(AuthContex);
  console.log(ctx);
  return (
    <>
      <Header>
        {ctx.isLogged && (
          <HeaderInformation user={ctx.user}></HeaderInformation>
        )}
      </Header>
      {ctx.isError && (
        <Modal
          title={ctx.isError.title}
          message={ctx.isError.message}
          onConfirm={ctx.errorHandler}
        />
      )}
      <main>
        <Routes>
          <Route path="/login" element={!ctx.isLogged && <Login />}></Route>
          <Route path="/" element={!ctx.isLogged && <Login />}></Route>
          <Route
            path="/admin"
            element={
              ctx.isLogged &&
              ctx.navigation === 'add class' && (
                <>
                  <ClassesList className={classes.classList}></ClassesList>
                  <div className={classes.adminPanel}>
                    <AddClass></AddClass>
                    <RegistrerClass></RegistrerClass>
                    <AddStudent></AddStudent>
                  </div>
                </>
              )
            }></Route>
        </Routes>

        {ctx.isLogged && ctx.navigation === 'home' && <Card>home</Card>}
        {ctx.isLogged && ctx.navigation === 'curicculum' && (
          <Card>curicculum</Card>
        )}
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;
