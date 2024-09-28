import {TasksStateType, TodolistType} from "../app/App";
import {addTodolistAC, todoListsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

test("ids should be equals", () => {
    const startTasksState: TasksStateType = {};
    const startTodoListsState: TodolistType[] = [];

    const action = addTodolistAC("new todolist");
    const endTasksState = tasksReducer(startTasksState, action);
    const endTodoListsState = todoListsReducer(startTodoListsState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolistID);
    expect(idFromTodoLists).toBe(action.payload.todolistID);
});