const { MenuItem } = require('../models');

const getAllMenuItems = async (req, res) => {
  try {
    const { category, max_price } = req.query;
    
    const where = {};
    if (category) where.category = category;
    if (max_price) where.price = { [Op.lte]: max_price };

    const menuItems = await MenuItem.findAll({ where });

    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu items', error: error.message });
  }
};

module.exports = { getAllMenuItems };