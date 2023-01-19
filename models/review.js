const Sequelize = require("sequelize");

module.exports = class Review extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        reviewId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        estateId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        // nickname: {
        //   type: Sequelize.STRING,
        //   allowNull: false,
        // },
        good: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        bad: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        star: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        residence_type: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        transaction_type: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        deposit: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        monthly_payment: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        acreage: {
          type: Sequelize.INTEGER,
          allowNull: false,
        }
      },
      {
        sequelize,
        timestamps: true,
        modelName: "Review",
        tableName: "reviews",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {

  }
};
