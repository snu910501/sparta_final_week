const Sequelize = require('sequelize');

module.exports = class Users extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        snsId: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        email: {
          allowNull: true,
          type: Sequelize.STRING,
        },
      },
      {
        sequelize,
        timestamps: true,
        createdAt: true,
        updatedAt: false,
        modelName: 'Users',
        tableName: 'Users',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }
  static associate(db) {
    db.Users.hasMany(db.Posts, {
      foreignKey: 'userId',
      sourceKey: 'userId',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    db.Users.hasMany(db.Comments, {
      foreignKey: 'userId',
      sourceKey: 'userId',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  }
};
