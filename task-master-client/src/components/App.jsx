import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import DataService from "../services/DataService";
import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router';
import jwt_decode from 'jwt-decode';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState();
    const [user, setUser] = useState();
    const location = useLocation();
    const navigate = useNavigate();

    //Check the JWT token for authorisation
    useEffect(() => {
        const componentWillMount = () => {
            const value = queryString.parse(location.search);
            if (value.token) {
                localStorage.setItem('JWT', value.token);
                navigate('/');
            }
            let accessToken = localStorage.getItem('JWT');
            if (accessToken === null || !isTokenValid(accessToken)) {
                setIsLoggedIn(false);
            } else {
                setIsLoggedIn(true);
                DataService.getAllTasks(accessToken).then(res => {
                    setUser(res.user);
                })
            }
        }
        componentWillMount()
    }, )

    //Check validity of JWT
    const isTokenValid = (token) => {
        const currentDate = new Date();
        const decodedToken = jwt_decode(token);

        return decodedToken.exp * 1000 > currentDate.getTime();
    }

    //Reload the app
    const reload = () => {
        window.location.reload();
    }

    return (
        <div className="">
            <Navbar isLoggedIn={isLoggedIn} />
            {isLoggedIn ? <Dashboard isLoggedIn={isLoggedIn} refresh={reload} user={user} changeLoginStatus={setIsLoggedIn} /> : <Home isLoggedIn={isLoggedIn} refresh={reload} />}
        </div>
    )
}

export default App;