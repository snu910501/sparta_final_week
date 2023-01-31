const Sequelize = require('sequelize');

const Users = require('./users');
const Posts = require('./posts');
const Comments = require('./comments');
const Refreshs = require('./refresh');
const Estate = require('./estate');
const EstateInfo = require('./estateInfo');
const Review = require('./review');
const Word = require('./word');
const DistrictDo = require('./districtDo');
const DistrictCity = require('./districtCity');
const DistrictDong = require('./districtDong');
const ReviewImage = require('./reviewImage');
const ZoomLevelFour = require('./zoomLevelFour');
const ZoomLevelThree = require('./zoomLevelThree');

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
db.Estate = Estate;
db.EstateInfo = EstateInfo;
db.Review = Review;
db.Word = Word;
db.DistrictDo = DistrictDo;
db.DistrictCity = DistrictCity;
db.DistrictDong = DistrictDong;
db.ReviewImage = ReviewImage;
db.Users = Users;
db.Posts = Posts;
db.Comments = Comments;
db.Refreshs = Refreshs;
db.ZoomLevelFour = ZoomLevelFour;
db.ZoomLevelThree = ZoomLevelThree;

Users.init(sequelize);
Posts.init(sequelize);
Comments.init(sequelize);
Refreshs.init(sequelize);
Estate.init(sequelize);
EstateInfo.init(sequelize);
Review.init(sequelize);
Word.init(sequelize);
DistrictDo.init(sequelize);
DistrictCity.init(sequelize);
DistrictDong.init(sequelize);
ReviewImage.init(sequelize);
ZoomLevelFour.init(sequelize);
ZoomLevelThree.init(sequelize);

Users.associate(db);
Posts.associate(db);
Comments.associate(db);
Refreshs.associate(db);

module.exports = db;
