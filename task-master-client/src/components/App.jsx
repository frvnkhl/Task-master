import React from "react";
import Navbar from "./Navbar";
import { useState } from "react";
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div className="">
            <Navbar isLoggedIn={isLoggedIn} />
            {isLoggedIn ? <Dashboard /> : <Home />}
        </div>
    )
}

export default App;