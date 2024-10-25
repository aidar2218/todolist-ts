import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    payload: {
        todolistID: string
        taskID: string
    }
};

type AddTaskActionType = {
    type: 'ADD-TASK'
    payload: {
        todolistID: string
        taskTitle: string
    }
};

type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    payload: {
        todolistID: string
        taskID: string
        taskStatus: boolean
    }
};

type UpdateTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    payload: {
        todolistID: string
        taskID: string
        newTaskTitle: string
    }
}


type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | UpdateTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType;

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

const initialState: TasksStateType = {};


export const tasksReducer = (
    state: TasksStateType = initialState,
    action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const newTodolist = state[action.payload.todolistID].filter(task =>
                task.id !== action.payload.taskID);
            return {
                ...state,
                [action.payload.todolistID]: newTodolist,
            };
        }
        case "ADD-TASK": {
            const newTask: TaskType = {
                id: v1(),
                title: action.payload.taskTitle,
                isDone: false
            };
            return {
                ...state,
                [action.payload.todolistID]: [newTask,
                    ...state[action.payload.todolistID]],
            }
        }
        case "CHANGE-TASK-STATUS": {
            const newTodolist = state[action.payload.todolistID].map(task =>
                task.id === action.payload.taskID
                    ? {...task, isDone: action.payload.taskStatus}
                    : task
            );
            return {
                ...state,
                [action.payload.todolistID]: newTodolist,
            }
        }
        case "CHANGE-TASK-TITLE": {
            const newTodolist = state[action.payload.todolistID].map(task =>
                task.id === action.payload.taskID
                    ? {...task, title: action.payload.newTaskTitle}
                    : task
            )
            return {
                ...state,
                [action.payload.todolistID]: newTodolist
            }
        }
        case "ADD-TODOLIST": {
            return {
                [action.payload.todolistID]: [],
                ...state
            }
        }
        case "REMOVE-TODOLIST": {
            delete state[action.payload.id]; // возможно здесь появится ошибка
            return {...state};
        }
        default: {
            return state;
        }
    }
};

export const removeTaskAC = (todolistID: string, taskID: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", payload: {todolistID, taskID}} as const;
};

export const addTaskAC = (todolistID: string, taskTitle: string): AddTaskActionType => {
    return {type: "ADD-TASK", payload: {todolistID, taskTitle}} as const;
};

export const changeTaskStatusAC = (todolistID: string, taskID: string, newTaskStatus: boolean): ChangeTaskStatusActionType => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {
            todolistID,
            taskID,
            taskStatus: newTaskStatus,
        }
    } as const;
}

export const changeTaskTitleAC = (todolistID: string,
                                  taskID: string, newTaskTitle: string):
    UpdateTaskTitleActionType => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: {
            todolistID,
            taskID,
            newTaskTitle
        }
    } as const;
}