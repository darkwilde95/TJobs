import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'

import './login.html'

Template.login.events({

  'click #login_submit'(event){
    event.preventDefault()
    var email = $('#login_email').val()
    var password = $('#login_password').val()
    Meteor.loginWithPassword(email, password)
    Router.go('mainActivity')
  }

})
