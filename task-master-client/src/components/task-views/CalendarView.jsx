import React, { useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridWeek from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import { useDisclosure } from "@chakra-ui/react";
import TaskDetails from "../TaskDetails";

const CalendarView = (props) => {
    const [calendarEvents, setCalendarEvents] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedTask, setSelectedTask] = useState('');

    //map data to calendar
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
    }, [props]);

    //set task background colour based on its status
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

    //open a window with task details
    const showTaskDetails = (eventClick) => {
        onOpen();
        const requestedTask = props.tasks.filter(task => task._id === eventClick.event.id);
        setSelectedTask(requestedTask);
        console.log(requestedTask);
    }

    //handle change on the calendar between dates
    const handleChange = (eventClick) => {
        const taskId = eventClick.event.id;
        const taskNewDate = {
            dueDate: eventClick.event.start
        };

        props.onEdit(taskNewDate, taskId);
    }

    return (
        <div className="md:m-5">
            <div className="full-cal sm:w-full">
                <FullCalendar
                    headerToolbar={{
                        left: "prev,next",
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

            <TaskDetails isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                task={selectedTask}
                onDelete={props.onDelete}
                onEdit={props.onEdit}
            />
        </div>
    )
};

export default CalendarView;