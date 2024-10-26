import React from 'react';
import List from "@mui/material/List";
import {TodolistType} from "../../../../model/todolists-reducer";
import {Task} from "./Task/Task";
import {useAppSelector} from "../../../../../../common/hooks/useAppSelector";
import {selectTasks} from "../../../../model/tasksSelectors";

type Props = {
    todolist: TodolistType;
}

export const Tasks = ({todolist}: Props) => {

    const tasks = useAppSelector(selectTasks);

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