import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './components/Index';
import User from './components/User'; 
import Admin from './components/Admin';
import Instructor from './components/Instructor';
import Change_Password from './components/Change_Password';
import Privious_Exams from './components/Privious_Exams';
import Ask_Doubt from './components/Ask_Doubt';
import Exams from './components/Exams';
import Add_Another from  './components/Add_Another';
import Add_Exam_Paper from './components/Add_Exam_Paper';
import Exam_Paper from './components/Exam_Paper';
import Check_Exam_Paper from './components/Check_Exam_Paper';
import Give_Exam from './components/Give_Exam';

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
                <Route path='/add_exam_paper' element={<Add_Exam_Paper/>}/>
                <Route path='/exam_paper' element={<Exam_Paper/>}/>
                <Route path='/check_exam_paper' element={<Check_Exam_Paper/>}/>
                <Route path='/give_exam' element={<Give_Exam/>}/>
            </Routes>
        </Router>
    );
}

export default App;
