const Sequelize = require('sequelize');
const Users = require('./users');
const Posts = require('./posts');
const Comments = require('./comments');
const Refreshs = require('./refresh');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

db.sequelize = sequelize;

db.Users = Users;
db.Posts = Posts;
db.Comments = Comments;
db.Refreshs = Refreshs;

Users.init(sequelize);
Posts.init(sequelize);
Comments.init(sequelize);
Refreshs.init(sequelize);

Users.associate(db);
Posts.associate(db);
Comments.associate(db);
Refreshs.associate(db);

module.exports = db;
