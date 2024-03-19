import React from 'react';
import './App.css';
import {TodoList} from "./TodoList/TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

const App = () => {

    const task1: TaskType[] = [
        {id: 1, title: "html/css", isDone: true},
        {id: 2, title: "javascript", isDone: true},
        {id: 3, title: "react", isDone: false},
        {id: 4, title: "redux", isDone: false},
        {id: 5, title: "typescript", isDone: false},
    ];

    const task2: TaskType[] = [];

    return (
        <div className="App">
            <TodoList title={"What to learn"} tasks={task1}/>
            <TodoList title={"What to buy"} tasks={task2}/>
        </div>
    );
}

export default App