import { Template } from 'meteor/templating'

import './jobsSection.html'
import './jobItem/jobItem'
import './jobRegister/jobRegister'

Template.jobsSection.helpers({
  hasJobs: function(){
    return (Meteor.user().profile.jobs.length == 0)? false: true
  }
})
