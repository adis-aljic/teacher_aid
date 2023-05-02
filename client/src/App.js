import './index.css';
import Footer from './components/UI/Footer';
import Header from './components/UI/Header';
import Login from './components/Login/Login';
import { useContext } from 'react';
import AuthContex from './store/Auth-ctx';
import Modal from './components/UI/Modal';
import User from './components/User/User';

function App() {
  const ctx = useContext(AuthContex);
  console.log(ctx);
  return (
    <>
      <Header>
        <h1>Welcome</h1>
      </Header>
      {ctx.isError && (
        <Modal
          title={ctx.isError.title}
          message={ctx.isError.message}
          onConfirm={ctx.errorHandler}
        />
      )}
      <main>
        {!ctx.isLogged && <Login />}
        {ctx.isLogged && <User user={ctx.user}></User>}
      </main>
      <Footer></Footer>
    </>
  );
}

export default App;
