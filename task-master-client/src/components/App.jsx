import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import DataService from "../services/DataService";
import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState();
    const [user, setUser] = useState();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const componentWillMount = () => {
            const value = queryString.parse(location.search);
            console.log(value);
            if (value.token) {
                localStorage.setItem('JWT', value.token);
                navigate('/');
            }
            let accessToken = localStorage.getItem('JWT');
            if (accessToken === null) {
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

    const reload = () => {
        window.location.reload();
    }

    return (
        <div className="">
            <Navbar isLoggedIn={isLoggedIn} />
            {isLoggedIn ? <Dashboard isLoggedIn={isLoggedIn} user={user} changeLoginStatus={setIsLoggedIn} /> : <Home isLoggedIn={isLoggedIn} refresh={reload} />}
        </div>
    )
}

export default App;