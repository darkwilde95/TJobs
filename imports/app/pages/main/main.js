import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'

import './main.html'
import './home/home'
import './resume/resume'
import './search/search'
import './settings/settings'
import './userProfile/userProfile'
import './publishOffer/publishOffer'
import './enterpriseProfile/enterpriseProfile'

Template.main.onCreated(function(){
  $(document).ready(function(){
    $('ul.tabs').tabs();
    var minHeight = $(window).height() - parseInt($('.content').css('margin-top'))
    minHeight -= ($('.nav-content').height() + 24)
    $('#home').css('min-height', minHeight)
  })
})

Template.main.helpers({
  chooseType: function(){
    var aux = Meteor.user()
    return (aux == null)? false : aux.profile.typeProfile == 'user'
  }
})
