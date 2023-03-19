import { useState } from 'react';
import './App.css';
import Task from './components/Task';
import Form from './components/Form';
import Confirm from './components/Confirm';

function App() {

  const [taskList, setTaskList] = useState([])
  const [deletedTask, setDeletedTask] = useState(-1)
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false)
  const [openClearConfirm, setOpenClearConfirm] = useState(false)

/* Adds a task to the list */
  const addTaskToTheList = task => {
    // Verifies if the task is blank
    if (!task.text) {
      return
    }

    // Updates the task list
    setTaskList([...taskList, task])
  }


/* Updates the selected task */
  const updateTask = (taskId, newValue) => {
    // Verifies if the new value is blank
    if (!newValue.text) {
      return
    }

    // Edits the task list
    setTaskList(prev => prev.map(item => (item.id === taskId ? newValue : item)))
  }


/* Removes a selected task from the list */
  const removeTask = id => {
    // Creates a new array with the itens that don't have the selected Id
    const removedTaskList = [...taskList].filter(task => task.id !== id)

    // Updates the task list
    setTaskList(removedTaskList)
  }

/* Removes all tasks from the list */
  const clearTaskList = () => {
    setOpenClearConfirm(false)
    setTaskList([])
  }


/* Marks a task as completed */
  const completeTask = id => {
    let updatedTaskList = taskList.map(task => {
      if (task.id === id) {
        task.isComplete = !task.isComplete
      }
      return task
    })
    // Updates the task list
    setTaskList(updatedTaskList)
  }


/* Confirm component functions */
  // Show the delete confirm container
  const handleConfirm = () => {
    setOpenDeleteConfirm(true)
  }

  // Show the clear all confirm container
  const handleClearConfirm = () => {
    setOpenClearConfirm(true)
  }

  // Removes the task and closes the confirm container
  const deletingConfirmed = () => {
    setOpenDeleteConfirm(false)
    removeTask(deletedTask)
  }

  // Cancel the removal of the task and closes the confirm container
  const deletingCanceled = () => {
    setOpenDeleteConfirm(false)
    setOpenClearConfirm(false)
  }

  

  return (
    <div className='todo-list-wrapper'>
      <div className='horizontal-line-2' style={{marginBottom: '5px', marginTop: '20px'}}></div>
      <div className='horizontal-line' style={{marginTop: '0px'}}></div>
      <h1>--- ToDo List ---</h1>
      <div className='horizontal-line'></div>
      <div className='horizontal-line-2'></div>

      <Form onSubmit={addTaskToTheList} />
      <Task
        taskList={taskList}
        completeTask={completeTask}
        updateTask={updateTask}
        handleConfirm={handleConfirm}
        setDeletedTask={setDeletedTask}
      />
      { // Confirms if the user really wants to delete that task
      openDeleteConfirm && (
        <div className='outside-confirm' onClick={deletingCanceled}>
          <Confirm
            message="Deseja deletar esta tarefa?"
            onConfirm={deletingConfirmed}
            onCancel={deletingCanceled}
          />
        </div>
      )}
      <button className='clear-button' onClick={handleClearConfirm}>
        Deletar todas as tarefas
      </button>
      { // Confirms if the user really wants to delete that task
      openClearConfirm && (
        <div className='outside-confirm' onClick={deletingCanceled}>
          <Confirm
            message="Deseja deletar todas as tarefas?"
            onConfirm={clearTaskList}
            onCancel={deletingCanceled}
          />
        </div>
      )}
    </div>
  );
}

export default App;
