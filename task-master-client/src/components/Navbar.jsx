import React from "react";
import logo from '../images/task-master-logo.png';
import { Button } from '@chakra-ui/react';
import DataService from '../services/DataService';

const Navbar = (props) => {

    const handleLogout = () => {
        DataService.logout();
        window.location.reload();
    }

    return (
        <div className="w-full bg-[#000000] h-2.5rem pt-3 columns-2">
            <img className="ml-5" src={logo} alt='Task Master logo'></img>
            {props.isLoggedIn && <Button className="float-right md:mt-7 sm:mt-3 mr-5" colorScheme='gray' onClick={handleLogout}>Logout</Button>}
        </div>
    )
};

export default Navbar;