import React from 'react';
import {filterButtonsContainerSx} from "./FilterTasksButtons.styles";
import Button from "@mui/material/Button";
import Box from "@mui/system/Box";
import {changeTodolistFilterAC, FilterValuesType, TodolistType} from "../../../../model/todolists-reducer";
import {useAppDispatch} from "../../../../../../common/hooks/useAppDispatch";

type Props = {
    todolist: TodolistType
}

export const FilterTasksButtons = ({todolist}: Props) => {

    const {filter, id} = todolist;

    const dispatch = useAppDispatch();

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC({id, filter}));
    }


    return (
        <Box sx={filterButtonsContainerSx}>
            <Button
                color={"inherit"}
                onClick={() => changeFilterTasksHandler("all")}
                variant={filter === "all" ? "outlined" : "text"}>
                All
            </Button>
            <Button
                color={"primary"}
                onClick={() => changeFilterTasksHandler("active")}
                variant={filter === "active" ? "outlined" : "text"}>
                Active
            </Button>
            <Button
                color={"secondary"}
                onClick={() => changeFilterTasksHandler("completed")}
                variant={filter === "completed" ? "outlined" : "text"}>
                Completed
            </Button>
        </Box>
    );
};