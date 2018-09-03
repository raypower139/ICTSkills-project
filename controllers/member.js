'use strict';

const logger = require('../utils/logger');
const memberStore = require('../models/member-store.js');
const uuid = require('uuid');
const dashboard = require('./dashboard.js');

const member = {
  index(request, response) {
    const memberId = request.params.id;
    logger.debug('Member id = ', memberId);
    const viewData = {
      title:'Member',
      member:memberStore.getMember(memberId),
      bmi:'2',
      
      
    };
    response.render('member', viewData);
  },
  
   addAssessment(request, response) {
    const memberId = request.params.id;
    const member = memberStore.getMember(memberId);
    const dates = new Date();
    const newAssessment = {
      id: uuid(),
      day: dates.getDay(), 
      month:dates.getMonth(),
      year:dates.getFullYear(),
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
  
   deleteAssessment(request, response) {
    const memberId = request.params.id;
    const assessmentId = request.params.assessmentid;
    logger.debug(`Deleting Assessment ${assessmentId} from Member ${memberId}`);
    memberStore.removeAssessment(memberId, assessmentId);
    response.redirect('/member/' + memberId);
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

};

module.exports = member;