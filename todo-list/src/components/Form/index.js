import React from "react";
import { useState, useEffect, useRef } from "react";

function Form (props) {

  const [input, setInput] = useState("")
  const inputRef = useRef(null)

/*
After entering/reloading the page or when you click the button to edit a task,
the input is in focus, so you can write without bothering to click on the input box.
*/
  useEffect(() => {
    inputRef.current.focus()
  })


/* Create a task */
  const handleSubmit = e => {
    // The page will not reload
    e.preventDefault()
    
    // Will create an Id and save the text for each task submited
    props.onSubmit({
      id: Math.floor(Math.random() * 100000),
      text: input
    })

    // Will clear the input box
    setInput("")
  }

/* Capture the changes in the input */
  const handleChange = e => {
    setInput(e.target.value)
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      { props.edit ?
      ( // If props.edit == true, you are editing a task
        <>
          <input
            placeholder='Edite sua tarefa'
            value={input}
            onChange={handleChange}
            name='text'
            ref={inputRef}
            className='task-input input-edit'
            maxLength="40"
          />
          <button onClick={handleSubmit} className='task-button button-edit'>
            Concluir
          </button>
        </>
      ) : ( // If props.edit == false you are creating a task
        <>
          <input
            placeholder="Nova tarefa"
            value={input}
            name="text" 
            className="task-input"
            onChange={handleChange}
            ref={inputRef}
            maxLength="40"
          />
          <button className="task-button" onClick={handleSubmit}>
            Adicionar tarefa
          </button>
        </>
      )}
    </form>
  )
}

export default Form