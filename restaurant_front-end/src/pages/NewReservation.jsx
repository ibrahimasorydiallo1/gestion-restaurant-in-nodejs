import React, { useState } from 'react';
import axios from 'axios';

function NewReservation() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    nb_personnes: 1,
    date: '',
    time: '',
    note: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const { name, phone, nb_personnes, date, time } = formData;
    if (!name || !phone || !nb_personnes || !date || !time) {
      setError('Tous les champs obligatoires doivent être remplis');
      return false;
    }
    if (Number(nb_personnes) <= 0) {
      setError('Le nombre de personnes doit être supérieur à 0');
      return false;
    }
    const today = new Date();
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      setError('La date doit être aujourd’hui ou ultérieure');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  try {
    await axios.post('http://localhost:3000/api/reservations', {
      name: formData.name,
      phone: formData.phone,
      numberOfPeople: formData.nb_personnes,
      date: formData.date,
      time: formData.time,
      note: formData.note,
    });

    alert('Réservation créée avec succès !');
    setFormData({
      name: '',
      phone: '',
      nb_personnes: 1,
      date: '',
      time: '',
      note: ''
    });
    setError('');
  } catch (err) {
    const msg = err.response?.data?.message || "Erreur lors de la création de la réservation";
    setError(msg);
  }
};

  return (
    <div>
      <h2>Nouvelle Réservation</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nom"
          value={formData.name}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="tel"
          name="phone"
          placeholder="Téléphone"
          value={formData.phone}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="number"
          name="nb_personnes"
          min="1"
          placeholder="Nombre de personnes"
          value={formData.nb_personnes}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        /><br /><br />
        <textarea
          name="note"
          placeholder="Note (facultatif)"
          value={formData.note}
          onChange={handleChange}
        /><br /><br />
        <button type="submit">Réserver</button>
      </form>
    </div>
  );
}

export default NewReservation;
