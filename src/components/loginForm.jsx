import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
//
//this class actually extends the form class
class LoginForm extends Form {
  state = {
    data: {username: '', password: ''},
    errors: {},
  };
  //
  //schema for validation purposes
  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),
  };
  //

  doSubmit = () => {
    //call the server
    console.log('Submitted !');
  };
  //
  render() {
    //
    return (
      <div>
        {/* {errors} */}
        <h1>login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'text', 'Username', 'm.yaqub')}
          {this.renderInput('password', 'password', 'Password', '********')}
          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}

export default LoginForm;
