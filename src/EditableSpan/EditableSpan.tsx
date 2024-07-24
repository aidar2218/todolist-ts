import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from '@mui/material/TextField';

type EditableSpanPropsType = {
    value: string
    onChange: (newTitle: string) => void
}

export const EditableSpan = ({value, onChange}: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState(value);

    const activateEditModeHandler = () => {
        setEditMode(true);
    }
    const activateViewModeHandler = () => {
        setEditMode(false);
        onChange(title);
    }

    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }


    return (
        <>
            {editMode ? (
                <TextField
                    variant={"outlined"}
                    size={"small"}
                    value={title}
                    onChange={changeTitleHandler}
                    onBlur={activateViewModeHandler}
                    />
            ) : (
                <span onDoubleClick={activateEditModeHandler}>{value}</span>
            )}
        </>
    )
};