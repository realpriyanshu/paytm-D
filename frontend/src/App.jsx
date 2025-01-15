import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './pages/Signup.jsx';
import Signin from './pages/Signin.jsx';
import Dashboard from './pages/DashBoard.jsx';
import Send from './pages/Send.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<div>Home</div>} /> */}
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<Send />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
