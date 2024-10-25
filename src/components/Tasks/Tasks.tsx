import React from 'react';
import List from "@mui/material/List";
import {TodolistType} from "../../model/todolists-reducer";
import {useSelector} from "react-redux";
import {TasksStateType} from "../../model/tasks-reducer";
import {RootState} from "../../app/store";
import {Task} from "../Task/Task";

type Props = {
    todolist: TodolistType;
}

export const Tasks = ({todolist}: Props) => {

    const tasks = useSelector<RootState, TasksStateType>(state => state.tasks);

    const allTodolistTasks = tasks[todolist.id];
    let tasksForTodoList = allTodolistTasks;

    if (todolist.filter === "active") {
        tasksForTodoList = allTodolistTasks.filter(task => !task.isDone);
    }

    if (todolist.filter === "completed") {
        tasksForTodoList = allTodolistTasks.filter(task => task.isDone);
    }

    return (
        <>
            {tasksForTodoList.length === 0 ? (
                <p>there are no tasks</p>
            ) : (
                <List>
                    {tasksForTodoList.map(task => {
                        return (
                            <Task key={task.id} todolist={todolist} task={task} />
                        )
                    })}
                </List>
            )}
        </>
    );
};