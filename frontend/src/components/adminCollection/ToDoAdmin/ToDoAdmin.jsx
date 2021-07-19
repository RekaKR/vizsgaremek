import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import ToDos from '../../toDoCollection/ToDos/ToDos';
import ToDoInput from '../ToDoInput/ToDoInput';

function toDoAdmin({ toDos }) {
  return (
    <div className="admin-accommodation">
      <ToDos toDos={toDos} />

      <ToDoInput />
    </div>
  );
}

export default toDoAdmin

/*
      <h3>Teendők</h3>

      <h4>Teendő lista</h4>
      {
        toDos && toDos.map(toDo =>
          <div key={uuidv4()}>
            <p>{toDo.task}</p>
            <h4>szerkesztés</h4>
          </div>)
      }
*/