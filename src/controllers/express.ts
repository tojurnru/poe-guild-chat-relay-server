import createError from 'http-errors';
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import indexRouter from '../routes/index';
import apiRouter from '../routes/api';

const { NODE_ENV } = process.env;

// setup express
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/api', apiRouter);

/**
 * catch 404 and forward to error handler
 */
app.use((req, res, next) => {
  next(createError(404));
});

/**
 * error handler
 */
// eslint-disable-next-line
app.use((err, req, res, next) => {
  const locals = res.locals;
  const status = err.status || 500;

  locals.status = status;
  locals.message = err.message;

  if (NODE_ENV === 'development') {
    err.stacks = err.stack.split('\n');
    locals.error = err;
  }

  // return error
  res.status(status);
  res.json(locals);
});

export default app;
