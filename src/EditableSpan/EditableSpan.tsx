import React, {ChangeEvent, useState} from 'react';

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
                <input type="text"
                       value={title}
                       onChange={changeTitleHandler}
                       onBlur={activateViewModeHandler}
                       autoFocus/>
            ) : (
                <span onDoubleClick={activateEditModeHandler}>{value}</span>
            )}
        </>
    )
};