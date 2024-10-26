import React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import {TodoList} from "./TodoList/TodoList";
import {useAppSelector} from "../../../../common/hooks/useAppSelector";
import {selectTodoLists} from "../../model/todolistsSelectors";

export const TodoLists = () => {

    const todoLists = useAppSelector(selectTodoLists);

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