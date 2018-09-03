'use strict';


const logger = require('../utils/logger');
const uuid = require('uuid');
const memberStore = require('../models/member-store');

const accounts = {

  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },

  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },

  logout(request, response) {
    response.cookie('member', '');
    response.redirect('/');
  },

  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },

  
  
  register(request, response) {
    const member = {
      id: uuid(),
      membername: request.body.membername,
      email: request.body.email,
      password: request.body.password,
      address: request.body.address,
      gender: request.body.gender,
      height: request.body.height,
      startingweight: request.body.startingweight,
      assessments: [],
    }
    
    
    memberStore.addMember(member);
    logger.info(`registering ${member.email}`);
    response.redirect('/login');
  },

  authenticate(request, response) {
    const member = memberStore.getMemberByEmail(request.body.email);
    if (member) {
      response.cookie('member', member.email);
      logger.info(`logging in ${member.email}`);
      response.redirect('/dashboard');
    } else {
      response.redirect('/login');
    }
  },

  getCurrentMember(request) {
    const memberEmail = request.cookies.member;
    return memberStore.getMemberByEmail(memberEmail);
  },
};

module.exports = accounts;