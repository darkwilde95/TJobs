import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'

import './settings.html'

Template.settings.events({
  'click #settings_logout'(event){
    event.preventDefault()
    Meteor.logout()
  },

  'click #settings_deleteProfile'(event){
    event.preventDefault()
    Meteor.call('deleteProfile')
  }
})
