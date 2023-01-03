const Sequelize = require('sequelize');
const User = require('./user');
const Estate = require('./estate');
const EstateInfo = require('./estateInfo');
const Review = require("./review");

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + "/../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.User = User;
db.Estate = Estate;
db.EstateInfo = EstateInfo;
db.Review = Review;


User.init(sequelize);
Estate.init(sequelize);
EstateInfo.init(sequelize);
Review.init(sequelize);

module.exports = db;