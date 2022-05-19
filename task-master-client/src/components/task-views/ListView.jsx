import React from "react";
import TaskBox from "../TaskBox";

const ListView = (props) => {
    
    return(
        <div>
            {props.tasks?.map((task) => (
                <TaskBox key={task._id} task={task} />
            ))}
        </div>
    )
}

export default ListView;