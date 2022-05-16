import React from "react";
import LoginForm from '../components/LoginForm';
import RegisterForm from "../components/RegisterForm";

const Home = () => {
    

    return (
        <div className="mx-10 my-5 p-5">
            <h1 className="text-3xl font-medium text-center	mb-10">Login or sign up to start using Task-Master!</h1>
            <div className="grid grid-cols-2 gap-3">
                <LoginForm />
                <RegisterForm />
            </div>
        </div>
    )
};

export default Home;