import { Template } from 'meteor/templating'
import { City } from '/imports/db/city'

import './userProfile.html'
import './studiesSection/studiesSection'
import './jobsSection/jobsSection'

Template.userProfile.onRendered(function(){
  $(document).ready(function(){
    $('.collapsible').collapsible()
  })
})

Template.userProfile.helpers({
  userLocation: function(){
    return City.findOne({_id: Meteor.user().profile.location}).cit_name
  }
})
