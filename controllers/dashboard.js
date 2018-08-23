'use strict';

const logger = require('../utils/logger');
const sonatas = require('../models/member-store.js');
const memberCollection = require('../models/member-store.js');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const viewData = {
      title: 'Playlist Dashboard',
      members: memberCollection,
    };
    logger.info('about to render', memberCollection);
    response.render('dashboard', viewData);
  },
};

module.exports = dashboard;
