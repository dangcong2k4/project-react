import './App.css';
import StudentList from './crud/List';
import {Routes,Route} from "react-router-dom";
import Create from "./crud/Create";
import List from "./crud/List";
import Update from "./crud/Update";
import React from "react";

function App() {
  return (
        <Routes>

            <Route path="/create" element={<Create />}/>
            <Route path="/" element={<StudentList />}/>
            <Route path="/update/:id" element={<Update />}/>
        </Routes>
  );
}

export default App;
