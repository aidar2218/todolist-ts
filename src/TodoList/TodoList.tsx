import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "../App";
import {Button} from "../Button/Button";

export type TodoListPropsType = {
    title: string
    todolistID: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistID: string) => void
    changeFilter: (filterValue: FilterValuesType, todolistID: string) => void
    addTask: (taskTitle: string, todolistID: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistID: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
}

export const TodoList = ({
                             title, todolistID, tasks, removeTask,
                             changeFilter, addTask,
                             changeTaskStatus, filter, removeTodolist
                         }: TodoListPropsType) => {

    const [taskTitle, setTaskTitle] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const onChangeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value);
    }

    const addTaskHandler = () => {
        if (taskTitle.trim() !== "") {
            addTask(taskTitle.trim(), todolistID);
            setTaskTitle("");
        } else {
            setError("Title is required");
        }
    }

    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.key === "Enter") {
            addTaskHandler();
        }
    }

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


    return (
        <div>
            <div className={"todolist-title-container"}>
                <h3>{title}</h3>
                <Button title={"X"} onClick={removeTodolistHandler}/>
            </div>
            <div>
                <input value={taskTitle}
                       className={error ? "error" : ""}
                       onChange={onChangeTaskTitleHandler}
                       onKeyUp={addTaskOnKeyUpHandler}/>
                <Button title={"+"} onClick={addTaskHandler}/>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
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
                                <span>{task.title}</span>
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