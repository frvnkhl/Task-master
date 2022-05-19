import React, { useState } from "react";
import { Box, Text, Badge, Tag, } from "@chakra-ui/react";

const TaskBox = (props) => {

    const urgencyStatus = (level) => {
        switch (level) {
            case 1:
                return (<Badge className="m-2" colorScheme='green'>Non urgent</Badge>);
            case 2:
                return (<Badge className="m-2" colorScheme='teal'>Low</Badge>);
            case 3:
                return (<Badge className="m-2" colorScheme='yellow'>Normal</Badge>);
            case 4:
                return (<Badge className="m-2" colorScheme='orange'>Important</Badge>);
            case 5:
                return (<Badge className="m-2" colorScheme='red'>Critical</Badge>);
            default:
                break;
        }
    }

    const taskStatus = (status) => {
        switch (status) {
            case 'new':
                return 'blue';
            case 'in progress':
                return 'orange';
            case 'completed':
                return 'green';
            case 'canceled':
                return 'red';
            default:
                break;
        }
    }

    const taskDate = (dueDate) => {
        return dueDate < new Date() ? 'red' : 'cyan';
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-GB');
    }

    return (
        <Box w='100%' borderRadius='lg' boxShadow='lg' className="flex flex-col">
            <Text className="m-5" fontSize='md'>{props.task.description}</Text>
            <div className="flex flex-row">
                {urgencyStatus(props.task.urgency)}
                <Badge className="m-2" colorScheme={taskStatus(props.task.status)}>{props.task.status}</Badge>
                <Tag size='md' className="m-2" variant='subtle' colorScheme={taskDate(props.task.dueDate)}>{formatDate(props.task.dueDate)}</Tag>
            </div>
        </Box>
    )
}

export default TaskBox;