/* eslint-disable no-console */

import express from 'express';
import jwt from 'jsonwebtoken';
import { createServer } from 'http';

import './config/db';
import constants from './config/constants';

import middlewares from './config/middlewares';
import User from './models/User';

import CRON from './services/cron-script';

const app = express();

const path = require('path');

app.use('/static', express.static(path.join(__dirname + '/public')));

middlewares(app);

app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/verify/:token', async (req, res) => {
  const { token } = req.params;
  // validate token
  try {
    const user = jwt.verify(token, constants.JWT_SECRET);
    await User.findByIdAndUpdate(user._id, { isEmailVerified: true });
    res.sendFile(path.join(__dirname, '/public/verify.html'));
  } catch (error) {
    console.log(error);
    res.redirect('/404');
  }
});

app.get('/forgot/:token', async (req, res) => {
  const { token } = req.params;
  // validate token
  try {
    const user = jwt.verify(token, constants.JWT_SECRET);
    console.log(user);
    res.sendFile(path.join(__dirname, '/public/forgotPassword.html'));
  } catch (error) {
    console.log(error);
    res.redirect('/404');
  }
});

app.post('/forgot/:token', async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  // validate token
  try {
    const user = jwt.verify(token, constants.JWT_SECRET);
    const me = await User.findById(user._id);
    me.password = password;
    await me.save();
    res.json({ status: 200, message: 'Success' });
  } catch (error) {
    console.log(error);
    res.redirect('/404');
  }
});

app.get('/policy', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/policy.html'));
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/404.html'));
});

const graphQLServer = createServer(app);

// mocks().then(() => {
graphQLServer.listen(constants.PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`App listen to port: ${constants.PORT}`);
  }
});
