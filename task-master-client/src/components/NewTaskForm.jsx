import React, { useState } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    RadioGroup,
    HStack,
    Radio,
    Textarea,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Alert,
    AlertIcon,
    propNames,
} from '@chakra-ui/react';
import { AddIcon } from "@chakra-ui/icons";

const NewTaskForm = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [task, setTask] = useState({
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
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setTask(prevTask => {
            return {
                ...prevTask,
                [name]: value
            }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onAdd(task);
    }

    return (
        <div>
            <Button leftIcon={<AddIcon />} colorScheme='teal' onClick={onOpen} className='my-3'>New task</Button>

            <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                <ModalOverlay />
                <ModalContent>
                    {/* {props.message.text !== '' && <Alert status={props.message.status}>
                        <AlertIcon />
                        {props.message.text}
                    </Alert>} */}
                   
                    <ModalHeader>Add your new task
                    </ModalHeader>
                    <ModalCloseButton />
                    <form className="my-5" onSubmit={handleSubmit}>
                        <ModalBody>
                            <FormControl>
                                <FormLabel htmlFor="description">Task description</FormLabel>
                                <Textarea variant="flushed" name="description" id="description" placeholder="What is it that you need to do?" 
                                value={task.description} className="my-5" onChange={handleChange} />
                            </FormControl>
                            <FormControl>
                                <FormLabel htmlFor="urgency">Task urgency</FormLabel>
                                <RadioGroup name="urgency" value={task.urgency} onChange={handleChange}>
                                    <HStack spacing='24px' className="my-5">
                                        <Radio value='1'>Non urgent</Radio>
                                        <Radio value='2'>Low</Radio>
                                        <Radio value='3'>Normal</Radio>
                                        <Radio value='4'>Important</Radio>
                                        <Radio value='5'>Critical</Radio>
                                    </HStack>
                                </RadioGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel>
                                    <Input type="date" variant="flushed" id="dueDate" placeholder="What's your deadline for this task?" 
                                        name="dueDate" value={task.dueDate} className="my-5" onChange={handleChange}/>
                                </FormLabel>
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='red' mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button colorScheme='teal' type="submit">Add task</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default NewTaskForm;