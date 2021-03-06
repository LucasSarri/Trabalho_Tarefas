import React from 'react';
import withDataSourceFetch from './data-source-fetch';
import TaskViewStyle from './task-view.module.css';
import TaskModel from './models/task-model';
import Message from './message';
import Task from './task';

const TaskView = (props) => {
  return (
    <div classname= {TaskViewStyle.DIV}>
      <Message message={props.message} />
      {props.isFetching ? <div>Carregando Tarefa</div> : <div>
        <Task data={props.data} />
      </div>}
    </div>
  );
};

export default withDataSourceFetch(TaskView, TaskModel.find.bind(TaskModel));