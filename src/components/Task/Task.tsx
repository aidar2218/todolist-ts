import React from 'react';
import {getListItemSx} from "../TodoList/Todolist.styles";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import {TodolistType} from "../../model/todolists-reducer";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType} from "../../model/tasks-reducer";
import {useDispatch} from "react-redux";

type Props = {
    todolist: TodolistType;
    task: TaskType
}

export const Task = ({todolist, task}: Props) => {

    const dispatch = useDispatch();

    const removeTaskHandler = (taskId: string) => {
        dispatch(removeTaskAC(todolist.id, taskId));
    }

    const changeTaskStatusHandler = (taskId: string, status: boolean) => {
        dispatch(changeTaskStatusAC(todolist.id, taskId, status));
    }

    const updateTaskTitleHandler = (taskID: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolist.id, taskID, newTitle));
    }

    return (
        <ListItem
            key={task.id}
            sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox
                    checked={task.isDone}
                    onChange={(event) => changeTaskStatusHandler(task.id,
                        event.currentTarget.checked)}
                />
                <EditableSpan value={task.title}
                              onChange={(newTitle) => updateTaskTitleHandler(task.id, newTitle)}/>
            </div>
            <IconButton onClick={() => removeTaskHandler(task.id)}>
                <DeleteIcon/>
            </IconButton>
        </ListItem>
    );
};