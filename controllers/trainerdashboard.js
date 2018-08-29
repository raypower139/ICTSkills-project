'use strict';

const logger = require('../utils/logger');
const memberStore = require('../models/member-store.js');
const uuid = require('uuid');
const accounts = require('./accounts.js');

const trainerdashboard = {
  index(request, response) {
    logger.info('Trainer dashboard rendering');
    
    const viewData = {
      
      title: 'Trainer Dashboard',
      members: memberStore.getAllMembers(),
    };
    logger.info('about to render', memberStore.getAllMembers());
    response.render('trainerdashboard', viewData);
    
  },
  
    
   addMember(request, response) {
    const newMember = {
      id: uuid(),
      membername: request.body.membername,
      email: request.body.email,
      password: request.body.password,
      address: request.body.address,
      gender: request.body.gender,
      height: request.body.height,
      startingweight: request.body.startingweight,
      assessments: [],
    };
    memberStore.addMember(newMember);
    response.redirect('/dashboard');
  },
  
   deleteMember(request, response) {
    const memberId = request.params.id;
    logger.debug(`Deleting Member ${memberId}`);
    memberStore.removeMember(memberId);
    response.redirect('/dashboard');
  },
};

module.exports = trainerdashboard;