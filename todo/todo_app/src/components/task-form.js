import React from 'react';
import TaskModel from '../components/models/task-model';
import {Link} from 'gatsby';

export default class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: {
        desc: '',
        date: Date.now()
      },
      message: '',
      isSaving: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      ...this.state,
      task: {
        ...this.state.task,
        desc: event.target.value
      }
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      this.setState({
        ...this.state, 
        isSaving: true,
        task: {
          ...this.state.task,
          date: Date.now()
        }
      });
      let res = await TaskModel.create(this.state.task);
      this.setState({
        task: {
          desc: '',
          date: 0
        },
        isSaving: false,
        message: res.message
      });
    }catch(e) {
      console.log(e);
    }
  }

  render() {
    return (
    <div>
      {this.state.message === '' ? '' : <p>{this.state.message}</p>}
      <form>
        <p>Descrição da tarefa</p>
        <input type="text" value={this.state.task.desc} disabled={this.state.isSaving} onChange={this.handleChange} />
        <button onClick={this.handleSubmit}>Criar Tarefa</button>
      </form>
      <Link to='/'>Voltar</Link>
    </div>
    );
  }
}