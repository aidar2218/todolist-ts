import React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import {AddItemForm} from "../common/components/AddItemForm/AddItemForm";
import Container from "@mui/material/Container";
import {addTodolistAC} from "../features/todolists/model/todolists-reducer";
import {TodoLists} from "../features/todolists/ui/TodoLists/TodoLists";
import {useAppDispatch} from "../common/hooks/useAppDispatch";

export const Main = () => {

    const dispatch = useAppDispatch();

    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title));
    }

    return (
        <Container fixed>
            <Grid container
                  sx={{marginBottom: "30px"}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={4}>
                <TodoLists/>
            </Grid>
        </Container>
    );
};