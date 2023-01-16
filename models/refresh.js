const Sequelize = require('sequelize');

module.exports = class Refreshs extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        refreshId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        refreshToken: {
          allowNull: true,
          type: Sequelize.STRING,
        },
      },
      {
        sequelize,
        timestamps: true,
        createdAt: true,
        updatedAt: false,
        modelName: 'Refreshs',
        tableName: 'Refreshs',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }
  static associate(db) {
    db.Refresh.belongsTo(db.Users, {
      foreignKey: 'userId',
      sourceKey: 'userId',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  }
};
