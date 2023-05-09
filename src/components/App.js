import SignIn from "./SignIn";
import Homepage from "./Homepage";
import Navbar from "./NavBar";
import '../App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/" element={<Homepage />} />
            </Routes>
        </Router>
    );
}

export default App;
