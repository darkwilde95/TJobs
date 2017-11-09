import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { Tracker } from 'meteor/tracker'

import './main.html'
import './home/home'
import './search/search'
import './publishOffer/publishOffer'
import './userProfile/userProfile'
import './enterpriseProfile/enterpriseProfile'
import './settings/settings'

Template.main.onCreated(function(){
  $(document).ready(function(){
    $('ul.tabs').tabs();
  })
})

Template.main.helpers({
  chooseType: function(){
    return Meteor.user().profile.typeProfile == 'user'
  }
})

Template.main.onRendered(function(){
  if(Meteor.user().profile.typeProfile == 'user'){
    $('#publishOffer').css('display', 'none')
    $('#enterpriseProfile').css('display', 'none')
  }else{
    $('#search').css('display', 'none')
    $('#userProfile').css('display', 'none')
  }
})
