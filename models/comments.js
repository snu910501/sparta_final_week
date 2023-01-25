const Sequelize = require('sequelize');

module.exports = class Comments extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        commentId: {
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
        postId: {
          allowNell: false,
          type: Sequelize.INTEGER,
        },
        content: {
          allowNull: false,
          type: Sequelize.STRING(100),
        },
        parentCommentId: {
          allowNull: true,
          type: Sequelize.INTEGER,
        },
      },
      {
        sequelize,
        timestamps: true,
        createdAt: true,
        updatedAt: false,
        modelName: 'Comments',
        tableName: 'Comments',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    );
  }
  static associate(db) {
    db.Comments.belongsTo(db.Users, {
      foreignKey: 'userId',
      targetKey: 'userId',
      onDelete: 'cascade',
    });
    db.Comments.belongsTo(db.Posts, {
      foreignKey: 'postId',
      targetKey: 'postId',
      onDelete: 'cascade',
    });
    db.Comments.hasMany(db.Comments, {
      as: 'reComments',
      foreignKey: 'parentCommentId',
      targetKey: 'commentId',
    });
    db.Comments.belongsTo(db.Comments, {
      as: 'parentComment',
      foreignKey: 'parentCommentId',
      targetKey: 'commentId',
    });
  }
};
