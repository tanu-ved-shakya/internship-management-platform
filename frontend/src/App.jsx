import {BrowserRouter, Routes, Route} from "react-router-dom";

import Internships from "./pages/internships";
import Login from "./pages/login";
import Apply from "./pages/apply";


function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/internships" element={<Internships />} />
                <Route path="/apply/:id" element={<Apply />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;