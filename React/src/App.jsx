import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './components/Index';
import User from './components/User'; // Ensure you have this component created
import Admin from './components/Admin'; // Ensure you have this component created
import Instructor from './components/Instructor'; // Ensure you have this component created
import Change_Password from './components/Change_Password';
import Privious_Exams from './components/Privious_Exams';
import Ask_Doubt from './components/Ask_Doubt';
import Exams from './components/Exams';
import Add_Another from  './components/Add_Another';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/user" element={<User />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/instructor" element={<Instructor />} />
                <Route path='/change_password' element={<Change_Password />}/>
                <Route path='/exams' element={<Exams />}/>
                <Route path='/privious_exams' element={<Privious_Exams />}/>
                <Route path='/ask_doubt' element={<Ask_Doubt />}/>
                <Route path='/add_another' element={<Add_Another/>}/>
            </Routes>
        </Router>
    );
}

export default App;
