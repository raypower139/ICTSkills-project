'use strict';

const logger = require('../utils/logger');
const memberStore = require('../models/member-store.js');
const uuid = require('uuid');
const accounts = require('./accounts.js');
const member = require('./member.js');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    
    const loggedInUser = accounts.getCurrentMember(request);
     if (loggedInUser.trainer === true) {
      logger.info('This user is a trainer');
      response.redirect('/trainerdashboard');
    }
    else{
    
    const viewData = {
      
      title: 'Member Dashboard',
      
      members: memberStore.getMemberById(loggedInUser.id),
      member: loggedInUser,
     
    };
    logger.info('about to render', memberStore.getMemberById());
    response.render('member', viewData);
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
  
   addAssessment(request, response) {
    const memberId = request.params.id;
    const member = memberStore.getMember(memberId);
    const newAssessment = {
      id: uuid(),
      date:new Date(),
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperarm: request.body.upperarm,
      waist: request.body.waist,
      hips: request.body.hips,
      comment: request.body.comment,
      
    };
    logger.debug('New Assessment = ', newAssessment);
    memberStore.addAssessment(memberId, newAssessment);
    response.redirect('/member/' + memberId);
  },
  
  
   deleteMember(request, response) {
    const memberId = request.params.id;
    logger.debug(`Deleting Member ${memberId}`);
    memberStore.removeMember(memberId);
    response.redirect('/dashboard');
  },
};

module.exports = dashboard;
