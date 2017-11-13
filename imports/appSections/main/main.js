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
