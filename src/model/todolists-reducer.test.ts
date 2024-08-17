import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../App";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolists-reducer";

test("correct todolist should be removed", () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    // 1. Стартовый state
    const startState: TodolistType[] = [
        {
            id: todolistID1,
            title: "What to learn",
            filter: "all",
        },
        {
            id: todolistID2,
            title: "What to buy",
            filter: "all"
        }
    ];

    // 2. Действие
    const endState = todolistsReducer(startState, removeTodolistAC(todolistID1));

    // 3. Проверяем, что наши действия (изменения state) соответствуют ожиданию.
    // В массиве останется один тудулист
    expect(endState.length).toBe(1);
    // удалится нужный тудулист, а не любой
    expect(endState[0].id).toBe(todolistID2);
});

test("new todolist should be added", () => {
    let todolistId1 = v1();
    let todolistId2 = v1();


    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ];

    const NEW_TITLE = "New Todolist"
    const endState = todolistsReducer(startState, addTodolistAC(NEW_TITLE));


    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(NEW_TITLE);
    expect(endState[2].filter).toBe("all");
});

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ];

    const UPDATED_TITLE = "New Title";
    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, UPDATED_TITLE));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(UPDATED_TITLE);
});

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ];

    const UPDATED_FILTER_VALUE: FilterValuesType = "completed"
    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, UPDATED_FILTER_VALUE));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(UPDATED_FILTER_VALUE);
});