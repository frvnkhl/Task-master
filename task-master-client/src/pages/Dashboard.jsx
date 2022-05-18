import React, { useEffect, useState } from "react";
import DataService from "../services/DataService";
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
} from '@chakra-ui/react'

const Dashboard = (props) => {
    const [user, setUser] = useState({
        username: String,
        email: String,
        tasks: [{
            description: String,
            status: {
                type: String,
                enum: ['new', 'in progress', 'complete', 'canceled'],
                default: 'new'
            },
            urgency: {
                type: Number,
                min: 1,
                max: 5,
                default: 3
            },
            dueDate: Date
        }]
    });

    useEffect(() => {
        const getUser = () => {
            DataService.getAllTasks(localStorage.getItem('JWT')).then(res => {
                setUser(res.data.user);
            });

        }
        getUser();
    }, []);

    return (
        <div className="mx-10 my-5">
            <h1 className="text-3xl font-semibold text-center">Dashboard of {user.username}</h1>
            <div className="p-5 place-content-center">
                <StatGroup bg='aliceBlue' className="p-5 text-center rounded-lg drop-shadow-lg">
                    <Stat>
                        <StatLabel>Tasks</StatLabel>
                        <StatNumber>{user.tasks.length}</StatNumber>
                    </Stat>
                    <Stat>
                        <StatLabel>Tasks to be done</StatLabel>
                        <StatNumber>{user.tasks.filter(task => task.status === 'new' || task.status === 'in progress').length}</StatNumber>
                    </Stat>
                    <Stat>
                        <StatLabel>Overdue tasks</StatLabel>
                        <StatNumber>{user.tasks.filter(task => (task.status === 'new' || task.status === 'in progress') && task.dueDate < new Date()).length}</StatNumber>
                    </Stat>
                </StatGroup>
            </div>
        </div>
    )
};

export default Dashboard;