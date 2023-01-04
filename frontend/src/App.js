import HomePage from "./Pages/Home";
import LoginPage from "./Pages/Login";
import SignUpPage from "./Pages/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserprofilePage from "./Pages/Userprofile";

import AdminLoginPage from './Pages/adminLoginPage'
import AdminHomePage from './Pages/AdminHomePage'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<UserprofilePage />} />
          <Route path='/admin' element={<AdminLoginPage/>}/>
          <Route path='/admin-home' element={user?<AdminHomePage/>:<Navigate to={"/admin"}/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
