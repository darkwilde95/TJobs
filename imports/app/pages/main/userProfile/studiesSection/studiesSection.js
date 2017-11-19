import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'

import './studiesSection.html'
import './studyRegister/studyRegister'

Template.studiesSection.helpers({
  hasStudies: function(){
    var user = Meteor.user()
    if(user){
      return (user.profile.studies.length > 0)? true : false
    }else{
      return false
    }
  }
})
