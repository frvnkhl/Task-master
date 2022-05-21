import React from "react";
import {
    Stat,
    StatLabel,
    StatNumber,
    StatGroup,
} from '@chakra-ui/react';

const TaskStats = (props) => {

    return(
        <div className="p-5 place-content-center">
            <StatGroup bg='aliceBlue' className="p-5 text-center rounded-lg drop-shadow-lg">
                <Stat>
                    <StatLabel>Tasks</StatLabel>
                    <StatNumber>{props.tasks.length}</StatNumber>
                </Stat>
                <Stat>
                    <StatLabel>Tasks to be done</StatLabel>
                    <StatNumber>{props.tasks.filter(task => task.status === 'new' || task.status === 'in progress').length}</StatNumber>
                </Stat>
                <Stat>
                    <StatLabel>Overdue tasks</StatLabel>
                    <StatNumber>{props.tasks.filter(task => (task.status === 'new' || task.status === 'in progress') && task.dueDate < new Date().toISOString()).length}</StatNumber>
                </Stat>
            </StatGroup>
        </div>
    )
}

export default TaskStats;