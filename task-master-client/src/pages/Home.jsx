import React, { useState } from "react";
import { Button, ButtonGroup, Input, Stack, Divider } from '@chakra-ui/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";

const Home = () => {
    const [login, setLogin] = useState({
        username: '',
        password: ''
    });

    const [register, setRegister] = useState({
        email: '',
        username: '',
        password: ''
    });



    return (
        <div className="mx-10 my-5 p-5">
            <h1 className="text-3xl font-medium text-center	mb-10">Login or sign up to start using Task-Master!</h1>
            <div className="grid grid-cols-2 gap-3">
                <div className="px-5 py-3 shadow-lg">
                    <h2 className="text-2xl font-medium">Login with your credentials</h2>
                    <form className="my-5">
                        <Stack spacing={3}>
                            <label className="w-full">Username</label>
                            <Input variant='flushed' className="w-full" name="username" placeholder="Your username" value={login.username} />
                            <label className="w-full">Password</label>
                            <Input variant='flushed' className="w-full" name="password" placeholder="Your password" type="password" value={login.password} />
                            <Button className="my-5" colorScheme='teal'>Login</Button>
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
                <div className="px-5 py-3 shadow-lg">
                    <h2 className="text-2xl font-medium">Sign up to the site</h2>
                    <form className="my-5">
                        <Stack spacing={3}>
                            <label className="w-full">Email</label>
                            <Input variant='flushed' className="w-full" name="email" type="email" placeholder="Your email" value={register.email} />
                            <label className="w-full">Username</label>
                            <Input variant='flushed' className="w-full" name="username" placeholder="Your username" value={register.username} />
                            <label className="w-full">Password</label>
                            <Input variant='flushed' className="w-full" name="password" placeholder="Your password" type="password" value={register.password} />
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
            </div>
        </div>
    )
};

export default Home;