import React, { useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridWeek from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
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
import TaskForm from "../TaskForm";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const CalendarView = (props) => {
    const [calendarEvents, setCalendarEvents] = useState([]);
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
    const { isOpen: isInfoOpen, onOpen: onInfoOpen, onClose: onInfoClose } = useDisclosure();
    const [selectedTask, setSelectedTask] = useState('');
    const taskUrgencyArr = ['non urgent', 'low', 'normal', 'important', 'critical'];

    useEffect(() => {
        const mappedEvents = [];
        props.tasks.forEach(task => {
            mappedEvents.push({
                id: task._id,
                start: task.dueDate,
                allDay: true,
                title: task.description,
                editable: true,
                eventStartEditable: true,
                extendedProps: {
                    urgency: task.urgency,
                    status: task.status
                },
                backgroundColor: setBackgroundColour(task.status)
            })
        })
        setCalendarEvents(mappedEvents);
       
    }, [props.tasks]);

    const setBackgroundColour = (status) => {
        switch (status) {
            case 'new':
                return 'CornflowerBlue';
            case 'in progress':
                return 'GoldenRod';
            case 'completed':
                return 'ForestGreen';
            case 'canceled':
                return 'tomato';
            default:
                break;
        }
    }

    const showTaskDetails = (eventClick) => {
        onInfoOpen();
        const requestedTask = props.tasks.filter(task => task._id === eventClick.event.id);
        setSelectedTask(requestedTask);
        console.log(requestedTask);
    }

    const handleDelete = () => {
        props.onDelete(selectedTask.id);
    }

    const handleChange = (eventClick) => {
        const taskId = eventClick.event.id;
        const taskNewDate = {
            dueDate: eventClick.event.start
        };

        props.onEdit(taskNewDate, taskId);
    }

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-GB', {
            weekday: "long",
            day: 'numeric',
            month: "long",
            year: "numeric",
        });
    }


    return (
        <div className="m-5">
            <div className="full-cal">
                <FullCalendar
                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek"
                    }}
                    plugins={[dayGridPlugin, timeGridWeek, interactionPlugin]}
                    initialView='dayGridMonth'
                    editable={true}
                    selectable={true}
                    droppable={true}
                    eventStartEditable={true}
                    events={calendarEvents}
                    eventClick={showTaskDetails}
                    eventDrop={handleChange}
                />
            </div>
            <Modal isOpen={isInfoOpen} onClose={onInfoClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Task details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {
                            selectedTask !== '' &&
                            <div className="flex flex-col text-justify">
                                <div><b>Task:</b> {selectedTask[0].description}</div>
                                <div><b>Urgency:</b> {taskUrgencyArr[(selectedTask[0].urgency) - 1]}</div>
                                <div><b>Status:</b> {selectedTask[0].status}</div>
                                <div><b>Due date:</b> {formatDate(selectedTask[0].dueDate)}</div>
                            </div>
                        }
                    </ModalBody>
                    <ModalFooter>
                        {/* <Button colorScheme='purple' mr={3} onClick={onInfoClose}>
                            Close
                        </Button> */}
                        <IconButton colorScheme='red' mr={3} onClick={handleDelete} icon={<DeleteIcon />}>
                            Delete task
                        </IconButton>
                        <IconButton colorScheme='teal' onClick={onEditOpen} icon={<EditIcon />}>Edit task</IconButton>
                        {
                            selectedTask !== '' &&
                            <Modal isOpen={isEditOpen} onClose={onEditClose} size='xl'>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Edit your task</ModalHeader>
                                    <ModalCloseButton />
                                    <TaskForm task={selectedTask[0]} onClose={onEditClose} onSubmit={props.onEdit} isEdit={true} />
                                </ModalContent>
                            </Modal>
                        }
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </div>
    )
};

export default CalendarView;