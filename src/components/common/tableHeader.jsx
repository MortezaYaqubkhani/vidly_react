import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class TableHeader extends Component {
  //interface what is
  //columns, sort column object
  //onSort function
  raiseSort = (path) => {
    const sortColumn = {...this.props.sortColumn};
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc';
    else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }
    this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    //object destructuring
    const {sortColumn} = this.props;
    //
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === 'asc')
      return (
        <FontAwesomeIcon
          style={{cursor: 'pointer'}}
          icon={['fas', 'sort-up']}
        />
      );
    return (
      <FontAwesomeIcon
        style={{cursor: 'pointer'}}
        icon={['fas', 'sort-down']}
      />
    );
  };
  //
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              style={{cursor: 'pointer'}}
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.lable} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
