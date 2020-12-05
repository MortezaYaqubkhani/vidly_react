import React from 'react';

const Input = ({name, lable, value, onChange, type, error, placeHoder}) => {
  //object destructuring
  return (
    <div className="form-group">
      <lable htmlFor={name}>{lable}</lable>
      <input
        autoFocus
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        type={type}
        className="form-control"
        placeholder={placeHoder}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
