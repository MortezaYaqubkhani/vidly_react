import React from 'react';

const Genrelist = (props) => {
  //interface
  //list of the genres
  //active genre list
  const {
    items,
    textProperty,
    valueProperty,
    onItemSelect,
    selectedItem,
  } = props;

  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          style={{cursor: 'pointer'}}
          onClick={() => onItemSelect(item)}
          className={
            item === selectedItem ? 'list-group-item active' : 'list-group-item'
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

Genrelist.defaultProps = {
  textProperty: 'name',
  valueProperty: '_id',
};

export default Genrelist;
