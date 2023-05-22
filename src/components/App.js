import SignIn from "./SignIn";
import Navbar from "./NavBar";
import SearchControl from "./SearchControl";
import Account from "./Account";
import '../App.css';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import RecentTradesControl from "./RecentTradesControl";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/" element={<RecentTradesControl />} />
                <Route path="/search" element={<SearchControl />} />
                <Route path="/account" element={<Account />} />
            </Routes>
        </Router>
    );
}

export default App;
