import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'

import './jobsSection.html'
import './jobItem/jobItem'
import './jobRegister/jobRegister'

Template.jobsSection.helpers({
  hasJobs: function(){
    var user = Meteor.user()
    if(user){
      return (user.profile.jobs.length > 0)? true: false
    }else{
      return false
    }
  }
})
