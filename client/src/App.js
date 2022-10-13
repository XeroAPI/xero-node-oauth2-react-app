import React from "react";
import Dashboard from "./views/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Organisations from "./views/Organisations";
import Accounts from "./views/Accounts";
import Contacts from "./views/Contacts";

const App = () => {
    return (
        // <Dashboard></Dashboard>
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Dashboard/>} />
                <Route exact path="/organisations" element={<Organisations/>} />
                <Route exact path="/accounts" element={<Accounts/>} />
                <Route exact path="/contacts" element={<Contacts/>} />
            </Routes>
        </BrowserRouter>
    )
};

export default App;