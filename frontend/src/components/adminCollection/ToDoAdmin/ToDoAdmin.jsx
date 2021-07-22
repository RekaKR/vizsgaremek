import React from 'react'
import ToDos from '../../toDoCollection/ToDos/ToDos';
import ToDoInput from '../ToDoInput/ToDoInput';

function toDoAdmin({ toDos }) {
  return (
    <div className="admin-to-dos">
      <ToDos toDos={toDos} />

      <ToDoInput />
    </div>
  );
}

export default toDoAdmin