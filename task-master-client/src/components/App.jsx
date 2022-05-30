import React from "react";
import Navbar from "./Navbar";
import { useState, useEffect, useCallback } from "react";
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import DataService from "../services/DataService";
import queryString from 'query-string';
import { useLocation, useNavigate } from 'react-router';
import jwt_decode from 'jwt-decode';
import { Spinner } from '@chakra-ui/react'

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState();
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    //Check the JWT token for authorisation
    const checkIfLoggedIn = useCallback(() => {
        //Check if token was passed from 3rd party login
        setLoading(true);
        const value = queryString.parse(location.search);
        if (value.token) {
            localStorage.setItem('JWT', value.token);
            setLoading(false);
            navigate('/');
        }
        //If not passed from the url, it will search for token in the local storage
        let accessToken = localStorage.getItem('JWT');
        if (accessToken === null || !isTokenValid(accessToken)) {
            setTimeout(() => setLoading(false), 2000);
            setIsLoggedIn(false);
        } else {
            setIsLoggedIn(true);
            DataService.getAllTasks(accessToken).then(res => {
                setUser(res.user);
            })
            setTimeout(() => setLoading(false), 2000);
        }
    },
        [location, navigate],
    )

    //Check the JWT token for authorisation in the first render
    useEffect(() => {
        checkIfLoggedIn();
    }, [checkIfLoggedIn])

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
        <div>
            <Navbar isLoggedIn={isLoggedIn} />
            {
                loading ?
                    <div className="grid align-center place-content-center mt-20">
                        <Spinner size='xl' color='teal' />
                    </div> :
                    isLoggedIn ? <Dashboard isLoggedIn={isLoggedIn} refresh={reload} user={user} changeLoginStatus={setIsLoggedIn} loading={loading} setLoading={setLoading} /> :
                        <Home isLoggedIn={isLoggedIn} refresh={reload} loading={loading} setLoading={setLoading} />

            }
        </div>
    )
}

export default App;