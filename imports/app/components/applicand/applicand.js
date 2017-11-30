import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'

import './applicand.html'

Template.applicand.helpers({
  profileName: function(userId){
    var user = Meteor.users.findOne({_id: userId})
    if(user){
      var name = user.profile.name
      return name.name + ' ' + name.firstLastName + ' ' + name.secondLastName
    }
    return 'no name'
  },
  profileEmail: function(userId){
    var user = Meteor.users.findOne({_id: userId})
    if(user){
      var email = user.emails[0].address
      return email
    }
    return 'no email'
  },
  profileNumber: function(userId){
    var user = Meteor.users.findOne({_id: userId})
    if(user){
      var number = user.profile.number
      return number
    }
    return 'no number'
  }
})
