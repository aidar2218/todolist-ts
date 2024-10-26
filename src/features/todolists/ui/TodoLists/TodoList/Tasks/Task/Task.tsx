import React from 'react';
import {getListItemSx} from "./Task.styles";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../../../../../../../common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import {TodolistType} from "../../../../../model/todolists-reducer";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType} from "../../../../../model/tasks-reducer";
import {useAppDispatch} from "../../../../../../../common/hooks/useAppDispatch";

type Props = {
    todolist: TodolistType;
    task: TaskType
}

export const Task = ({todolist, task}: Props) => {

    const dispatch = useAppDispatch();

    const removeTaskHandler = (taskID: string) => {
        dispatch(removeTaskAC({todolistID: todolist.id, taskID}));
    }

    const changeTaskStatusHandler = (taskID: string, taskStatus: boolean) => {
        dispatch(changeTaskStatusAC({todolistID: todolist.id, taskID, taskStatus}));
    }

    const updateTaskTitleHandler = (taskID: string, newTaskTitle: string) => {
        dispatch(changeTaskTitleAC({todolistID:todolist.id, taskID, newTaskTitle}));
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