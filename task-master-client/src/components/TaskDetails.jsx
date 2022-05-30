import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    useDisclosure,
    IconButton
} from "@chakra-ui/react";
import TaskForm from "./TaskForm";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const TaskDetails = (props) => {
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
    const taskUrgencyArr = ['non urgent', 'low', 'normal', 'important', 'critical'];

    //Formats date into a user-friendly format
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-GB', {
            weekday: "long",
            day: 'numeric',
            month: "long",
            year: "numeric",
        });
    }

    //Handles deletion of a task
    const handleDelete = () => {
        props.onDelete(props.task.id);
    }

    return (
        <div>
            <Modal isOpen={props.isOpen} onClose={props.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Task details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {
                            props.task !== '' &&
                            <div className="flex flex-col text-justify">
                                <div><b>Task:</b> {props.task[0].description}</div>
                                <div><b>Urgency:</b> {taskUrgencyArr[(props.task[0].urgency) - 1]}</div>
                                <div><b>Status:</b> {props.task[0].status}</div>
                                <div><b>Due date:</b> {formatDate(props.task[0].dueDate)}</div>
                            </div>
                        }
                    </ModalBody>
                    <ModalFooter>
                        <IconButton colorScheme='red' mr={3} onClick={handleDelete} icon={<DeleteIcon />} />
                        <IconButton colorScheme='teal' onClick={onEditOpen} icon={<EditIcon />} />
                        {
                            props.task !== '' &&
                            <Modal isOpen={isEditOpen} onClose={onEditClose} size='xl'>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Edit your task</ModalHeader>
                                    <ModalCloseButton />
                                    <TaskForm task={props.task[0]} onClose={onEditClose} onSubmit={props.onEdit} isEdit={true} />
                                </ModalContent>
                            </Modal>
                        }
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </div>
    )
}

export default TaskDetails