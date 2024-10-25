export type ThemeModeType = "light" | "dark";

type ChangeThemeActionType = {
    type: "CHANGE_THEME",
    themeMode: ThemeModeType,
};

type ActionsType = ChangeThemeActionType;

type InitialState = typeof initialState;

const initialState = {
    themeMode: "light" as ThemeModeType,
}

export const appReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
    switch (action.type) {
        case "CHANGE_THEME":
            return {
                ...state,
                themeMode: action.themeMode,
            }
        default:
            return state;
    }
}

export const changeThemeAC = (themeMode: ThemeModeType): ChangeThemeActionType => {
    return {type: "CHANGE_THEME", themeMode: themeMode} as const;
}

