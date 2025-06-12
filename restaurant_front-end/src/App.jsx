import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import NewReservation from './pages/NewReservation';
import Menu from './components/Menu';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <div>
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/login">Se connecter</Link> |{' '}
          <Link to="/signup">S'inscrire</Link> |{' '}
          <Link to="/newReservation">Réserver</Link> |{' '}
          <Link to="/menu">Menu</Link>
        </nav>
      </div>
      <Routes>
        <Route
          path="/newReservation"
          element={
            <PrivateRoute>
              <NewReservation />
            </PrivateRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<Menu />} />
        <Route
          path="/"
          element={
            <div>
              <h2>Bienvenue</h2>
              <p>Utilisez la navigation ci-dessus pour accéder aux pages.</p>
            </div>
          }np
        />
      </Routes>
    </Router>
  );
}

export default App;
