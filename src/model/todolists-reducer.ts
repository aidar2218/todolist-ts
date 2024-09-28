import {FilterValuesType, TodolistType} from "../app/App";
import {v1} from "uuid";


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    payload: {
        id: string
    }
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    payload: {
        title: string
        todolistID: string
    }
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        id: string
        title: string
    }
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        id: string
        filter: FilterValuesType
    }
}

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType;


const initialState: TodolistType[] = [];

export const todoListsReducer = (state: TodolistType[] = initialState,
                                 action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.payload.id);
        }
        case "ADD-TODOLIST": {
            const newTodolist: TodolistType = {
                id: action.payload.todolistID,
                title: action.payload.title,
                filter: "all"
            };
            return [
                newTodolist,
                ...state,
            ];
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.payload.id
                ? {...tl, title: action.payload.title}
                : tl);
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.id === action.payload.id
                ? {...tl, filter: action.payload.filter}
                : tl);
        }
        default: {
            return state;
        }
    }
};

export const removeTodolistAC = (id: string): RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", payload: {id}} as const;
};

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {
        type: "ADD-TODOLIST", payload: {
            title,
            todolistID: v1()
        }
    } as const;
}

export const changeTodolistTitleAC = (payload: {id: string, title: string})
    : ChangeTodolistTitleActionType => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload,
    } as const;
}

export const changeTodolistFilterAC = (payload: {id: string, filter: FilterValuesType})
    : ChangeTodolistFilterActionType => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload,
    } as const;
}