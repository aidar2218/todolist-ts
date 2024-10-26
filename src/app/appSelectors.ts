import {RootState} from "./store";
import {ThemeModeType} from "./app-reducer";

export const selectThemeMode = (state: RootState): ThemeModeType => state.app.themeMode;