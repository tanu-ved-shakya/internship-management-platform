import {BrowserRouter, Routes, Route} from "react-router-dom";

import Internships from "./pages/internships";
import Login from "./pages/login";
import Apply from "./pages/apply";
import Applications from "./pages/applications";
import Register from "./pages/register";

function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/internships" element={<Internships />} />
                <Route path="/apply/:id" element={<Apply />} />
                <Route path="/applications" element={<Applications />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;