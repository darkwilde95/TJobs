import { Template } from 'meteor/templating'
import { City } from '/imports/db/city'

import './userProfile.html'
import './studyRegister/studyRegister'
import './jobRegister/jobRegister'

Template.userProfile.helpers({
  userLocationHelper: function(){
    return City.findOne({_id: Meteor.user().profile.location}).cit_name
  },
  hasStudies: function(){
    return (Meteor.user().profile.studies.length == 0)? false: true
  },
  hasJobs: function(){
    return (Meteor.user().profile.jobs.length == 0)? false: true
  }
})
