import React, { useState } from "react";
import { Button, Input, Stack, Divider, Box } from '@chakra-ui/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import DataService from '../services/DataService';

const LoginForm = (props) => {
    const [login, setLogin] = useState({
        username: '',
        password: ''
    });

    const [message, setMessage] = useState({
        message: String,
        colour: String
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setLogin(prevLogin => {
            return { ...prevLogin, [name]: value }
        })
    };

    const handleUserSubmit = async (event) => {
        event.preventDefault();
        DataService.loginUser(login).then(res => {
            console.log(res);
            props.refresh();
        }).catch(err => {
            console.log(err);
            setMessage({
                message: err.response.data,
                colour: 'tomato'
            });
            setLogin({
                username: '',
                password: ''
            });
        });
    }

    return (
        <div className="px-5 py-3 shadow-lg">
            <h2 className="text-2xl font-medium">Login with your credentials</h2>
            <form className="my-5" onSubmit={handleUserSubmit}>
                <Box className="my-4 rounded-md font-semibold" bg={message.colour} w='100%' p={4} color='white'>
                    {message.message}
                </Box>
                <Stack spacing={3}>
                    <label className="w-full">Username</label>
                    <Input variant='flushed' className="w-full" name="username" placeholder="Your username" onChange={handleChange} value={login.username} />
                    <label className="w-full">Password</label>
                    <Input variant='flushed' className="w-full" name="password" placeholder="Your password" type="password" onChange={handleChange} value={login.password} />
                    <Button className="my-5" colorScheme='teal' type="submit">Login</Button>
                </Stack>
            </form>
            <Divider />
            <h2 className="text-2xl font-medium my-3">Or login with your socials!</h2>
            <div className="grid-rows-1">
                <div>
                    <Button className="my-5 mr-5" colorScheme='blue'><FontAwesomeIcon className="mr-2" icon={faGoogle} />Login with Google</Button>
                    <Button className="my-5" colorScheme='facebook'><FontAwesomeIcon className="mr-2" icon={faFacebook} />Login with Facebook</Button>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;