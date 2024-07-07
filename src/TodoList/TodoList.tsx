import React from 'react';
import {FilterValuesType, TaskType} from "../App";
import {Button} from "../Button/Button";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";

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
                                  onChange={updateTodolistTitleHandler} />
                </h3>
                <Button title={"X"} onClick={removeTodolistHandler}/>
            </div>
            <AddItemForm addItem={addTaskCallback}/>
            {tasks.length === 0 ? (
                <p>there are no tasks</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        return (
                            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                                <input type="checkbox"
                                       onChange={(event) => changeTaskStatusHandler(task.id,
                                           event.currentTarget.checked)}
                                       checked={task.isDone}/>
                                <EditableSpan value={task.title}
                                              onChange={(newTitle) => updateTaskTitleHandler(task.id, newTitle)}/>
                                <Button title={"X"} onClick={() => removeTaskHandler(task.id)}/>
                            </li>
                        )
                    })}
                </ul>
            )}

            <div>
                <Button title={"All"}
                        onClick={() => changeFilterTasksHandler("all")}
                        className={filter === "all" ? "active-filter" : ""}
                />
                <Button title={"Active"}
                        onClick={() => changeFilterTasksHandler("active")}
                        className={filter === "active" ? "active-filter" : ""}
                />
                <Button title={"Completed"}
                        onClick={() => changeFilterTasksHandler("completed")}
                        className={filter === "completed" ? "active-filter" : ""}
                />
            </div>
        </div>
    );
};