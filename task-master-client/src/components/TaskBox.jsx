import React from "react";
import { Box, Text, Badge, Tag, IconButton } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import EditTaskForm from "./EditTaskForm";

const TaskBox = (props) => {
    const { description, status, urgency, dueDate } = props.task;

    //Returns urgency level badge
    const urgencyStatus = (level) => {
        switch (level) {
            case 1:
                return (<Badge className="m-2 py-1" borderRadius='md' colorScheme='green'>Non urgent</Badge>);
            case 2:
                return (<Badge className="m-2 py-1" borderRadius='md' colorScheme='teal'>Low</Badge>);
            case 3:
                return (<Badge className="m-2 py-1" borderRadius='md' colorScheme='yellow'>Normal</Badge>);
            case 4:
                return (<Badge className="m-2 py-1" borderRadius='md' colorScheme='orange'>Important</Badge>);
            case 5:
                return (<Badge className="m-2 py-1" borderRadius='md' colorScheme='red'>Critical</Badge>);
            default:
                break;
        }
    }

    //Returns colour of the status badge
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

    //Returns date badge colour based on whether the due date already passed
    const taskDate = (dueDate) => {
        return dueDate < new Date().toISOString() ? 'red' : 'cyan';
    }

    //Formats date into a user-friendly format
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-GB', {
            weekday: "short",
            day: 'numeric',
            month: "long",
            year: "numeric",
        });
    }

    //Handles deletion of the task
    const handleDelete = () => {
        console.log({ task: props.task });
        props.onDelete(props.task._id);
    }

    return (
        <Box w='100%' borderRadius='lg' boxShadow='lg' className="flex flex-row">
            <div className="flex flex-col w-[95%]">
                <Text className="m-5" fontSize='md'>{description}</Text>
                <div className="flex flex-row">
                    {urgencyStatus(urgency)}
                    <Badge className="my-2 py-1" borderRadius='md' colorScheme={taskStatus(status)}>{status}</Badge>
                    <Tag size='md' className="m-2" variant='subtle' colorScheme={taskDate(dueDate)}>{formatDate(dueDate)}</Tag>
                </div>
            </div>
            <div className="flex flex-col w-[5%] justify-between">
                <EditTaskForm task={props.task} onEdit={props.onEdit} />
                <div>
                    <IconButton colorScheme='red' size='md' icon={<DeleteIcon />} className="mb-1 mr-2 float-right" onClick={handleDelete}></IconButton>
                </div>
            </div>
        </Box>
    )
}

export default TaskBox;