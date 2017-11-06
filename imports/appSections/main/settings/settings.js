import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'

import './settings.html'

Template.settings.events({
  'click #settings_logout'(event){
    event.preventDefault()
    Meteor.logout()
    Router.go('loginActivity')
  },

  'click #settings_deleteProfile'(event){
    event.preventDefault()
    console.log("En construcción")
  }
})
