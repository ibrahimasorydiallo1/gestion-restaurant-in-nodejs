import React from 'react';

function Plat({ plat }) {
  const price = Number(plat.price);
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', display: 'flex', gap: '10px' }}>
      {plat.image && (
        <img src={plat.image} alt={plat.name} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 8 }} />
      )}
      <div>
        <h4>{plat.name} - {isNaN(price) ? 'Prix indisponible' : price.toFixed(2)} €</h4>
        <p>{plat.description}</p>
      </div>
    </div>
  );
}

export default Plat;