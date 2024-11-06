import Checkbox from '@mui/material/Checkbox';
import React, {ChangeEvent, useEffect, useState} from 'react';
import {AddItemForm} from '../common/components/AddItemForm/AddItemForm';
import {EditableSpan} from '../common/components/EditableSpan/EditableSpan';
import axios from "axios";

export type Todolist = {
    id: string
    title: string
    addedDate: string
    order: number
}

type FieldError = {
    error: string
    field: string
}

type CreateTodolistResponse = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: {
        item: Todolist
    }
}

type DeleteTodolistResponse = {
    data: {}
    messages: string[]
    fieldsErrors: FieldError[]
    resultCode: number
}

type UpdateTodolistResponse = DeleteTodolistResponse;

export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: DomainTask[]
}

export type DomainTask = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type CreateTaskResponse = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: {
        item: DomainTask
    }
}

export type ChangeTaskStatusResponse = {
    resultCode: number
    messages: string[]
    fieldsErrors: FieldError[]
    data: {}
}

type UpdateTaskModel = {
    status: number
    title: string
    deadline: string
    description: string
    priority: number
    startDate: string
}

type RemoveTaskResponse = ChangeTaskStatusResponse;
type ChangeTaskTitleResponse = ChangeTaskStatusResponse

export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([]);
    const [tasks, setTasks] = useState<{[key: string]: DomainTask[]}>({});

    useEffect(() => {
        // get todolists
        axios.get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
            headers: {
                Authorization: "Bearer e86810e2-48a6-44be-ba11-bf741e8ac469",
            }
        }).then(res => {
            const todoLists = res.data
            setTodolists(todoLists)
            todoLists.forEach(tl => {
                axios
                    .get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${tl.id}/tasks`, {
                        headers: {
                            Authorization: "Bearer e86810e2-48a6-44be-ba11-bf741e8ac469",
                            'API-KEY': "1c31d257-38e4-4cad-92be-d3d3724912cf",
                        },
                    })
                    .then(res => {
                        setTasks((prevState) => ({ ...prevState, [tl.id]: res.data.items }))
                    })
            })

        })

    }, []);

    const createTodolistHandler = (title: string) => {
        // create todolist
        axios.post<CreateTodolistResponse>('https://social-network.samuraijs.com/api/1.1/todo-lists',
            {title},
            {
                headers: {
                    Authorization: "Bearer e86810e2-48a6-44be-ba11-bf741e8ac469",
                    'API-KEY': "1c31d257-38e4-4cad-92be-d3d3724912cf",
                }
            }
        ).then((res) => {
            // console.log(res.data);
            const newTodolist = res.data.data.item;
            setTodolists([newTodolist, ...todolists]);
        });
    }

    const removeTodolistHandler = (id: string) => {
        // remove todolist
        axios.delete<DeleteTodolistResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
            {
                headers: {
                    Authorization: "Bearer e86810e2-48a6-44be-ba11-bf741e8ac469",
                    'API-KEY': "1c31d257-38e4-4cad-92be-d3d3724912cf",
                }
            }
        ).then((res) => {
            // console.log(res.data);
            const filteredTodolists = todolists.filter(tl => tl.id !== id);
            setTodolists(filteredTodolists);
        });
    }

    const updateTodolistTitleHandler = (id: string, title: string) => {
        // update todolist title
        axios.put<UpdateTodolistResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
            {title},
            {
                headers: {
                    Authorization: "Bearer e86810e2-48a6-44be-ba11-bf741e8ac469",
                    "API-KEY": "1c31d257-38e4-4cad-92be-d3d3724912cf",
                }
            }
        ).then((res) => {
            // console.log(res.data);
            const todolistsWithUpdatedTitle = todolists
                .map(tl => tl.id === id ? {...tl, title} : tl);
            setTodolists(todolistsWithUpdatedTitle);
        });
    }

    const createTaskHandler = (title: string, todolistId: string) => {
        // create task
        axios.post<CreateTaskResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
            {title},
            {
                headers: {
                    Authorization: "Bearer e86810e2-48a6-44be-ba11-bf741e8ac469",
                    'API-KEY': "1c31d257-38e4-4cad-92be-d3d3724912cf",
                }
            }
        ).then((res) => {
            // console.log(res.data);
            const newTask = res.data.data.item
            setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
        });
    }

    const removeTaskHandler = (taskId: string, todolistId: string) => {
        // remove task
        axios.delete<RemoveTaskResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`,
            {
                headers: {
                    Authorization: "Bearer e86810e2-48a6-44be-ba11-bf741e8ac469",
                    'API-KEY': "1c31d257-38e4-4cad-92be-d3d3724912cf",
                }
            }
        ).then((res) => {
            const filteredTasks = tasks[todolistId].filter(t => t.id !== taskId);
            setTasks({...tasks, [todolistId]: filteredTasks});
        });
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {

        let status = e.currentTarget.checked ? 2 : 0;

        const model: UpdateTaskModel = {
            status,
            title: task.title,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
        }

        // update task status
        axios.put<ChangeTaskTitleResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`,
            {model},
            {
                headers: {
                    Authorization: "Bearer e86810e2-48a6-44be-ba11-bf741e8ac469",
                    "API-KEY": "1c31d257-38e4-4cad-92be-d3d3724912cf",
                }
            }
        ).then((res) => {
            console.log(res.data);
            const newTasks = tasks[task.todoListId].map(t => t.id === task.id ? {...t, ...model} : t);
            setTasks({...tasks, [task.todoListId]: newTasks});
        });
    }

    const changeTaskTitleHandler = (title: string, task: DomainTask) => {
        // update task title

        const model: UpdateTaskModel = {
            title,
            status: task.status,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
        }

        axios.put<ChangeTaskStatusResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`,
            {model},
            {
                headers: {
                    Authorization: "Bearer e86810e2-48a6-44be-ba11-bf741e8ac469",
                    "API-KEY": "1c31d257-38e4-4cad-92be-d3d3724912cf",
                }
            }
        ).then((res) => {
            console.log(res.data);
            const newTasks = tasks[task.todoListId].map(t => t.id === task.id ? {...t, ...model} : t);
            setTasks({...tasks, [task.todoListId]: newTasks});
        });

    }

    // console.log("todolists: ", todolists);
    // console.log("tasks: ", tasks);

    return (
        <div style={{margin: '20px'}}>
            <AddItemForm addItem={createTodolistHandler}/>

            {/* Todolists */}
            {todolists.map((tl: Todolist) => {
                return (
                    <div key={tl.id} style={todolist}>
                        <div>
                            <EditableSpan
                                value={tl.title}
                                onChange={(title: string) => updateTodolistTitleHandler(tl.id, title)}
                            />
                            <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
                        </div>
                        <AddItemForm addItem={title => createTaskHandler(title, tl.id)}/>

                        {/* Tasks */}
                        {!!tasks[tl.id] &&
                            tasks[tl.id].map((task: DomainTask) => {
                                return (
                                    <div key={task.id}>
                                        <Checkbox
                                            checked={task.status === 2}
                                            onChange={e => changeTaskStatusHandler(e, task)}
                                        />
                                        <EditableSpan
                                            value={task.title}
                                            onChange={title => changeTaskTitleHandler(title, task)}
                                        />
                                        <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                                    </div>
                                )
                            })}
                    </div>
                )
            })}
        </div>
    )
}

// Styles
const todolist: React.CSSProperties = {
    border: '1px solid black',
    margin: '20px 0',
    padding: '10px',
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
}