import React from 'react';

function Confirm(props) {

  return (
    <div className='confirm-box'>
      <p>{props.message}</p>
      <div className='confirm-button-container'>
        <button onClick={props.onConfirm} className="confirm-button">Sim</button>
        <button onClick={props.onCancel} className="confirm-button">Cancelar</button>
      </div>
    </div>
  )
}

export default Confirm;