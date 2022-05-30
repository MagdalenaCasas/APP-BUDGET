const { DataTypes } = require("sequelize");

const sequelize = require("../config/db");

const Budget= sequelize.define(
  "budget",
  {
    type: {
        type: DataTypes.ENUM(
          'INCOME',
          'EGRESS'
        ),
        allowNull: false,
      },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    concept: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "budget",
    underscored: true,
  }
);

module.exports = Budget;