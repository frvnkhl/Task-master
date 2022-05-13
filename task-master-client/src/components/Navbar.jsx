import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NoPage from '../pages/NoPage';
import logo from '../images/task-master-logo.png';
import { Button, ButtonGroup } from '@chakra-ui/react';
import DataService from '../services/DataService';

const Navbar = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(props.isLoggedIn);

    return (
        <div className="w-full bg-[#000000] h-2.5rem pt-3 columns-2">
            <img className="ml-5" src={logo} alt='Task Master logo'></img>
            {isLoggedIn && <Button className="float-right mr-10 mt-7" colorScheme='gray' onClick={DataService.logout()}>Logout</Button>}
        </div>
    )
};

export default Navbar;