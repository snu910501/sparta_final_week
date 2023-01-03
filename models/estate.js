const Sequelize = require("sequelize");

module.exports = class Estate extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        estateId: {
          type: Sequelize.STRING,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        address: {
          type: Sequelize.STRING,
          allowNull: false,
        }
      },
      {
        sequelize,
        timestamps: true,
        modelName: "Estate",
        tableName: "estates",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {

  }
};
