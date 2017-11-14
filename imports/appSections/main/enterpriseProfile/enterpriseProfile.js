import { Template } from 'meteor/templating'
import { City } from '/imports/db/city'
import { Meteor } from 'meteor/meteor'

import './enterpriseProfile.html'
import './branchOfficeSection/branchOfficeSection'

Template.enterpriseProfile.onCreated(function(){
  $(document).ready(function(){
    $('.collapsible').collapsible()
  })
})

Template.enterpriseProfile.helpers({
  enterpriseLocation: function(){
    var user = Meteor.user()
    if(user){
      return City.findOne({_id: user.profile.location}).cit_name
    }else{
      return ''
    }
  }
})
