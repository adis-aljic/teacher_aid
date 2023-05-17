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
import MyClasses from './components/User/Home/MyClasses';
import Navigation from './components/User/AdminPanel/Navigation';
import UploadFile from './components/User/FileUpload/UploadFile';
import UnregisterClass from "./components/User/AdminPanel/UnregisterClass"
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
                <div className="mainAdminPanel">
                  <div>
                    <Navigation></Navigation>
                  </div>

                  <div className={classes.container}>
                    <div>
                      <ClassesList></ClassesList>
                    </div>
                    <div className={classes.containerAdminPanel}>
                      {ctx.adminPanelNav === 'addClass' && (
                        <AddClass></AddClass>
                      )}
                      {ctx.adminPanelNav === 'regClass' && (
                        <RegistrerClass></RegistrerClass>
                      )}{' '}
                      {ctx.adminPanelNav === "unRegClass" &&  <UnregisterClass></UnregisterClass>}
                      {ctx.adminPanelNav === 'addStudent' && (
                        <AddStudent></AddStudent>
                      )}
                    </div>
                  </div>
                </div>
              )
            }></Route>
          <Route
            path="home"
            element={
              ctx.isLogged &&
              ctx.navigation === 'home' && (
                <>
                  <div className={classes.home}>
                    <MyClasses className={classes.classList}></MyClasses>
                    <UploadFile></UploadFile>
                  </div>
                </>
              )
            }></Route>
          {ctx.isLogged && ctx.navigation === 'curicculum' && (
            <Card>curicculum</Card>
          )}
        </Routes>
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;
