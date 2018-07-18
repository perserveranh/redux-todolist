import * as types from './../constants/actionTypes';
import _ from 'lodash';

const uuidv4 = require('uuid/v4');

var data = JSON.parse(localStorage.getItem('task'));
var initialState = data ? data : [];

var myReducers = (state = initialState, action) => {
    var id = '';
    var index = -1;
    switch (action.type) {
        case types.LIST_ALL:
            return state;

        case types.ADD_TASK:
            var newTask = {
                id: uuidv4(),
                name: action.task.name,
                status: action.task.status === true ? true : false
            }
            state.push(newTask);
            localStorage.setItem('task', JSON.stringify(state));
            return [...state];

        case types.UPDATE_STATUS:
            id = action.id;
            index = _.findIndex(state, { id });
            state[index] = {
                ...state[index],
                status: !state[index].status
            }
            localStorage.setItem('task', JSON.stringify(state));
            return [...state];

        case types.DELETE_TASK:
            id = action.id;
            index = _.findIndex(state, { id });
            state.splice(index, 1);
            localStorage.setItem('task', JSON.stringify(state));
            return [...state]
        default:
            return state;
    }
};

export default myReducers;