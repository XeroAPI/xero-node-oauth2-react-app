import React from "react";
import Dashboard from "./views/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Dashboard/>} />
            </Routes>
        </BrowserRouter>
    )
};

export default App;