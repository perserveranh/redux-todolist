import React, { Component } from 'react';
import { connect } from 'react-redux';
import { update_status, delete_task, close_form, open_form, edit_task } from '../actions';

class TaskItems extends Component {
    onUpdateStatus = () => {
        this.props.dispatch(update_status(this.props.task.id));
    }
    onDelete() {
        this.props.dispatch(delete_task(this.props.task.id));
        this.props.dispatch(close_form());
    }
    onEdit = () => {
        this.props.dispatch(open_form());
        this.props.dispatch(edit_task(this.props.task));
        console.log(this.props.task);
    }
    render() {
        var { task, index } = this.props;
        return (
            <tr>
                <td>{index + 1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span className={
                        task.status === true ? 'label label-success' : 'label label-primary'}
                        style={{ cursor: 'pointer' }}
                        onClick={this.onUpdateStatus}
                    >
                        {task.status === true ? 'kích hoạt' : 'ẩn'}
                    </span>
                </td>
                <td className="text-center">
                    <button
                        type="button"
                        className="btn btn-warning"
                        onClick={this.onEdit}
                    >
                        <span className="fa fa-pencil mr-5"></span>Sửa
                                        </button>
                    &nbsp;
                                        <button type="button" className="btn btn-danger" onClick={this.onDelete.bind(this)}>
                        <span className="fa fa-trash mr-5"></span>Xóa
                                        </button>
                </td>
            </tr>
        );
    }
}
const mapStateToProps = state => {
    return {
        tasks: state.tasks,
        isDisplayForm: state.isDisplayForm
    }
}
export default connect(mapStateToProps)(TaskItems);
