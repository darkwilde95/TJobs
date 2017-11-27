import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'

import './main.html'
import './home/home'
import './resume/resume'
import './settings/settings'
import './userProfile/userProfile'
import './publishOffer/publishOffer'
import './notifications/notifications'
import './enterpriseProfile/enterpriseProfile'

Template.mainHeader.onCreated(function(){
  $(document).ready(function(){
    $('ul.tabs').tabs();
  })
})

Template.mainHeader.helpers({
  chooseType: function(){
    var aux = Meteor.user()
    return (aux) ? aux.profile.typeProfile == 'user' : false
  }
})

Template.mainContent.helpers({
  chooseType: function(){
    var aux = Meteor.user()
    return (aux) ? aux.profile.typeProfile == 'user' : false
  }
})
