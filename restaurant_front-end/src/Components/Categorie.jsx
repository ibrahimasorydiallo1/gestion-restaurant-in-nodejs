import React from 'react';
import Plat from './Plat';

function Categorie({ name, plats }) {
  // Capitalisation de la catégorie
  const categoryName = name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <section>
      <h2>{categoryName}</h2>
      {plats.length === 0 ? (
        <p>Aucun plat dans cette catégorie.</p>
      ) : (
        plats.map(plat => <Plat key={plat.id} plat={plat} />)
      )}
    </section>
  );
}

export default Categorie;
