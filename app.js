require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
app.set('port', process.env.PORT || '3001');
const { sequelize } = require('./models');
const indexRouter = require('./routes');
const errorHandler = require('./modules/errorHandler');

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
app.use('/', indexRouter);
app.use(errorHandler);

const server = app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
