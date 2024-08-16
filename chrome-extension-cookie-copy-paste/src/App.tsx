import React from 'react';
import './App.css';

import { Routes, Route, MemoryRouter } from 'react-router-dom'
import Settings from './components/Settings';
import Main from './components/Main';
 
function App() {
 return (
   <div className="App">
            <MemoryRouter>
                <Routes>
                    <Route path="/settings" element={<Settings/>} />
                    <Route path="/" element={<Main />} />
                    <Route path="*"
                        element={<Main />}
                    />
                </Routes>
            </MemoryRouter>
   
   </div>
 )
}
 
export default App;