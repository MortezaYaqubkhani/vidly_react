import React, {Component} from 'react';
import _ from 'lodash';

class TableBody extends Component {
  //method for decision on how to render cells
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item.path + (column.path || column.key);
  };
  //
  render() {
    //object restructuring
    const {data, columns} = this.props;
    //
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id || item.key} style={{cursor: 'pointer'}}>
            {columns.map((column) => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );

  }
}

export default TableBody;
