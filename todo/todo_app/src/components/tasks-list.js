import React from 'react'
import withDataSourceFetch from './data-source-fetch';
import TaskModel from './models/task-model';

const TasksList = (props) => {
  return (
    <div>
      {
        props.isFetching ? 'Buscando Tarefas' : 
        props.data.map((task) => (
          <li>{task.desc}</li>
        ))
      }
    </div>
  )
};

export default withDataSourceFetch(TasksList, TaskModel.list.bind(TaskModel));