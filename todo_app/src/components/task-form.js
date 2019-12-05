import React from 'react';
import TaskModel from '../components/models/task-model';
import TaskFormStyle from './task-form.module.css';
import {Link} from 'gatsby';
import Message from '../components/message';

export default class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {
        description: '',
        isPriority: false,
        deadline:'',
        grupoTarefa:'',
      },
      message: '',
      isSaving: false,
      visible: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDimiss = this.onDimiss.bind(this);
  }

  handleChange(event) {
    let newState = {
      ...this.state
    };
    newState.task[event.target.name] =  event.target.value;
    this.setState(newState);
  }

  async handleChangeCheckBox(e) {
    let newState = {...this.state};
    newState.task[e.target.name] = !this.state.task[e.target.name];
    newState.message = await this._updateTask();
    newState.visible = true;
    this.setState(newState);
  }

  onDimiss() {
    this.setState({...this.state, visible: !this.state.visible});
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      await this.setState({
        ...this.state, 
        isSaving: true,
        task: {
          ...this.state.task
        }
      });
      let res = await TaskModel.create(this.state.task);
      this.setState({
        task: {
          description: '',
          deadline:'',
          isPriority: false,
          grupoTarefa:'',
        },
        isSaving: false,
        message: res.message,
        visible: true
      });
    }catch(e) {
      this.setState({
        task: {
          description: '',
          deadline:'',
          isPriority: false,
          grupoTarefa:'',
        },
        isSaving: false,
        message: e.message,
        visible: true
      });
    }
  }

  render() {
    return (
    <div classname={TaskFormStyle.DIV}>
      <Message message={this.state.message} show={this.state.visible} toggle={this.onDimiss} />
      <form classname={TaskFormStyle.FORM}>
        <p classname={TaskFormStyle.PARAGRAFO}>Descrição da Tarefa:</p>
        <input type="text" name="description" value={this.state.task.description} disabled={this.state.isSaving} onChange={this.handleChange} />
        <p classname={TaskFormStyle.PARAGRAFO}>Data Limite Tarefa:</p>
        <input type="date" name="deadline" value={this.state.task.deadline} disabled={this.state.isSaving} onChange={this.handleChange} />
        <p classname={TaskFormStyle.PARAGRAFO}>É uma prioridade ?</p>
        <input type="checkbox" name="isPriority" checked={this.state.task.isPriority} disabled={this.state.isSaving} onChange={this.handleChangeCheckBox} />
        <p classname={TaskFormStyle.PARAGRAFO}>
          <button onClick={this.handleSubmit} classname={TaskFormStyle.BOTAO}>Criar Tarefa</button>
        </p>
      </form>
      <Link to='/'>Voltar</Link>
    </div>
    );
  }
}