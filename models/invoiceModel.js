const { Sequelize, DataTypes } = require('sequelize');
const connection = require('../config/databaseConnection')


const Invoice = connection.define('Invoice', {
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    client_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    item: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.STRING,
        allowNull: false
    },
    unit_price: {
        type: DataTypes.STRING,
        allowNull: false
    },
    total: {
        type: DataTypes.STRING, 
        allowNull: false
    }
  }, {
    // Other model options go here
  });
  
module.exports = Invoice