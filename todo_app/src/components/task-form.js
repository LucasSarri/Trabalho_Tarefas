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
        },
        isSaving: false,
        message: res.message,
        visible: true
      });
    }catch(e) {
      this.setState({
        task: {
          description: '',
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
        <p>Descrição da tarefa</p>
        <input type="text" name="description" value={this.state.task.desc} disabled={this.state.isSaving} onChange={this.handleChange} />
        <button onClick={this.handleSubmit}>Criar Tarefa</button>
      </form>
      <Link to='/'>Voltar</Link>
    </div>
    );
  }
}