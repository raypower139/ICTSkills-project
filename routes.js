'use strict';

const express = require('express');
const router = express.Router();
const accounts = require('./controllers/accounts.js');
const trainerdashboard = require('./controllers/trainerdashboard.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const member = require('./controllers/member.js');

router.get('/', accounts.index);
router.get('/dashboard', dashboard.index);
router.get('/trainerdashboard', trainerdashboard.index);
router.get('/about', about.index);
router.get('/member/:id', member.index);
router.get('/member/:id/deleteassessment/:assessmentid', member.deleteAssessment);
router.get('/dashboard/deletemember/:id', dashboard.deleteMember);

router.post('/member/:id/addassessment', member.addAssessment);
router.post('/dashboard/addmember', dashboard.addMember);

router.get('/', accounts.login);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

module.exports = router;
