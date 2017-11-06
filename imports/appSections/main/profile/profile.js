import { Template } from 'meteor/templating'

import './profile.html'

Template.profile.helpers({
  hasStudies: function(){
    return (Meteor.user().profile.studies.length == 0)? false: true
  },
  hasJobs: function(){
    return (Meteor.user().profile.jobs.length == 0)? false: true
  }
})
