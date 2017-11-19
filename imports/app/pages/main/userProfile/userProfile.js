import { Template } from 'meteor/templating'
import { City } from '/imports/db/city'
import { Meteor } from 'meteor/meteor'

import './userProfile.html'
import './studiesSection/studiesSection'
import './jobsSection/jobsSection'

Template.userProfile.onCreated(function(){
  $(document).ready(function(){
    $('.collapsible').collapsible()
  })
})

Template.userProfile.helpers({
  userLocation: function(){
    var user = Meteor.user()
    if(user){
      return City.findOne({_id: user.profile.location}).cit_name
    }else{
      return ''
    }
  }
})
