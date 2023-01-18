const Sequelize = require("sequelize");

module.exports = class ReviewImage extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        reviewImageId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
        },
        reviewId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        key: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        url: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "ReviewImage",
        tableName: "reviewImages",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {

  }
};
