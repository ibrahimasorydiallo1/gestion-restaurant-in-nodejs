import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:3000/api/my-reservations', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReservations(res.data);
    } catch (error) {
      alert("Erreur lors du chargement des réservations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Voulez-vous vraiment annuler cette réservation ?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/api/reservations/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReservations(reservations.filter(r => r.id !== id));
      alert('Réservation annulée');
    } catch (error) {
      alert("Erreur lors de l'annulation");
    }
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Mes Réservations</h2>
      {reservations.length === 0 ? (
        <p>Vous n'avez aucune réservation.</p>
      ) : (
        <ul>
          {reservations.map(r => (
            <li key={r.id}>
              <strong>{r.date} à {r.time}</strong> - {r.numberOfPeople} personne(s)
              {r.note && <p>Note : {r.note}</p>}
              <button onClick={() => handleDelete(r.id)}>Supprimer</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyReservations;
