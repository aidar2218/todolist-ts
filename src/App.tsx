import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList/TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

export type FilterValuesType = "all" | "active" | "completed"

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

const App = () => {

    let todolistID1 = v1();
    let todolistID2 = v1();

    const [todolist, setTodolist] = useState<TodoListType[]>([
        {
            id: todolistID1,
            title: "What to learn",
            filter: "all",
        },
        {
            id: todolistID2,
            title: "What to buy",
            filter: "all"
        }
    ]);

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: "html/css", isDone: true},
            {id: v1(), title: "javascript", isDone: true},
            {id: v1(), title: "react", isDone: false},
            {id: v1(), title: "redux", isDone: false},
            {id: v1(), title: "typescript", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "bread", isDone: true},
            {id: v1(), title: "milk", isDone: false},
            {id: v1(), title: "sugar", isDone: false},
            {id: v1(), title: "sold", isDone: true},
            {id: v1(), title: "book", isDone: false},
        ],
    });



    const removeTask = (taskId: string, todolistID: string) => {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].filter(t => t.id !== taskId),
        });
    };

    const addTask = (taskTitle: string, todolistID: string) => {
        const newTask = {
            id: v1(),
            title: taskTitle,
            isDone: false,
        }
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]});
    };

    const changeFilter = (filterValue: FilterValuesType, todolistID: string) => {
        const newTodolists = todolist.map(tl => {
            return tl.id === todolistID ? {...tl, filter: filterValue} : tl;
        });
        setTodolist(newTodolists);
    };

    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistID: string) => {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(t => (t.id === taskId
                ? {...t, isDone: taskStatus}
                : t)),
        })
    }

    const removeTodolist = (todolistID: string) => {
        setTodolist(todolist.filter(tl => tl.id !== todolistID));
        delete tasks[todolistID];
        setTasks({...tasks});
    }


    return (
        <div className="App">
            {todolist.map(tl => {
                const allTodolistTasks = tasks[tl.id]
                let tasksForTodoList = allTodolistTasks;

                if (tl.filter === "active") {
                    tasksForTodoList = allTodolistTasks.filter(task => !task.isDone);
                }

                if (tl.filter === "completed") {
                    tasksForTodoList = allTodolistTasks.filter(task => task.isDone);
                }

                return (
                    <TodoList title={tl.title}
                              key={tl.id}
                              todolistID={tl.id}
                              tasks={tasksForTodoList}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeTaskStatus}
                              filter={tl.filter}
                              removeTodolist={removeTodolist}
                    />
                )
            })}


        </div>
    );
}

export default App