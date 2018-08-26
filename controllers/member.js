'use strict';

const logger = require('../utils/logger');
const memberStore = require('../models/member-store.js');

const member = {
  index(request, response) {
    const memberId = request.params.id;
    logger.debug('Member id = ', memberId);
    const viewData = {
      title:'Member',
      member:memberStore.getMember(memberId),
      
      
    };
    response.render('member', viewData);
  },
  
   addAssessment(request, response) {
    const memberId = request.params.id;
    const member = memberStore.getMember(memberId);
    const newAssessment = {
      
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperarm: request.body.upperarm,
      waist: request.body.waist,
      hips: request.body.hips,
      comment: request.body.comment,
      
    };
    memberStore.addAssessment(memberId, newAssessment);
    response.redirect('/member/' + memberId);
  },
};

module.exports = member;