const Sequelize = require('sequelize');
const Example = require('./example');

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

db.Example = Example;

Example.init(sequelize);

module.exports = db;