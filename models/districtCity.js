const Sequelize = require("sequelize");

module.exports = class DistrictCity extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        cityId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        cityName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        review: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "DistrictCity",
        tableName: "districtCitys",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {

  }
};
