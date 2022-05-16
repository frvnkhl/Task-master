import React, { useState } from "react";
import { Button, Input, Stack, Divider } from '@chakra-ui/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";

const RegisterForm = () => {
    const [register, setRegister] = useState({
        email: '',
        username: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setRegister(prevInput => {
            return { ...prevInput, [name]: value };
        })
    };

    return (
        <div className="px-5 py-3 shadow-lg">
            <h2 className="text-2xl font-medium">Sign up to the site</h2>
            <form className="my-5">
                <Stack spacing={3}>
                    <label className="w-full">Email</label>
                    <Input variant='flushed' className="w-full" name="email" type="email" placeholder="Your email" onChange={handleChange} value={register.email} />
                    <label className="w-full">Username</label>
                    <Input variant='flushed' className="w-full" name="username" placeholder="Your username" onChange={handleChange} value={register.username} />
                    <label className="w-full">Password</label>
                    <Input variant='flushed' className="w-full" name="password" placeholder="Your password" type="password" onChange={handleChange} value={register.password} />
                    <Button className="my-5" colorScheme='teal'>Sign up</Button>
                </Stack>
            </form>
            <div className="grid-rows-1">
                <div>
                    <Button className="my-5 mr-5" colorScheme='blue'><FontAwesomeIcon className="mr-2" icon={faGoogle} />Sign up with Google</Button>
                    <Button className="my-5" colorScheme='facebook'><FontAwesomeIcon className="mr-2" icon={faFacebook} />Sign up with Facebook</Button>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm;