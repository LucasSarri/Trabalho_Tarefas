import React from 'react';
import { handleLogin } from '../helpers/user-helper';
import { navigate } from 'gatsby';
import Message from '../components/message';
import loginStyle from './loginStyle.module.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: ''
      },
      message: props.location.state.message,
      visible: (props.location.state.message) ? true : false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDimiss = this.onDimiss.bind(this);
  }

  handleChange(e) {
    let newState = {...this.state};
    newState.user[e.target.name] = e.target.value;
    this.setState(newState);
  }

  onDimiss() {
    this.setState({...this.state, visible: !this.state.visible});
  }

  async handleSubmit(e) {
    e.preventDefault();
    try {
      await handleLogin(this.state.user);
      navigate('/');
    } catch(e) {
      this.setState({...this.state, message: e.message, visible: true});
    }
  }

  render() {
    return (
      <div>
        <Message message={this.state.message} show={this.state.visible} toggle={this.onDimiss} />
        <form >
          <div className={loginStyle.DIV}>
            <p className={loginStyle.Paragrafo}><input type="text" name="email"  value={this.state.user.email} onChange={this.handleChange} /></p>
            <p className={loginStyle.Paragrafo}><input type="password" name="password" value={this.state.user.password} onChange={this.handleChange} /></p>
            <p className={loginStyle.Paragrafo}><input type="button" value="Entrar" onClick={this.handleSubmit} /></p>
          </div>,   
        </form>
      </div>
    );
  }
}

export default Login;