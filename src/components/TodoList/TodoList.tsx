import React from 'react';
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {TodolistType} from "../../model/todolists-reducer";
import {FilterTasksButtons} from "../FilterTasksButtons/FilterTasksButtons";
import {Tasks} from "../Tasks/Tasks";
import {TodoListTitle} from "../TodoListTitle/TodoListTitle";
import {addTaskAC} from "../../model/tasks-reducer";
import {useDispatch} from "react-redux";

export type TodoListPropsType = {
    todolist: TodolistType
}

export const TodoList = ({todolist}: TodoListPropsType) => {

    const dispatch = useDispatch();

    const addTaskCallback = (title: string) => {
        dispatch(addTaskAC(todolist.id, title));
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