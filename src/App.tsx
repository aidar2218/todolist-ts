import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList/TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Paper from '@mui/material/Paper';
import {MenuButton} from "./MenuButton/MenuButton";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type ThemeMode = "light" | "dark"

const App = () => {

    let todolistID1 = v1();
    let todolistID2 = v1();

    const [todoLists, setTodoLists] = useState<TodolistType[]>([
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

    const [themeMode, setThemeMode] = useState<ThemeMode>("light");

    const theme = createTheme({
        palette: {
            mode: themeMode === "light" ? "light" : "dark",
            primary: {
                main: "#087EA4",
            }
        }
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
        const newTodolist = todoLists.map(tl => {
            return tl.id === todolistID ? {...tl, filter: filterValue} : tl;
        });
        setTodoLists(newTodolist);
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
        setTodoLists(todoLists.filter(tl => tl.id !== todolistID));
        delete tasks[todolistID];
        setTasks({...tasks});
    }

    const addTodolist = (title: string) => {
        const todolistID = v1()
        const newTodolist: TodolistType = {
            id: todolistID,
            title: title,
            filter: "all"
        };
        setTodoLists([newTodolist, ...todoLists]);
        setTasks({[todolistID]: [], ...tasks});
    }

    const updateTaskTitle = (todolistID: string,
                             taskID: string, newTitle: string) => {
        const newTodolistTasks = {
            ...tasks,
            [todolistID]: tasks[todolistID].map(t => (t.id === taskID ? {
                ...t,
                title: newTitle
            } : t)),
        }
        setTasks(newTodolistTasks);
    }

    const updateTodolistTitle = (todolistID: string, newTitle: string) => {
        const newTodoLists = todoLists.map(tl => (tl.id === todolistID ? {
            ...tl, title: newTitle
        } : tl));
        setTodoLists(newTodoLists)
    }

    const changeModeHandler = () => {
        setThemeMode(themeMode === "light" ? "dark" : "light");
    }


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position={"static"}
                    sx={{marginBottom: "30px"}}>
                <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                    <IconButton color={"inherit"}>
                        <MenuIcon/>
                    </IconButton>
                    <div>
                        <MenuButton>Login</MenuButton>
                        <MenuButton>Logout</MenuButton>
                        <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
                        <Switch color={"default"} onChange={changeModeHandler}/>
                    </div>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container
                      sx={{marginBottom: "30px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={4}>
                    {todoLists.map(tl => {
                        const allTodolistTasks = tasks[tl.id]
                        let tasksForTodoList = allTodolistTasks;

                        if (tl.filter === "active") {
                            tasksForTodoList = allTodolistTasks.filter(task => !task.isDone);
                        }

                        if (tl.filter === "completed") {
                            tasksForTodoList = allTodolistTasks.filter(task => task.isDone);
                        }

                        return (
                            <Grid key={tl.id}>
                                <Paper sx={{padding: "0 20px 20px 20px"}}>
                                    <TodoList title={tl.title}
                                              key={tl.id}
                                              todolistID={tl.id}
                                              tasks={tasksForTodoList}
                                              removeTask={removeTask}
                                              changeFilter={changeFilter}
                                              addTask={addTask}
                                              changeTaskStatus={changeTaskStatus}
                                              updateTaskTitle={updateTaskTitle}
                                              filter={tl.filter}
                                              removeTodolist={removeTodolist}
                                              updateTodolistTitle={updateTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default App