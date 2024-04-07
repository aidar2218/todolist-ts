import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList/TodoList";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

const App = () => {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: "html/css", isDone: true},
        {id: 2, title: "javascript", isDone: true},
        {id: 3, title: "react", isDone: false},
        {id: 4, title: "redux", isDone: false},
        {id: 5, title: "typescript", isDone: false},
    ]);

    const [filter, setFilter] = useState<FilterValuesType>("all");

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value);
    }

    let tasksForTodoList = tasks;

    if (filter === "active") {
        tasksForTodoList = tasks.filter(task => !task.isDone);
    }

    if (filter === "completed") {
        tasksForTodoList = tasks.filter(task => task.isDone);
    }



    return (
        <div className="App">
            <TodoList title={"What to learn"}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />

        </div>
    );
}

export default App