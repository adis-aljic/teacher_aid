import './index.css';
import Footer from './components/UI/Footer';
import Header from './components/UI/Header';
import Login from './components/Login/Login';
import { useContext } from 'react';
import AuthContex from './store/Auth-ctx';
import Modal from './components/UI/Modal';
import HeaderInformation from './components/User/HeaderInformation';

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
      <main>{!ctx.isLogged && <Login />}</main>
      <Footer></Footer>
    </>
  );
}

export default App;
