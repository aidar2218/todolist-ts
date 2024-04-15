import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList/TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

const App = () => {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "html/css", isDone: true},
        {id: v1(), title: "javascript", isDone: true},
        {id: v1(), title: "react", isDone: false},
        {id: v1(), title: "redux", isDone: false},
        {id: v1(), title: "typescript", isDone: false},
    ]);

    const [filter, setFilter] = useState<FilterValuesType>("all");

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    const addTask = (taskTitle: string) => {
        setTasks([{id: v1(), title: taskTitle, isDone: false}, ...tasks]);
    };

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value);
    };

    const changeTaskStatus = (taskId: string, taskStatus: boolean) => {
        const newState = tasks.map(t => (t.id === taskId ? {...t, isDone: taskStatus } : t));
        setTasks(newState);
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
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      filter={filter}
            />

        </div>
    );
}

export default App