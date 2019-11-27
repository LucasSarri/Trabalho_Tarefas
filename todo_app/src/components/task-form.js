import React from 'react';
import TaskModel from '../components/models/task-model';
import {Link} from 'gatsby';
import Message from '../components/message';

export default class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {
        description: '',
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
    <div>
      <Message message={this.state.message} show={this.state.visible} toggle={this.onDimiss} />
      <form>
        <p>Descrição da Tarefa:</p>
        <input type="text" name="description" value={this.state.task.desc} disabled={this.state.isSaving} onChange={this.handleChange} />
        <p>Data Limite Tarefa:</p>
        <input type="date" name="deadline" value={this.state.task.desc} disabled={this.state.isSaving} onChange={this.handleChange} />
        <p>Grupo da Tarefa:</p>
        <input type="text" name="grupoTarefa" value={this.state.task.desc} disabled={this.state.isSaving} onChange={this.handleChange} />
        <p>
          <button onClick={this.handleSubmit}>Criar Tarefa</button>
        </p>
      </form>
      <Link to='/'>Voltar</Link>
    </div>
    );
  }
}