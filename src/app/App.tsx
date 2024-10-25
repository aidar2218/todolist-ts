import React from 'react';
import './App.css';
import {ThemeProvider} from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';
import {useSelector} from "react-redux";
import {RootState} from "./store";
import {getTheme} from "../common/theme/theme";
import {ThemeModeType} from "./app-reducer";
import {Header} from "../components/Header/Header";
import {Main} from "../components/Main/Main";

const App = () => {

    const themeMode = useSelector<RootState, ThemeModeType>(state => state.app.themeMode);

    return (
        <ThemeProvider theme={getTheme(themeMode)}>
            <CssBaseline />
            <Header />
            <Main />
        </ThemeProvider>
    );
}

export default App;