import React from 'react';
import LogoutButtonStyle from './logout-button.module.css';
import { logout } from '../helpers/user-helper';
import { navigate } from 'gatsby';

export default class LogoutButton extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    logout(navigate);
  }

  render() {
    return (
      <p classname={LogoutButtonStyle.PARAGRAFO}>
        <button onClick={this.logout} classname={LogoutButtonStyle.BOTAO}>Logout</button>
      </p>
    );
  }
}