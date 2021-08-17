import React from 'react'
import DeleteButton from '../../elementsCollection/DeleteButton/DeleteButton'

const ToDo = ({ toDo, updateRecord, setDone, deleteRecord }) => {
  return (
    <div className="to-do-names">
      <div>
        <p>{toDo.task}</p>
        <input type="checkbox" checked={toDo.done ? true : false} onClick={() => updateRecord(toDo)} onChange={() => setDone(!toDo.done)} />
      </div>

      <DeleteButton deleteRecord={deleteRecord} element={toDo} />
    </div>
  )
}

export default ToDo
