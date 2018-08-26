'use strict';

const _ = require('lodash');

const memberStore = {

memberCollection:require('./member-store.json').memberCollection,

 getAllMembers() {
    return this.memberCollection;
  },

  getMember(id) {
     return _.find(this.memberCollection, { id: id });
  },
  
   addAssessment(id, assessment) {
    const member = this.getMember(id);
    member.assessments.push(assessment);
  },
  
   removeAssessment(id, assessmentId) {
    const member = this.getMember(id);
    // remove the assessment with id assessemntId from the member
      _.remove(member.assessments, { id: assessmentId });
  },
}; 

module.exports = memberStore;
