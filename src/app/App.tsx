import React, {useState} from 'react';
import './App.css';
import {TodoList} from "../components/TodoList/TodoList";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Paper from '@mui/material/Paper';
import {MenuButton} from "../components/MenuButton/MenuButton";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "../model/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../model/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store";

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



    const todoLists = useSelector<RootState, TodolistType[]>(state => state.todoLists);
    const tasks = useSelector<RootState, TasksStateType>(state => state.tasks);

    const dispatch = useDispatch();

    const [themeMode, setThemeMode] = useState<ThemeMode>("light");

    const theme = createTheme({
        palette: {
            mode: themeMode === "light" ? "light" : "dark",
            primary: {
                main: "#087EA4",
            }
        }
    });


    const removeTask = (todolistID: string, taskID: string) => {
        dispatch(removeTaskAC(todolistID, taskID));
    };

    const addTask = (todolistID: string, taskTitle: string) => {
        dispatch(addTaskAC(todolistID, taskTitle))
    };

    const changeTaskStatus = (todolistID: string, taskID: string, taskStatus: boolean) => {
        dispatch(changeTaskStatusAC(todolistID, taskID, taskStatus));
    }

    const changeTaskTitle = (todolistID: string,
                             taskID: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistID, taskID, newTitle));
    }

    const removeTodolist = (todolistID: string) => {
        dispatch(removeTodolistAC(todolistID));
    }

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title));
    }

    const updateTodolistTitle = (todolistID: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC({id: todolistID, title: newTitle}));
    }

    const changeFilter = (todolistID: string, filterValue: FilterValuesType) => {
        dispatch(changeTodolistFilterAC({id: todolistID, filter: filterValue}));
    };

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
                                              changeTaskTitle={changeTaskTitle}
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

export default App;