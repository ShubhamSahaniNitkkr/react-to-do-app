import React, { Component } from 'react';
import TodoInput from './components/TodoInput';
import 'bootstrap/dist/css/bootstrap.min.css';
import uuid from 'uuid';

class App extends Component {
  state = {
    items: [],
    id: uuid(),
    item: '',
    editItem: false,
    addSubtask: false,
    parentItem: '',
    parentId: '',
    totalWidth: 4,
  };

  componentDidMount() {
    let items = window.localStorage.getItem('todo-items');
    if (items !== null) {
      this.setState({
        items: JSON.parse(items),
      });
      console.log('onload', JSON.parse(items));
    }
  }

  handleChange = (e) => {
    this.setState({
      item: e.target.value,
    });
  };

  handleAddSubtask = (id, itemArr) => {
    const selectedItems = itemArr.find((item) => item.id === id);
    this.setState({
      addSubtask: true,
      parentItem: selectedItems.title,
      parentId: id,
    });
  };

  updateObjUtil = (itemArr, parentId, action) => {
    itemArr.map((item, idx) => {
      if (item.id === parentId) {
        if (action === 'delete') {
          delete itemArr[idx];
        } else if (action === 'add') {
          item.subtasks = [
            ...item.subtasks,
            {
              id: uuid(),
              title: this.state.item,
              subtasks: [],
            },
          ];
        } else if (action === 'setEditText') {
          this.setState({
            item: item.title,
            editItem: true,
            id: parentId,
          });
        } else if (action === 'edit') {
          console.log(item.title, this.state.item, 'man');
          item.title = this.state.item;
        }
      }
      if (item.subtasks.length)
        this.updateObjUtil(item.subtasks, parentId, action);
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.item === '') return false;
    let newItem = {},
      updatedItem,
      width = this.state.totalWidth;

    if (this.state.addSubtask) {
      this.updateObjUtil(this.state.items, this.state.parentId, 'add');
      updatedItem = [...this.state.items];
    } else if (this.state.editItem) {
      this.updateObjUtil(this.state.items, this.state.id, 'edit');
      updatedItem = [...this.state.items];
    } else {
      newItem = {
        id: this.state.id,
        title: this.state.item,
        subtasks: [],
      };
      updatedItem = [...this.state.items, newItem];
    }

    localStorage.setItem('todo-items', JSON.stringify(updatedItem));

    this.setState({
      items: updatedItem,
      item: '',
      id: uuid(),
      editItem: false,
      totalWidth: this.state.addSubtask ? width + 1 : width,
      addSubtask: false,
      parentItem: '',
      parentId: '',
    });
  };

  clearList = () => {
    this.setState({
      items: [],
      id: uuid(),
      item: '',
      editItem: false,
      addSubtask: false,
      parentItem: '',
      parentId: '',
    });
    localStorage.setItem('todo-items', JSON.stringify([]));
  };

  handleDelete = (id) => {
    let filteredItems = this.state.items.filter((item) => item.id !== id);
    if (filteredItems.length === this.state.items.length) {
      this.updateObjUtil(this.state.items, id, 'delete');
      filteredItems = [...this.state.items];
    }

    this.setState({
      items: filteredItems,
    });
    localStorage.setItem('todo-items', JSON.stringify(filteredItems));
  };

  handleEdit = (id) => {
    this.updateObjUtil(this.state.items, id, 'setEditText');
  };

  setTotalWidth = (width) => {
    this.setState({
      totalWidth: width,
    });
  };

  render() {
    return (
      <div className='container py-5'>
        <TodoInput
          item={this.state.item}
          items={this.state.items}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          editItem={this.state.editItem}
          clearList={this.clearList}
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
          handleAddSubtask={this.handleAddSubtask}
          parentItem={this.state.parentItem}
          addSubtask={this.state.addSubtask}
          totalWidth={this.state.totalWidth}
        />
      </div>
    );
  }
}

export default App;
