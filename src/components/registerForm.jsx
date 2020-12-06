import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';

class RegisterForm extends Form {
    state = {
        data: {username: '', password: '', name: ''},
        errors: {},
      };
      //
      //schema for validation purposes
      schema = {
        username: Joi.string().required().label('Username').email(),
        password: Joi.string().required().label('Password').min(5),
        name: Joi.string().required().label('Name').min(5),
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
            <h1>Register</h1>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput('username', 'text', 'Username', 'm.yaqub')}
              {this.renderInput('password', 'password', 'Password', '********')}
              {this.renderInput('name', 'text', 'Name', 'Morteza')}
              {this.renderButton('Register')}
            </form>
          </div>
        );
      }
    }
 
export default RegisterForm;