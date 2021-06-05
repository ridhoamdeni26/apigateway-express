require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// daftar yang ada di routes.js
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const courseRouter = require('./routes/courses');
const mediaRouter = require('./routes/media');
const orderPaymentRouter = require('./routes/orderPayments');
const refreshTokensRouter = require('./routes/refreshTokens');
const mentorsRouter = require('./routes/mentors');
const chapterRouter = require('./routes/chapters');
const lessonRouter = require('./routes/lessons');
const imageCourseRouter = require('./routes/image-courses');
const myCoursesRouter = require('./routes/my-courses');
const reviewRouter = require('./routes/review');
const webhookRouter = require('./routes/webhook');

const verifyToken = require('./middlewares/verifyToken');
const can = require('./middlewares/permission');

const app = express();

app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// daftar dari const di atas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/courses', courseRouter);
app.use('/media', verifyToken, can('admin', 'student'), mediaRouter);
app.use('/orders', verifyToken, can('admin', 'student'), orderPaymentRouter);
app.use('/refresh-tokens', refreshTokensRouter);
app.use('/mentors', verifyToken, can('admin'), mentorsRouter);
app.use('/chapters', verifyToken, can('admin'), chapterRouter);
app.use('/lessons', verifyToken, can('admin'), lessonRouter);
app.use('/image-courses', verifyToken, can('admin'), imageCourseRouter);
app.use('/my-courses', verifyToken, can('admin', 'student'), myCoursesRouter);
app.use('/reviews', verifyToken, can('admin', 'student'), reviewRouter);
app.use('/webhook', webhookRouter);

module.exports = app;
