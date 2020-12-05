import React, {Component} from 'react';
import Input from './common/input';
import Joi from 'joi-browser';

class LoginForm extends Component {
  state = {
    account: {username: '', password: ''},
    errors: {},
  };
  //
  //schema for validation purposes
  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),
  };
  //
  //to define validate method for input validation
  validate = () => {
    const options = {
      abortEarly: false,
    };
    const {error} = Joi.validate(this.state.account, this.schema, options);
    //
    //if there is no error
    if (!error) return null;
    //if there is an array
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };
  //
  //
  //validation method for on the fly inputs, with object destructuring
  validateProperty = ({name, value}) => {
    const obj = {[name]: value};
    const schema = {[name]: this.schema[name]};
    const {error} = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    //calling validate method to validate inputs
    const errors = this.validate();

    this.setState({errors: errors || {}});
    //in case we have any errors, we call emidiately
    if (errors) return;
  };
  //there is a object destructuring here
  handleChange = ({currentTarget: input}) => {
    //to validate inputs as user works on them
    const errors = {...this.state.errors};
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = {...this.state.account};
    account[input.name] = input.value;
    this.setState({account, errors});
  };
  //
  render() {
    //object destructuting
    const {account, errors} = this.state;
    //
    return (
      <div>
        {/* {errors} */}
        <h1>login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            lable="Username"
            value={account.username}
            onChange={this.handleChange}
            type="text"
            placeHoder="m.yaqubkhani"
            error={errors.username}
          />
          <Input
            name="password"
            lable="Password"
            value={account.password}
            onChange={this.handleChange}
            type="password"
            placeHoder="********"
            error={errors.password}
          />
          <button
          disabled={this.validate()} className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
