// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import NewReservation from './pages/NewReservation';
import Menu from './Components/Menu';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div>
            <h2>Bienvenue</h2>
            <Link to="/login">Se connecter</Link> | <Link to="/signup">S'inscrire</Link> |
            <Link to="/newReservation">Reserver</Link>
            <Link to="/menu">Menu</Link>

          </div>
        } />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/newReservation" element={<NewReservation />} />
        <Route path="/menu" element={<Menu />} />
      </Routes>
    </Router>
  );
}

export default App;
