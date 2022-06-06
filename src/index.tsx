import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import App from './App';
import {ThemeProvider} from "styled-components";
import {theme} from "./assets/styles/theme";
import {Provider} from "react-redux";
import {store} from './core/redux/store'

import 'antd/dist/antd.min.css';
import './assets/styles/index.css';


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
        <BrowserRouter>
            <Provider store={store}>
            <ThemeProvider theme={theme}>
            <App/>
            </ThemeProvider>
            </Provider>
        </BrowserRouter>
);

