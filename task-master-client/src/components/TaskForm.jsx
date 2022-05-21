import React, { useState } from "react";
import {
    ModalBody,
    FormControl,
    FormLabel,
    Textarea,
    RadioGroup,
    HStack,
    Radio,
    Input,
    ModalFooter,
    Button,
    Select,
} from "@chakra-ui/react";

const TaskForm = (props) => {
    const [task, setTask] = useState(props.task);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setTask(prevTask => {
            return {
                ...prevTask,
                [name]: value
            }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.isEdit ? props.onSubmit(task, task._id) : props.onSubmit(task);
    }


    return (
        <form className="my-5" onSubmit={handleSubmit}>
            <ModalBody>
                <FormControl>
                    <FormLabel htmlFor="description">Task description</FormLabel>
                    <Textarea variant="flushed" name="description" id="description" placeholder="What is it that you need to do?"
                        value={task.description} className="my-5" onChange={handleChange} />
                </FormControl>
                <FormControl as='fieldset'>
                    <FormLabel htmlFor="urgency">Task urgency</FormLabel>
                    <RadioGroup defaultValue={props.isEdit ? task.urgency.toString() : '3'}>
                        <HStack spacing='24px' className="my-5">
                            <Radio name="urgency" value='1' onChange={handleChange}>Non urgent</Radio>
                            <Radio name="urgency" value='2' onChange={handleChange}>Low</Radio>
                            <Radio name="urgency" value='3' onChange={handleChange}>Normal</Radio>
                            <Radio name="urgency" value='4' onChange={handleChange}>Important</Radio>
                            <Radio name="urgency" value='5' onChange={handleChange}>Critical</Radio>
                        </HStack>
                    </RadioGroup>
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="dueDate">Deadline for your task</FormLabel>
                        <Input type="date" variant="flushed" id="dueDate" placeholder="What's your deadline for this task?"
                        name="dueDate" value={props.isEdit ? task.dueDate.slice(0, 10) : task.dueDate} className="my-5" onChange={handleChange} />
                </FormControl>
                    {props.isEdit &&
                    <FormControl>
                        <FormLabel>What's the status of the task?</FormLabel>
                            <Select value={task.status} onChange={handleChange} name="status">
                                <option value='new'>new</option>
                                <option value='in progress'>in progress</option>
                                <option value='completed'>completed</option>
                                <option value='canceled'>canceled</option>
                            </Select>
                    </FormControl>
                    }
            </ModalBody>
            <ModalFooter>
                <Button colorScheme='red' mr={3} onClick={props.onClose}>
                    Close
                </Button>
                <Button colorScheme='teal' type="submit">{props.isEdit ? 'Edit task' : 'Add task'}</Button>
            </ModalFooter>
        </form>
    )
};

export default TaskForm;