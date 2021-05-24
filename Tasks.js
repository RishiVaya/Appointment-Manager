import React from 'react'
import Task from './Task'
//import EditTask from './EditTask'

const Tasks = ({tasks, del, togg, editogg, changer, refresh}) => {
    return (
        <>
            {tasks.map( (task) => (
                <Task key={task.id} task={task} del={del} editogg={editogg} togg={togg} changer={changer} refresh = {refresh}
                //{task.edit && <EditTask adder={addTask}/>}
                />
            ))}
        </>
    )
}

export default Tasks
