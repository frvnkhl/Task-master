import React, { useState } from "react";
import { Button, Input, Stack, Box } from '@chakra-ui/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import DataService from "../services/DataService";

const RegisterForm = () => {
    const [register, setRegister] = useState({
        email: '',
        username: '',
        password: ''
    });
    const [message, setMessage] = useState({
        message: String,
        colour: String
    });



    const handleChange = (event) => {
        const { name, value } = event.target;

        setRegister(prevInput => {
            return { ...prevInput, [name]: value };
        })
    };

    const handleUserSubmit = async (event) => {
        event.preventDefault();
        DataService.registerUser(register).then(res => {
            // console.log(res);
            setMessage({
                message: res.data.message,
                colour: 'forestGreen'
            });
        }).catch(err => {
            // console.log(err);
            setMessage({
                message: err.response.data,
                colour: 'tomato'
            })
        })
        setRegister({
            email: '',
            username: '',
            password: ''
        })
    };

    const handleGoogleSignUp = async () => {
        window.open('http://localhost:6299/auth/google', '_self');
    }

    const handleFacebookSignUp = async () => {
        window.open('http://localhost:6299/auth/facebook', '_self');
    }

    return (
        <div className="px-5 py-3 shadow-lg">
            <h2 className="text-2xl font-medium">Sign up to the site</h2>
            <form className="my-5" onSubmit={handleUserSubmit}>
                <Box className="my-4 rounded-md font-semibold" bg={message.colour} w='100%' p={4} color='white'>
                    {message.message}
                </Box>
                <Stack spacing={3}>
                    <label className="w-full">Email</label>
                    <Input variant='flushed' className="w-full" name="email" type="email" placeholder="Your email" onChange={handleChange} value={register.email} />
                    <label className="w-full">Username</label>
                    <Input variant='flushed' className="w-full" name="username" placeholder="Your username" onChange={handleChange} value={register.username} />
                    <label className="w-full">Password</label>
                    <Input variant='flushed' className="w-full" name="password" placeholder="Your password" type="password" onChange={handleChange} value={register.password} />
                    <Button className="my-5" type='submit' colorScheme='teal'>Sign up</Button>
                </Stack>
            </form>
            <div className="grid-rows-1">
                <div>
                    <Button className="my-5 mr-5" colorScheme='blue' onClick={handleGoogleSignUp}><FontAwesomeIcon className="mr-2" icon={faGoogle} />Sign up with Google</Button>
                    <Button className="my-5" colorScheme='facebook' onClick={handleFacebookSignUp}><FontAwesomeIcon className="mr-2" icon={faFacebook} />Sign up with Facebook</Button>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm;