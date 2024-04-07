import React from 'react';
import {FilterValuesType, TaskType} from "../App";
import {Button} from "../Button/Button";

export type TodoListPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: number) => void
    changeFilter: (filterValue: FilterValuesType) => void
}

export const TodoList = ({title, tasks, removeTask, changeFilter}: TodoListPropsType) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input />
                <Button title={"+"} />
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
                                <Button title={"X"} onClick={() => removeTask(task.id)}/>
                            </li>
                        )
                    })}
                </ul>
            )}

            <div>
                <Button title={"All"} onClick={() => changeFilter("all")}/>
                <Button title={"Active"} onClick={() => changeFilter("active")}/>
                <Button title={"Completed"} onClick={() => changeFilter("completed")}/>
            </div>
        </div>
    );
};