import React, { Component } from 'react';

export default class TodoItem extends Component {
  render() {
    const { items, handleDelete, handleEdit, handleAddSubtask } = this.props;

    return (
      <React.Fragment>
        {items.length || Object.keys(items).length
          ? items.map((item, idx) => (
              <tr key={idx}>
                <td className='col-md-3 text-info'>
                  {item.title ? item.title : null}
                </td>
                <td className='col-md-3'>
                  <i
                    className='fas fa-pen text-warning'
                    onClick={() => handleEdit(item.id)}
                  ></i>
                </td>
                <td className='col-md-3'>
                  <i
                    className='fas fa-trash text-danger'
                    onClick={() => handleDelete(item.id)}
                  ></i>
                </td>
                <td className='col-md-3'>
                  <i
                    className='fas fa-plus text-success'
                    onClick={() => handleAddSubtask(item.id, items)}
                  ></i>
                </td>
                {Object.keys(item.subtasks).length ? (
                  <TodoItem
                    items={item.subtasks}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    handleAddSubtask={handleAddSubtask}
                  />
                ) : null}
              </tr>
            ))
          : null}
      </React.Fragment>
    );
  }
}
