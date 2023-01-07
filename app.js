const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const passport = require('passport');
const passportConfig = require('./passpost/index');
const app = express();
app.set('port', process.env.NODE_ENV || '3001');
const { sequelize } = require('./models');
const indexRouter = require('./routes');
passportConfig(passport);

const corsOption = {
  origin: '*',
  credentials: true,
  optionsSuccessStatus: 200,
};

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('DB 연결 되었습니다.');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors(corsOption));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: 'SECRET',
    resave: true,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);

const server = app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
