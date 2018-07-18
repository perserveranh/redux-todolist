import React, { Component } from 'react';
import { connect } from 'react-redux';
import { add_task, close_form } from '../actions';

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false
        };
    }
    onClear = () => {
        this.setState({
            id: '',
            name: '',
            status: false
        });
    }
    componentWillMount() {
        if (this.props.itemEditing && this.props.itemEditing.id !== null) {
            this.setState({
                id: this.props.itemEditing.id,
                name: this.props.itemEditing.name,
                status: this.props.itemEditing.status
            });
        } else {
            this.onClear();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.itemEditing) {
            this.setState({
                id: nextProps.itemEditing.id,
                name: nextProps.itemEditing.name,
                status: nextProps.itemEditing.status
            });
        } else {
            this.onClear();
        }
    }
    onClose() {
        this.props.dispatch(close_form());
    }
    handChange(e) {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        if (name === "status") {
            value = target.value === 'true' ? true : false;
        }
        this.setState({
            [name]: value
        });
    }
    handSubmit(e) {
        e.preventDefault();
        this.props.dispatch(add_task(this.state));
        this.onClear();
        this.onClose();
    }
    onClear = () => {
        this.setState({
            name: '',
            status: false
        });
    }
    render() {
        if (!this.props.isDisplayForm) return null;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title text-left">
                        {!this.state.id ? 'Thêm Công Việc' : 'Chỉnh Sửa Công Việc'}
                        <span className="fa fa-times-circle text-right" onClick={this.onClose.bind(this)}></span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.handSubmit.bind(this)}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.handChange.bind(this)}
                            />
                        </div>
                        <label>Trạng Thái :</label>
                        <select className="form-control"
                            name='status'
                            value={this.state.status}
                            onChange={this.handChange.bind(this)}
                        >
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning" >Lưu Lại</button>&nbsp;
                                <button className="btn btn-danger" onClick={this.onClose.bind(this)}>Hủy Bỏ</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        tasks: state.tasks,
        isDisplayForm: state.isDisplayForm,
        itemEditing: state.itemEditing
    }
}
export default connect(mapStateToProps)(TaskForm);
