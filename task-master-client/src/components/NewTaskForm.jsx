import React, { useState } from "react";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    useDisclosure,
} from '@chakra-ui/react';
import { AddIcon } from "@chakra-ui/icons";
import TaskForm from "./TaskForm";

const NewTaskForm = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const task = useState({
        description: String,
        status: String,
        urgency: Number,
        dueDate: Date
    });

    return (
        <div>
            <Button width='95%' leftIcon={<AddIcon />} colorScheme='teal' onClick={onOpen} className='my-3'>New task</Button>

            <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add your new task
                    </ModalHeader>
                    <ModalCloseButton />
                    <TaskForm task={task} onClose={onClose} onSubmit={props.onAdd} isEdit={false} />
                </ModalContent>
            </Modal>
        </div>
    )
}

export default NewTaskForm;