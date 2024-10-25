import React from 'react';
import {EditableSpan} from "../EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {changeTodolistTitleAC, removeTodolistAC, TodolistType} from "../../model/todolists-reducer";
import {useDispatch} from "react-redux";

type Props = {
    todolist: TodolistType
}

export const TodoListTitle = ({todolist}: Props) => {

    const {id, title} = todolist;

    const dispatch = useDispatch();

    const removeTodolistHandler = () => {
        dispatch(removeTodolistAC(id));
    }

    const updateTodolistTitleHandler = (newTitle: string) => {
        dispatch(changeTodolistTitleAC({id: id, title: newTitle}));
    }

    return (
        <div className={"todolist-title-container"}>
            <h3>
                <EditableSpan value={title}
                              onChange={updateTodolistTitleHandler}/>
            </h3>
            <IconButton onClick={removeTodolistHandler}>
                <DeleteIcon/>
            </IconButton>
        </div>
    );
};