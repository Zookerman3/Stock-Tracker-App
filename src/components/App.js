import SignIn from "./SignIn";
import Navbar from "./NavBar";
import '../App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TradeControl from "./TradeControl";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/" element={<TradeControl />} />
            </Routes>
        </Router>
    );
}

export default App;
