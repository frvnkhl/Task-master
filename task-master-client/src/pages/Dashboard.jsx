import React, { useEffect, useState } from "react";
import DataService from "../services/DataService";
import ViewChange from "../components/ViewChange";
import { Divider, Text } from '@chakra-ui/react';
import NewTaskForm from "../components/NewTaskForm";
import TaskStats from "../components/TaskStats";
import ListView from "../components/task-views/ListView";

const Dashboard = (props) => {
    const [view, setView] = useState('list');
    const [user, setUser] = useState({
        username: String,
        email: String,
        tasks: [{
            description: String,
            status: String,
            urgency: Number,
            dueDate: Date
        }]
    });
    const [message, setMessage] = useState({
        text: String,
        status: String
    });

    useEffect(() => {
        const getUser = () => {
            DataService.getAllTasks(localStorage.getItem('JWT')).then(res => {
                setUser(res.data.user);
            });

        }
        getUser();
    }, []);

    const addTask = async (newTask) => {
        DataService.createNewTask(newTask, localStorage.getItem('JWT')).then(res => {
            setMessage({text: 'Task added successfully!', status: 'success'});
            setTimeout(() => {
                props.refresh();
            }, 2000);
        }).catch(err => {
            setMessage({
                text: 'Something went wrong',
                status: 'error'
            })
            console.log(err);
        });
    };

    return (
        <div className="mx-10 my-5">
            <h1 className="text-3xl font-semibold text-center md:m-10 sm:m-3">Dashboard of {user.username}</h1>
            <div className="grid-cols-2 grid-rows-1 md:flex sm:grid-cols-1">
                <div className="lg:w-1/5 md:w-1/4 sm:w-full">
                    <Divider orientation='vertical' className="float-right w-3" />
                    <ViewChange view={view} changeView={setView}/>
                    <NewTaskForm message={message} onAdd={addTask}/>
                </div>
                <div className="lg:w-4/5 md:w-3/4 sm:w-full">
                    <TaskStats tasks={user.tasks} />
                </div>
            </div>
            <div className="w-full">
                {user.tasks.length === 0 ? <Text fontSize='4xl' className="text-center my-10">No tasks to show. Add some tasks!</Text> : <ListView tasks={user.tasks} />}        
            </div>
        </div>
    )
};

export default Dashboard;