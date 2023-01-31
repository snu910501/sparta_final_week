const Sequelize = require("sequelize");

module.exports = class EstateInfo extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        estateInfoId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        reviewId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        estateId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        communication: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        bug: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        smell: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        floor_noise: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        walls_noise: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        town_noise: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        mold: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        parking: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        safe: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

      },
      {
        sequelize,
        timestamps: true,
        modelName: "EstateInfo",
        tableName: "estateInfos",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {

  }
};
