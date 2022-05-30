import React, { useState, useEffect, useCallback } from 'react';
import Board from 'react-trello';
import TaskDetails from '../TaskDetails';
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";

const KanbanView = (props) => {
    const [taskData, setTaskData] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [clickedTask, setClickedTask] = useState('');

    //populate data at each change/refresh
    const populateLanes = useCallback(() => {
        //set initial value for the data for board
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
        console.log({tasks: taskData});
        //check if there are tasks to map & then look up tasks
        if (props.tasks) {
            const taskUrgencyArr = ['non urgent', 'low', 'normal', 'important', 'critical'];
            props.tasks.forEach(task => {
                const correctLane = taskData.lanes?.find(lane => lane.id === task.status);
                console.log({ lane: correctLane });
                //map tasks into the cards array
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

    //populate data in the beginning
    useEffect(() => {
        populateLanes();
    }, [populateLanes]);
    
    //manage a change of the lanes
    const handleChange = (cardId, sourceLandId, targetLaneId, position, cardDetail) => {
        props.onEdit({ status: targetLaneId }, cardId);
    }
    //open a window with the task details
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