const Sequelize = require('sequelize');
const User = require('./user');
const Estate = require('./estate');
const EstateInfo = require('./estateInfo');
const Review = require("./review");
const Word = require('./word');

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
db.Estate = Estate;
db.EstateInfo = EstateInfo;
db.Review = Review;
db.Word = Word;

Estate.init(sequelize);
EstateInfo.init(sequelize);
Review.init(sequelize);
Word.init(sequelize);

module.exports = db;