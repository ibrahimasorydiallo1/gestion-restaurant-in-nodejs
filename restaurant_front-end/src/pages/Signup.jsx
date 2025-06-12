// src/pages/Signup.jsx
import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/api/auth/signup', {
        email,
        password,
        firstName,
        lastName,
        phone,
      });

      const token = res.data.token;
      localStorage.setItem('token', token);
      alert('Inscription réussie !');
      // Optionnel : rediriger vers login ou autre
      // window.location.href = '/login';
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Erreur lors de l'inscription.");
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Inscription</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />
        <input
          type="text"
          placeholder="Prénom"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        /><br /><br />
        <input
          type="text"
          placeholder="Nom"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        /><br /><br />
        <input
          type="tel"
          placeholder="Téléphone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        /><br /><br />
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}

export default Signup;
