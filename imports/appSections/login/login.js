import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'

import './login.html'

var loginError = new ReactiveVar(false)

Template.login.helpers({
  messageError: function(){
    if(loginError.get()){
      return 'Dirección de correo o contraseña inválidos'
    }else{
      return ''
    }
  }
})

Template.login.events({
  'click #login_submit'(event){
    event.preventDefault()
    var email = $('#login_email').val()
    var password = $('#login_password').val()
    Meteor.loginWithPassword(email, password, function(Error){
      if(Error){
        loginError.set(true)
      }else{
        loginError.set(false)
      }
    })
  },
  'keyup, keydown'(event){
    var email = $('#login_email').val()
    var password = $('#login_password').val()
    if(email && password && password.length >= 8){
      $('#login_submit').removeClass('disabled')
    }else{
      $('#login_submit').addClass('disabled')
      if(event.keyCode == 13){
        event.preventDefault()
      }
    }
  },
  'click a'(){
    loginError.set(false)
  }
})
