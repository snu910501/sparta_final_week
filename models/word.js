const Sequelize = require("sequelize");

module.exports = class Word extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        wordId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        word: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        score: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        }
      },
      {
        sequelize,
        timestamps: true,
        modelName: "Word",
        tableName: "words",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {

  }
};
