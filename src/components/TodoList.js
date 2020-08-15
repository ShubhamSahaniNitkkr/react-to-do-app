import React, { Component } from 'react';
import TodoItem from './TodoItem';

export default class TodoList extends Component {
  render() {
    const {
      items,
      clearList,
      handleDelete,
      handleEdit,
      handleAddSubtask,
      totalWidth,
    } = this.props;

    return (
      <React.Fragment>
        <table className='table table-bordered col-md-12 mx-auto table-striped table-hover mt-5'>
          <thead>
            <tr>
              <th
                colSpan='4'
                className='h2 text-center alert alert-success'
                role='alert'
              >
                <i className='fas fa-clipboard-list'></i> To Do List
              </th>
            </tr>
            <tr>
              <th scope='col'>Task</th>
              <th scope='col'>Edit</th>
              <th scope='col'>Remove</th>
              <th scope='col'>Add subtask</th>
            </tr>
          </thead>
          <tbody>
            <TodoItem
              items={items}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleAddSubtask={handleAddSubtask}
              totalWidth={totalWidth}
              width={totalWidth}
            />

            {items.length !== 0 && (
              <tr>
                <td colSpan='4' className='text-right'>
                  <button
                    type='button'
                    onClick={clearList}
                    disabled={items.length === 0 ? true : false}
                    className='btn btn-danger text-capitalize'
                  >
                    <i className='fas fa-sync-alt'></i> Clear list{' '}
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
