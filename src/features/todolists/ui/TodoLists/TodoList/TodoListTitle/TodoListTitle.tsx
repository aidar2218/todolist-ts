import React from 'react';
import {EditableSpan} from "../../../../../../common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {changeTodolistTitleAC, removeTodolistAC, TodolistType} from "../../../../model/todolists-reducer";
import s from "./TodoListTitle.module.css"
import {useAppDispatch} from "../../../../../../common/hooks/useAppDispatch";

type Props = {
    todolist: TodolistType
}

export const TodoListTitle = ({todolist}: Props) => {

    const {id, title} = todolist;

    const dispatch = useAppDispatch();

    const removeTodolistHandler = () => {
        dispatch(removeTodolistAC(id));
    }

    const updateTodolistTitleHandler = (newTitle: string) => {
        dispatch(changeTodolistTitleAC({id: id, title: newTitle}));
    }

    return (
        <div className={s.todolistTitleContainer}>
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