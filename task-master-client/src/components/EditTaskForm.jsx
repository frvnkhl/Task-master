import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    useDisclosure,
    IconButton,
} from '@chakra-ui/react';
import { EditIcon, } from "@chakra-ui/icons";
import TaskForm from "./TaskForm";

const EditTaskForm = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const task = props.task;

    return (
        <div>
            <IconButton colorScheme='teal' size='md' icon={<EditIcon />} className="mt-4 mr-2 float-right" onClick={onOpen}></IconButton>
            <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit your task</ModalHeader>
                    <ModalCloseButton />
                    <TaskForm task={task} onClose={onClose} onSubmit={props.onEdit} isEdit={true} />
                </ModalContent>
            </Modal>
        </div>
    )
}

export default EditTaskForm;