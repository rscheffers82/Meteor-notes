import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';

export class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }

  onSubmit(e) {
    e.preventDefault();
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    if (password.length < 9) {
      return this.setState({ error: 'Password must be at least 9 characters long' });
    }

    this.props.createUser({email , password}, (err) => {
      // console.log('Singup callback', err);
      let error = err ? err.reason : '';
      this.setState({ error });
    });
  }

  render() {
    return(
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Join</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}

          <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
            <input type="email" ref="email" name="email" placeholder="Email"/>
            <input type="password" ref="password" name="password" placeholder="Password" />
            <button className="button">Create Account</button>
          </form>

          <Link to="/">Already have an account?</Link>
        </div>
      </div>
    );
  }
};

Signup.propTypes = {
  createUser: PropTypes.func.isRequired
};

export default createContainer(() => {
  return {
    createUser: Accounts.createUser
  }
}, Signup);
