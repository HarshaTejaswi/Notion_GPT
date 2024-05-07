import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import {AlreadyLoggedIn} from './pages/Login';
import Home from './pages/Home';
import Database from './pages/Database';
import Gpt from './pages/Gpt';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAccessTokenToLocalStorage } from './redux/slice';
import StoreContext from './pages/StoreContext';

export const config = {
  endpoint: "http://localhost:8082/v1",
};


function App() {
  const dispatch = useDispatch();
  const accessTokenInLocalStorage = useSelector((state) => state.localStorageReducer.access_token) || localStorage.getItem('access_token');

  // const [accessTokenInLocalStorage, setaccessTokenInLocalStorage] = useState(localStorage.getItem('access_token'))
  // console.log("accessTokenInLocalStorage : ", accessTokenInLocalStorage);

  useEffect(() => {

    dispatch(
      addAccessTokenToLocalStorage({
        access_token: accessTokenInLocalStorage
      })
    );

  }, [dispatch, accessTokenInLocalStorage]);

  return (
    <>
      <Router>
        <Routes>

          {
            accessTokenInLocalStorage === '' || accessTokenInLocalStorage === null
              ? (
                <>
                  <Route exact path="/" element={<Login />} />
                  <Route exact path="/home" element={<Home />} />
                </>
              )
              : (
                <>
                  <Route exact path="/" element={<AlreadyLoggedIn />} />
                  <Route exact path="/home" element={<Home />} />
                  <Route exact path="/home/database" element={<Database />} />
                  <Route exact path="/home/chatgpt" element={<Gpt />} />
                  <Route exact path="/home/storecontext" element={<StoreContext />} />
                </>
              )
          }

        </Routes>
      </Router>
    </>
  );
}

export default App;
