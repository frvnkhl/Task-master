import React, { useState, useEffect, useCallback } from 'react';
import Board from 'react-trello';
import TaskDetails from '../TaskDetails';
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";

const KanbanView = (props) => {
    const [taskData, setTaskData] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [clickedTask, setClickedTask] = useState('');

    const populateLanes = useCallback(() => {
        setTaskData({
            lanes: [
                {
                    id: 'new',
                    title: 'New',
                    style: { backgroundColor: '#5949D5E0', color: '#fff', borderRadius: '10px', boxShadow: '-2px 5px 10px #00000080' },
                    cards: []
                }, {
                    id: 'in progress',
                    title: 'In progress',
                    style: { backgroundColor: '#FFAF1CE0', color: '#fff', borderRadius: '10px', boxShadow: '-2px 5px 10px #00000080' },
                    cards: []
                }, {
                    id: 'completed',
                    title: 'Completed',
                    style: { backgroundColor: '#0E8518E0', color: '#fff', borderRadius: '10px', boxShadow: '-2px 5px 10px #00000080' },
                    cards: []
                }, {
                    id: 'canceled',
                    title: 'Canceled',
                    style: { backgroundColor: '#D00202E0', color: '#fff', borderRadius: '10px', boxShadow: '-2px 5px 10px #00000080' },
                    cards: []
                }
            ]
        });
        if (props.tasks && taskData) {
            const taskUrgencyArr = ['non urgent', 'low', 'normal', 'important', 'critical'];
            props.tasks.forEach(task => {
                const correctLane = taskData.lanes?.find(lane => lane.id === task.status);
                console.log({ lane: correctLane });
                if (correctLane && !correctLane.cards?.includes(card => card.id === task.id)) {
                    correctLane.cards?.push({
                        id: task._id,
                        title: `${task.description.slice(0, 15)}...`,
                        description: task.description,
                        label: taskUrgencyArr[(task.urgency) - 1]
                    });
                    // console.log({ tasks: taskData, taskType: typeof (taskData) });
                }
            });
            console.log({ tasks: taskData });
        }
    }, [props.tasks, taskData])


    useEffect(() => {
        populateLanes();
    }, [populateLanes]);

const handleChange = (cardId, sourceLandId, targetLaneId, position, cardDetail) => {
    props.onEdit({ status: targetLaneId }, cardId);
}

const handleClick = (cardId, metadata, laneId) => {
    const card = props.tasks.filter(task => task._id === cardId)
    setClickedTask(card);
    console.log({ task: clickedTask });
    onOpen();
}

return (
    <div>
        {
            typeof (taskData) === 'object' &&
            <Board
                data={taskData} handleDragEnd={handleChange} cardDraggable={true} onCardClick={handleClick}
                style={{ backgroundColor: '#ffffff', paddingTop: '5%' }} cardStyle={{ borderRadius: '10px' }}
            />
        }
        <ChakraProvider>
            <TaskDetails isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                task={clickedTask}
                onDelete={props.onDelete}
                onEdit={props.onEdit}
            />
        </ChakraProvider>
    </div>
)
}

export default KanbanView;