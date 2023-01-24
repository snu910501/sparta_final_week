const Sequelize = require('sequelize');

module.exports = class Posts extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        postId: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userId: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        email: {
          type: Sequelize.STRING,
        },
        title: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        postImage: {
          allowNull: true,
          type: Sequelize.STRING(10000),
        },
        content: {
          allowNull: false,
          type: Sequelize.STRING(10000),
        },
        postLocation1: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        postLocation2: {
          allowNull: false,
          type: Sequelize.STRING,
        },
      },
      {
        sequelize,
        timestamps: true,
        createdAt: true,
        updatedAt: false,
        modelName: 'Posts',
        tableName: 'Posts',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }
  static associate(db) {
    db.Posts.belongsTo(db.Users, {
      foreignKey: 'userId',
      targetKey: 'userId',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    db.Posts.hasMany(db.Comments, {
      foreignKey: 'postId',
      sourceKey: 'postId',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  }
};
