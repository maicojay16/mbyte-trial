import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from 'emotion-theming'
import Content from "./src/screen/Home/"
import theme from "./src/theme/"

const App = () => (
    <ThemeProvider theme={theme}>
        <Content />
    </ThemeProvider>
)

ReactDOM.render(<App />, document.getElementById("root"));