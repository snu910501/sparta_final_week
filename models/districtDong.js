const Sequelize = require("sequelize");

module.exports = class DistrictDong extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        dongId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        dongName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        review: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        lat: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lng: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "DistrictDong",
        tableName: "districtDongs",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {

  }
};
