import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'

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
  chooseProfile: function(){
    return Meteor.user().profile.typeProfile == 'user'
  }
})
