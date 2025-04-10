import { useState, useEffect, createContext, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Invoice from './components/Invoice';
import Register from './components/Register';
export const UserContext = createContext();
function App() {
  const [user, setUser] = useState(() => {
    const email = localStorage.getItem("email");
    const name = localStorage.getItem("name");
    return email && name ? { email, name } : null;
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
      <Routes>
  {!user ? (
    <Route path="*" element={<Register />} />
  ) : (
    <>
      <Route path="/" element={<Home />} />
      <Route path="/invoice" element={<Invoice />} />
      <Route path="/auth-handler" element={<AuthHandler />} />
      <Route path="*" element={<NotFound />} /> 
    </>
  )}
</Routes>

      </Router>
    </UserContext.Provider>
  );
}

function AuthHandler() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get("success");
    const email = params.get("email");
    const name = params.get("name");

    if (success === "true" && email && name) {
      localStorage.setItem("email", email);
      localStorage.setItem("name", name);
      setUser({ email, name });

      window.location.href = "/"
    } else {
      console.error("Invalid login attempt");
      navigate("/register");
    }
  }, []);

  return (
    <div className="text-center mt-5">
      <p>Authenticating...</p>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="text-center mt-5">
      <h1>404</h1>
      <p>Page not found</p>
    </div>
  );
}

export default App;
