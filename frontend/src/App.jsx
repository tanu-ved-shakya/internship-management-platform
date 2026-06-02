import {BrowserRouter, Routes, Route} from "react-router-dom";

import Internships from "./pages/internships";
import Login from "./pages/login";
import Apply from "./pages/apply";
import Applications from "./pages/applications";

function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/internships" element={<Internships />} />
                <Route path="/apply/:id" element={<Apply />} />
                <Route path="/applications" element={<Applications />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;