import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../app/App";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todoListsReducer
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
    const action = removeTodolistAC(todolistID1);
    const endState = todoListsReducer(startState, action);

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

    const NEW_TITLE = "New Todolist";
    const action = addTodolistAC(NEW_TITLE);
    const endState = todoListsReducer(startState, action);


    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(NEW_TITLE);
    expect(endState[0].filter).toBe("all");
});

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: TodolistType[] = [
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ];

    const UPDATED_TITLE = "New Title";
    const action = changeTodolistTitleAC({id: todolistId2, title: UPDATED_TITLE});
    const endState = todoListsReducer(startState, action);

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

    const UPDATED_FILTER_VALUE: FilterValuesType = "completed";
    const action = changeTodolistFilterAC({id: todolistId2, filter: UPDATED_FILTER_VALUE});
    const endState = todoListsReducer(startState, action);

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(UPDATED_FILTER_VALUE);
});