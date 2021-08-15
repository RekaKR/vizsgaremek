import React from 'react'
import DeleteButton from '../../DeleteButton/DeleteButton'

const ToDo = ({ toDo, updateRecord, setDone, deleteRecord }) => {
  return (
    <div>
      <span>{toDo.task}</span>
      <input type="checkbox" checked={toDo.done ? true : false} onClick={() => updateRecord(toDo)} onChange={() => setDone(!toDo.done)} />

      <DeleteButton deleteRecord={deleteRecord} element={toDo} />
    </div>
  )
}

export default ToDo
