import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "../App";
import {Button} from "../Button/Button";

export type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filterValue: FilterValuesType) => void
    addTask: (taskTitle: string) => void
}

export const TodoList = ({title, tasks, removeTask, changeFilter, addTask}: TodoListPropsType) => {

    const [taskTitle, setTaskTitle] = useState<string>("");

    const onChangeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value);
    }

    const addTaskOnKeyUpHandler = () => {
            addTask(taskTitle);
            setTaskTitle("");
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addTaskOnKeyUpHandler();
        }
    }

    const changeFilterTasksHandler = (filterValue: FilterValuesType) => {
        changeFilter(filterValue);
    }

    const removeTaskHandler = (taskId: string) => {
        removeTask(taskId);
    }



    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle} onChange={onChangeTaskTitleHandler} onKeyUp={onKeyPressHandler} />
                <Button title={"+"} onClick={addTaskOnKeyUpHandler}/>
            </div>
            {tasks.length === 0 ? (
                <p>there are no tasks</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                                <Button title={"X"} onClick={() => removeTaskHandler(task.id)}/>
                            </li>
                        )
                    })}
                </ul>
            )}

            <div>
                <Button title={"All"} onClick={() => changeFilterTasksHandler("all")}/>
                <Button title={"Active"} onClick={() => changeFilterTasksHandler("active")}/>
                <Button title={"Completed"} onClick={() => changeFilterTasksHandler("completed")}/>
            </div>
        </div>
    );
};