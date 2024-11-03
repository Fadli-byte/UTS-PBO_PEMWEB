// models/Account.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // sesuaikan dengan pengaturan database Anda

class Account extends Model {}

Account.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: 'Accounts',
    tableName: 'accounts',
    timestamps: false, // jika Anda menggunakan timestamp otomatis, ubah ini
});

module.exports = Account;
