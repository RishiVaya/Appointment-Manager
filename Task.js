import React from 'react'
import { FaPen, FaTrashAlt } from 'react-icons/fa'
import EditTask from './EditTask'

const Task = ({task, del, togg, editogg, changer, refresh}) => {
    return (
        <div className={`task ${task.reminder ? 'reminder': ''}`} onDoubleClick={() => togg(task.id)}>
            <h3>{task.text} < FaPen onClick={() => editogg(task.id)} 
            style={{cursor:'pointer', marginLeft: "auto"}}/>
            < FaTrashAlt onClick={() => del(task.id)} 
            style={{color:'red', cursor:'pointer'}}/></h3>
            <p>{task.day}</p>
            {task.edit && <EditTask editogg={editogg} tex={task.text} da={task.day} id={task.id} changer={changer} del={del} refresh={refresh} />}

        </div>
    )
}

export default Task
