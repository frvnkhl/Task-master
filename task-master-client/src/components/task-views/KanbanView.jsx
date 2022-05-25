import React, { useState, useEffect } from 'react';
import Board from 'react-trello';

const KanbanView = (props) => {
    const [taskData, setTaskData] = useState({
        lanes: [
            {
                id: 'new',
                title: 'New',
                cards: []
            }, {
                id: 'in progress',
                title: 'In progress',
                cards: []
            }, {
                id: 'completed',
                title: 'Completed',
                cards: []
            }, {
                id: 'canceled',
                title: 'Canceled',
                cards: []
            }
        ]
    });


    useEffect(() => {
        const taskUrgencyArr = ['non urgent', 'low', 'normal', 'important', 'critical'];
        if (props.tasks && taskData) {
            console.log({ tasks: props.tasks, data: taskData });
            props.tasks.forEach(task => {
                const correctLane = taskData.lanes?.find(lane => lane.id === task.status);
                console.log({ lane: correctLane });
                if(correctLane && correctLane.cards?.findIndex(card => card.id === task.id) === -1) {
                    correctLane.cards?.push({
                        id: task._id,
                        title: `${task.description.slice(0, 15)}...`,
                        description: task.description,
                        label: taskUrgencyArr[(task.urgency) - 1]
                    });
                    console.log({ tasks: taskData, taskType: typeof (taskData) });
                }
            });
        }
    }, [props.tasks, taskData])

    return (
        <div>
        {
            typeof(taskData) === 'object' && 
                <Board data={taskData} />     
        }
        </div>
    )
}

export default KanbanView;