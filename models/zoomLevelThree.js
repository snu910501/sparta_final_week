const Sequelize = require("sequelize");

module.exports = class ZoomLevelThree extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        zoomLevelFourId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        estateId: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        swLat: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        swLng: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        neLat: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        neLng: {
          allowNull: false,
          type: Sequelize.STRING,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "ZoomLevelThree",
        tableName: "zoomLevelThrees",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {

  }
};
