const Sequelize = require('sequelize');

module.exports = class Users extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        nickname: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        // profileImg: {
        //   type: Sequelize.STRING,
        //   allowNull: false,
        // },
        snsId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: 'Users',
        tableName: 'users',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }
  static associate(db) {
    db.Users.hasMany(db.Posts, { foreignKey: 'userId', sourceKey: 'userId' });
    db.Users.hasMany(db.Comments, {
      foreignKey: 'userId',
      sourceKey: 'userId',
    });
  }
};
