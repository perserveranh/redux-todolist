import * as types from './../constants/actionTypes';

export const list_all = () => {
    return {
        type: types.LIST_ALL
    }
}

export const add_task = (task) => {
    return {
        type: types.ADD_TASK,
        task
    }
}

export const toggle_form = () => {
    return {
        type: types.TOGGLE_FORM
    }
}

export const close_form = () => {
    return {
        type: types.CLOSE_FORM
    }
}

export const open_form = () => {
    return {
        type: types.OPEN_FORM
    }
}

export const update_status = (id) => {
    return {
        type: types.UPDATE_STATUS,
        id
    }
}

export const delete_task = (id) => {
    return {
        type: types.DELETE_TASK,
        id
    }
}

export const edit_task = (task) => {
    return {
        type: types.EDIT_TASK,
        task
    }
}