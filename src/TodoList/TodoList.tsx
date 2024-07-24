import React from 'react';
import {FilterValuesType, TaskType} from "../App";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/system/Box';
import {filterButtonsContainerSx, getListItemSx} from "./Todolist.styles";

export type TodoListPropsType = {
    title: string
    todolistID: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistID: string) => void
    changeFilter: (filterValue: FilterValuesType, todolistID: string) => void
    addTask: (taskTitle: string, todolistID: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistID: string) => void
    updateTaskTitle: (todolistID: string, taskID: string, newTitle: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
    updateTodolistTitle: (todolistID: string, newTitle: string) => void
}

export const TodoList = ({
                             title, todolistID, tasks, removeTask,
                             changeFilter, addTask,
                             changeTaskStatus, updateTaskTitle, filter,
                             removeTodolist, updateTodolistTitle
                         }: TodoListPropsType) => {

    const changeFilterTasksHandler = (filterValue: FilterValuesType) => {
        changeFilter(filterValue, todolistID);
    }

    const removeTaskHandler = (taskId: string) => {
        removeTask(taskId, todolistID);
    }

    const changeTaskStatusHandler = (taskId: string, status: boolean) => {
        changeTaskStatus(taskId, status, todolistID);
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistID);
    }

    const addTaskCallback = (title: string) => {
        addTask(title, todolistID);
    }

    const updateTaskTitleHandler = (taskID: string, newTitle: string) => {
        updateTaskTitle(todolistID, taskID, newTitle);
    }

    const updateTodolistTitleHandler = (newTitle: string) => {
        updateTodolistTitle(todolistID, newTitle);
    }


    return (
        <div>
            <div className={"todolist-title-container"}>
                <h3>
                    <EditableSpan value={title}
                                  onChange={updateTodolistTitleHandler}/>
                </h3>
                <IconButton onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <AddItemForm addItem={addTaskCallback}/>
            {tasks.length === 0 ? (
                <p>there are no tasks</p>
            ) : (
                <List>
                    {tasks.map(task => {
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
                        )
                    })}
                </List>
            )}

            <Box sx={filterButtonsContainerSx}>
                <Button
                    color={"inherit"}
                    onClick={() => changeFilterTasksHandler("all")}
                    variant={filter === "all" ? "outlined" : "text"}>
                    All
                </Button>
                <Button
                    color={"primary"}
                    onClick={() => changeFilterTasksHandler("active")}
                    variant={filter === "active" ? "outlined" : "text"}>
                    Active
                </Button>
                <Button
                    color={"secondary"}
                    onClick={() => changeFilterTasksHandler("completed")}
                    variant={filter === "completed" ? "outlined" : "text"}>
                    Completed
                </Button>
            </Box>
        </div>
    );
};