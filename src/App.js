import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/taskForm';
import Control from './components/control';
import TaskList from './components/taskList';
import { connect } from 'react-redux'
import { toggle_form, open_form, close_form, edit_task } from './actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskEditting: null,
      filter: {
        name: '',
        status: -1
      },
      keyword: '',
      sortBy: 'name',
      sortValue: 1
    }
  }

  onToggleForm() {
    var { itemEditing } = this.props;
    if (itemEditing && itemEditing.id !== null) {
      this.props.dispatch(open_form());
    }
    else {
      this.props.dispatch(toggle_form());
    }
    this.props.dispatch(edit_task({
      id: '',
      name: '',
      status: false
    }));
  }
  onCloseForm() {
    this.props.dispatch(close_form());
  }
  onShowForm() {
    this.props.dispatch(open_form());
  }

  // onEdit(id) {
  //   var { tasks } = this.state;
  //   var index = _.findIndex(tasks, (task) => {
  //     return task.id === id;
  //   })
  //   var taskEditting = tasks[index];
  //   this.setState({
  //     taskEditting: taskEditting
  //   })
  //   this.onShowForm();
  // }
  onFilter = (filtername, filterstatus) => {
    filterstatus = parseInt(filterstatus, 10);
    this.setState({
      filter: {
        name: filtername.toLowerCase(),
        status: filterstatus
      }
    });
  }
  onSearch = (keyword) => {
    this.setState({
      keyword: keyword
    });

  }
  onSort = (sortBy, sortValue) => {
    this.setState({
      sortBy: sortBy,
      sortValue: sortValue
    })
    console.log(this.state);
  }

  render() {
    var { sortBy, sortValue } = this.state;
    var { isDisplayForm } = this.props;
    // Filter
    // if (filter) {
    //   if (filter.name) {
    //     // tasks = tasks.filter((task) => {
    //     //   return task.name.toLowerCase().indexOf(filter.name) !== -1
    //     // });

    //     tasks = _.filter(tasks, (task) => {
    //       return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
    //     });
    //   }

    //   tasks = tasks.filter((task) => {
    //     if (filter.status === -1) {
    //       return task
    //     }
    //     else {
    //       return task.status === (filter.status === 1 ? true : false)
    //     }
    //   })
    // }

    // Keyword
    // if (keyword) {
    //   tasks = tasks.filter((task) => {
    //     return task.name.toLowerCase().indexOf(keyword) !== -1
    //   });
    // }

    // var elmTaskform = isDisplayForm ? <TaskForm
    //   onCloseForm={this.onCloseForm.bind(this)}
    //   task={taskEditting}
    // /> : '';

    // if (sortBy === 'name') {
    //   tasks.sort((a, b) => {
    //     if (a.name > b.name) return sortValue;
    //     else if (a.name < b.name) return - sortValue;
    //     else return 0;
    //   });
    // }
    // else {
    //   tasks.sort((a, b) => {
    //     if (a.status < b.status) return sortValue;
    //     else if (a.status > b.status) return - sortValue;
    //     else return 0;
    //   });
    // }

    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className={isDisplayForm === true ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
            <TaskForm />
          </div>
          <div className={isDisplayForm === true ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
            <button type="button" className="btn btn-primary" onClick={this.onToggleForm.bind(this)}>
              <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                </button>
            <div className="row mt-15">
              <Control
                onSearch={this.onSearch}
                onSort={this.onSort}
                sortBy={sortBy}
                sortValue={sortValue}
              />
            </div>
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <TaskList

                  onFilter={this.onFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    itemEditing: state.itemEditing,
    isDisplayForm: state.isDisplayForm
  }
}
export default connect(mapStateToProps)(App);
