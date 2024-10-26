import React from 'react';
import {AddItemForm} from "../../../../../common/components/AddItemForm/AddItemForm";
import {TodolistType} from "../../../model/todolists-reducer";
import {FilterTasksButtons} from "./FilterTasksButtons/FilterTasksButtons";
import {Tasks} from "./Tasks/Tasks";
import {TodoListTitle} from "./TodoListTitle/TodoListTitle";
import {addTaskAC} from "../../../model/tasks-reducer";
import {useAppDispatch} from "../../../../../common/hooks/useAppDispatch";

export type TodoListPropsType = {
    todolist: TodolistType
}

export const TodoList = ({todolist}: TodoListPropsType) => {

    const dispatch = useAppDispatch();

    const addTaskCallback = (taskTitle: string) => {
        dispatch(addTaskAC({todolistID: todolist.id, taskTitle}));
    }

    return (
        <div>
            <TodoListTitle todolist={todolist}/>
            <AddItemForm addItem={addTaskCallback}/>
            <Tasks todolist={todolist}/>
            <FilterTasksButtons todolist={todolist} />
        </div>
    );
};