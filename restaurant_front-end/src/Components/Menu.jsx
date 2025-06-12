import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Categorie from './Categorie';

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/menu') // backend : SELECT * FROM menu_items
      .then(res => {
        setMenuItems(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Erreur lors du chargement du menu');
        setLoading(false);
      });
  }, []);

  // Regrouper les plats par catégorie
  const categories = menuItems.reduce((acc, plat) => {
    if (!acc[plat.category]) acc[plat.category] = [];
    acc[plat.category].push(plat);
    return acc;
  }, {});

  if (loading) return <p>Chargement du menu...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Menu du Restaurant</h1>
      {Object.keys(categories).map(category => (
        <Categorie key={category} name={category} plats={categories[category]} />
      ))}
    </div>
  );
}

export default Menu;
