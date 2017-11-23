import { Job } from '/imports/db/job'
import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'

import './jobsSection.html'
import './jobRegister/jobRegister'

Template.jobsSection.helpers({
  hasJobs: function(){
    return Job.find({job_use_id: Meteor.userId()}).count() > 0
  },
  userJobs: function(){
    return Job.find({job_use_id: Meteor.userId()})
  }
})
