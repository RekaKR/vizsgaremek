import React from 'react'

const ToDoItem = ({ toDo, updateRecord, setDone, deleteRecord }) => {
  return (
    <div>
      <span>{toDo.task}</span>
      <input type="checkbox" checked={toDo.done ? true : false} onClick={() => updateRecord(toDo)} onChange={() => setDone(!toDo.done)} />
      <button onClick={() => deleteRecord(toDo)}>xxx</button>
    </div>
  )
}

export default ToDoItem
