import React, { useState } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { FiCheckSquare } from 'react-icons/fi'
import { RiCheckboxBlankLine } from 'react-icons/ri';
import Form from '../Form';


const Task = ({ taskList, completeTask, updateTask, handleConfirm, setDeletedTask }) => {

  /* Identifies if you are editing a task, and if true, what's it's Id */
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  })


  /* Updates an edited task with a new Id and the decided upon new value */
  const submitUpdate = value => {
    updateTask(edit.id, value)
    setEdit({
      id: null,
      value: ''
    })
  }


  /* Shows the input box to edit the decided task */
  if (edit.id) {
    return <Form edit={edit} onSubmit={submitUpdate} />
  }


  return (
    <div className={'task-box-container'} style={{}}>
      {taskList.map((task, index) => (
      /* Differentiate a completed task from an incomplete one by changing it's class */
      <div
        className={task.isComplete ? 'task-box complete' : 'task-box'}
        key={index}
      >
        {/* Adds the correct icon depending if the task is completed or not */}
        <div className='icons'
          onClick={() => completeTask(task.id)}
          style={{cursor: 'pointer'}}
        >
          {
            task.isComplete ? ( // If true, adds the completed checkbox icon
              <FiCheckSquare
                className='complete-icon'
              />
            ) : ( // If false, adds the blank checkbox icon
              <RiCheckboxBlankLine
                className='complete-icon'
              />
            )
          }
        </div>

        {/* Shows a task and changes it's state (completed or not) by clicking on it */}
        <div key={task.id} onClick={() => completeTask(task.id)} style={{cursor: 'pointer'}}>
          {task.text}
        </div>

        {/* Adds the icons to edit and to delete a task */}
        <div className='icons' style={{cursor: 'pointer'}}>
          <TiEdit
            onClick={() => setEdit({ id: task.id, value: task.text })}
            className='edit-icon'
          />
          <RiCloseCircleLine
            onClick={() => {
              handleConfirm()
              setDeletedTask(task.id)
            }}
            className='delete-icon'
          />
        </div>
      </div>
    ))}
  </div>
  )
}

export default Task;