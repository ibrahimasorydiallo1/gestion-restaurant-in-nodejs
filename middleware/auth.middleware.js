const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const SECRET_KEY = '4d2e69fa5a8f9b94b28f9b5e9d8b1e2f6e79b3c5f8a4d5e8d1c2f3e4f5a6b7c8';

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization header malformed or missing' });
    }

    const token = authHeader.split(' ')[1];
    console.log("Token reçu :", token);

    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user; // Ajoute l'utilisateur à la requête
    next();
  } catch (error) {
    console.error('Erreur middleware auth :', error.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Admin access required' });
  }
};

module.exports = {
  authMiddleware,
  isAdmin
}; 