import {RootState} from "../../../app/store";
import {TodolistType} from "./todolists-reducer";


export const selectTodoLists = (state: RootState): TodolistType[] => state.todoLists;