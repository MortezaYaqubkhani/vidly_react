import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

//input liked
//raise on click event
const Like = (props) => {
  return (
    <FontAwesomeIcon
      onClick={props.onClick}
      style={{cursor: 'pointer'}}
      icon={props.liked ? ['fas', 'heart'] : ['far', 'heart']}
    />
  );
};

export default Like;
