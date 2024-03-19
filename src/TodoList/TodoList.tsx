import React from 'react';
import {TaskType} from "../App";
import {Button} from "../Button/Button";

export type TodoListPropsType = {
    title: string
    tasks: TaskType[]
}

export const TodoList = ({title, tasks}: TodoListPropsType) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button title={"+"}/>
            </div>
            {tasks.length === 0 ? (
                <p>there are no tasks</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        debugger;
                        return (
                            <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title}</span>
                            </li>
                        )
                    })}
                </ul>
            )}

            <div>
                <Button title={"All"}/>
                <Button title={"Active"}/>
                <Button title={"Completed"}/>
            </div>
        </div>
    );
};