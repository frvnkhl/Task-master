import React, { useEffect, useState } from "react";
import DataService from "../services/DataService";
import ViewChange from "../components/ViewChange";
import { Divider, Text, Heading } from '@chakra-ui/react';
import NewTaskForm from "../components/NewTaskForm";
import TaskStats from "../components/TaskStats";
import ListView from "../components/task-views/ListView";
import CalendarView from "../components/task-views/CalendarView";

const Dashboard = (props) => {
    const [view, setView] = useState('calendar');
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

    const getCurrentDate = () => {
        return new Date().toLocaleDateString('en-GB', {
            weekday: "long",
            day: 'numeric',
            month: "long",
            year: "numeric",
        });
    };

    const addTask = async (newTask) => {
        DataService.createNewTask(newTask, localStorage.getItem('JWT')).then(res => {
            setMessage({ text: 'Task added successfully!', status: 'success' });
            setTimeout(() => {
                props.refresh();
            }, 1000);
        }).catch(err => {
            setMessage({
                text: 'Something went wrong',
                status: 'error'
            })
            console.log(err);
        });
    };

    const editTask = async (newTask, id) => {
        DataService.editTask(id, newTask, localStorage.getItem('JWT')).then(res => {
            setMessage({ text: 'Task edited successfully!', status: 'success' });
            props.refresh();
        }).catch(err => {
            setMessage({
                text: 'Something went wrong',
                status: 'error'
            });
            console.trace(err);
        });
    };

    const deleteTask = async (id) => {
        DataService.deleteTask(id, localStorage.getItem('JWT')).then(res => {
            console.log({ id });
            setMessage({ text: 'Task deleted successfully!', status: 'success' });
            props.refresh();
        }).catch(err => {
            setMessage({
                text: 'Something went wrong',
                status: 'error'
            });
            console.trace(err);
        });
    };

    const renderView = () => {
        if (view === 'list') {
            return (<ListView tasks={user.tasks} onEdit={editTask} onDelete={deleteTask} refresh={props.refresh} />);
        } else {
            return (<CalendarView tasks={user.tasks} onEdit={editTask} onDelete={deleteTask} refresh={props.refresh} />);
        }
    }

    return (
        <div className="mx-10 my-5">
            <Heading as='h1' size='xl' className="text-center md:mt-10 md:mb-5 sm:m-3">Dashboard of {user.username}</Heading>
            <Heading as='h2' size='lg' className="text-center md:m-7 sm:m-3">Today is {getCurrentDate()}</Heading>
            <div className="grid-cols-2 grid-rows-1 md:flex sm:grid-cols-1">
                <div className="lg:w-1/5 md:w-1/4 sm:w-full">
                    <Divider orientation='vertical' className="float-right w-3" />
                    <ViewChange view={view} changeView={setView} />
                    <NewTaskForm message={message} onAdd={addTask} />
                </div>
                <div className="lg:w-4/5 md:w-3/4 sm:w-full">
                    <TaskStats tasks={user.tasks} />
                </div>
            </div>
            <div className="w-full">
                {user.tasks.length === 0 ?
                    <Text fontSize='4xl' className="text-center my-10">No tasks to show. Add some tasks!</Text> :
                    <div>
                        {renderView()}
                    </div>
                    }
            </div>
        </div>
    )
};

export default Dashboard;