import {createTheme} from "@mui/material/styles";
import {ThemeModeType} from "../../app/app-reducer";

export const getTheme = (themeMode: ThemeModeType) => {
    return createTheme({
        palette: {
            mode: themeMode === "light" ? "light" : "dark",
            primary: {
                main: "#087EA4",
            }
        }
    })
}

// const theme = createTheme({
//     palette: {
//         mode: themeMode === "light" ? "light" : "dark",
//         primary: {
//             main: "#087EA4",
//         }
//     }
// });