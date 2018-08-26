'use strict';

const logger = require('../utils/logger');
const memberStore = require('../models/member-store.js');
const uuid = require('uuid');
const accounts = require('./accounts.js');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    
    const loggedInUser = accounts.getCurrentMember(request);
     if (loggedInUser.trainer === true) {
      logger.info('This user is a trainer');
      response.redirect('/signup');
    }
    else{
    
    const viewData = {
      
      title: 'Member Dashboard',
      members: memberStore.getAllMembers(),
    };
    logger.info('about to render', memberStore.getAllMembers());
    response.render('dashboard', viewData);
    }
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

module.exports = dashboard;
