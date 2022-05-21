import React, { useEffect, useState } from "react";
import TaskBox from "../TaskBox";
import { Text, Select } from '@chakra-ui/react'

const ListView = (props) => {
    const [tasks, setTasks] = useState(props.tasks);
    const [order, setOrder] = useState('default');

    useEffect(() => {
        switch (order) {
            case 'default':
                setTasks(props.tasks);
                break;

            case 'urgency-1':
                setTasks(props.tasks.sort((a, b) => b.urgency - a.urgency));
                break;

            case 'urgency-2':
                setTasks(props.tasks.sort((a, b) => a.urgency - b.urgency));
                break;

            case 'deadline-1':
                setTasks(props.tasks.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate)));
                break;

            case 'deadline-2':
                setTasks(props.tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)));
                break;

            default:
                break;
        }
    });

    const handleChange = (event) => {
        setOrder(event.target.value);
    }

    return (
        <div>
            <div className="w-1/5 float-right my-5">
            <Text fontSize='sm' className="mb-2">Order by</Text>
                <Select variant='flushed' focusBorderColor="teal" size='sm' value={order} onChange={handleChange}>
                    <option value='default'>Default</option>
                    <option value='urgency-1'>Urgency (low - high)</option>
                    <option value='urgency-2'>Urgency (high - low)</option>
                    <option value='deadline-1'>Due date (sooner first)</option>
                    <option value='deadline-2'>Due date (later first)</option>
                </Select>
            </div>
            {tasks.map((task) => (
                <TaskBox key={task._id} task={task} onEdit={props.onEdit} onDelete={props.onDelete} />
            ))}
        </div>
    )
}

export default ListView;