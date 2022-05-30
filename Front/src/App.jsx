import './login.css';
import { Fragment } from 'react';
import { FetchApiContextProvider } from "./Context/FetchApiContext";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LoginPage from "./pages/login/Login";
import RegisterPage from "./pages/register/Register";
import HomePage from "./pages/home/Home";

function App() {
  return (
     <Fragment>
       <BrowserRouter>
       <FetchApiContextProvider>
       <Routes>
        <Route path="/" element ={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
      </Routes>
       </FetchApiContextProvider>
       </BrowserRouter>
    </Fragment>
  );
}

export default App;
