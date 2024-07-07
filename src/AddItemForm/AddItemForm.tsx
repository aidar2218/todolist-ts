import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "../Button/Button";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = ({addItem}: AddItemFormPropsType) => {

    const [title, setTitle] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const addItemHandler = () => {
        if (title.trim() !== "") {
            addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const changeItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    }

    const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (event.key === "Enter") {
            addItemHandler();
        }
    }

    return (
        <div>
            <input value={title}
                   className={error ? "error" : ""}
                   onChange={changeItemHandler}
                   onKeyUp={addItemOnKeyUpHandler}/>
            <Button title={"+"} onClick={addItemHandler}/>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    );
};