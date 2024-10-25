import React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import {TodoList} from "../TodoList/TodoList";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {TodolistType} from "../../model/todolists-reducer";

export const TodoLists = () => {

    const todoLists = useSelector<RootState, TodolistType[]>(state => state.todoLists);

    return (
        <>
            {todoLists.map(tl => {
                return (
                    <Grid key={tl.id}>
                        <Paper sx={{padding: "0 20px 20px 20px"}}>
                            <TodoList key={tl.id}
                                      todolist={tl}
                            />
                        </Paper>
                    </Grid>
                )
            })}
        </>
    );
};