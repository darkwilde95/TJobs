import { Template } from 'meteor/templating'
import { Accounts } from 'meteor/accounts-base'
import { ReactiveVar } from 'meteor/reactive-var'

import './registerUser.html'

var regUserP = new ReactiveVar(0)
var regUserN = new ReactiveVar(false)

function registerUserEvent(event){
  var password1 = $('#registerU_password').val()
  var password2 = $('#registerU_password2').val()
  var userNumber = $('#registerU_number').val()
  if(password1.length < 8 || password2.length < 8){
    regUserP.set(1) //Error 1 es de tamaño de contraseña
  }else if(password1 != password2) {
    regUserP.set(2) //Error 2 es de diferencia de contraseña
  }else{
    regUserP.set(0) //No hay error en contraseñas
  }
  if(userNumber >= 1000000 && userNumber <= 9999999999){
    regUserN.set(false) //No hay error en el numero
  }else{
    regUserN.set(true)  //El numero no es valido
  }
  if(regUserP.get() > 0 || regUserN.get()){
    $('#registerU_submit').addClass('disabled')
    if(event.keyCode == 13){
      event.preventDefault()
    }
    return false
  }
  var userName = $('#registerU_name').val()
  var userLastName1 = $('#registerU_lastName1').val()
  var userLastName2 = $('#registerU_lastName2').val()
  var userLocation = $('#registerU_location').val()
  var userGender = $('#registerU_gender').val()
  var userEmail = $('#registerU_email').val()
  if(userName && userLastName1 && userLastName2 && userLocation && userGender
    && userNumber && userEmail){
    $('#registerU_submit').removeClass('disabled')
    return false
  }
  $('#registerU_submit').addClass('disabled')
  if(event.keyCode == 13){
    event.preventDefault()
  }
}

Template.registerUser.onCreated(function(){
  regUserP.set(0)
  regUserN.set(false)
  $(document).ready(function(){
    $('#registerU_gender').on('change', function(event) {
      registerUserEvent(event)
    })
    $('#registerU_location').on('change', function(e) {
      registerUserEvent(event)
    })
  })
})

Template.registerUser.helpers({
  registerU_EPass: function(){
    if(regUserP.get() == 1){
      return 'El tamaño minimo de contraseña debe ser 8'
    }else if(regUserP.get() == 2){
      return 'Las contraseñas no coinciden'
    }else{
      return ''
    }
  },
  registerU_ENum: function(){
    if(regUserN.get()){
      return 'Teléfono inválido'
    }else{
      return ''
    }
  }
})

Template.registerUser.events({
  'click #registerU_submit'(event){
    event.preventDefault()
    var userName = $('#registerU_name').val()
    var userLastName1 = $('#registerU_lastName1').val()
    var userLastName2 = $('#registerU_lastName2').val()
    var userLocation = $('#registerU_location').val()
    var userGender = $('#registerU_gender').val()
    var userNumber = $('#registerU_number').val()
    var userEmail = $('#registerU_email').val()
    var password1 = $('#registerU_password').val()
    var password2 = $('#registerU_password2').val()
    var userProfile = {
      email: userEmail,
      password: password1,
      profile: {
        typeProfile: 'user',
        name:{
          name: userName,
          firstLastName: userLastName1,
          secondLastName: userLastName2
        },
        number: userNumber,
        location: userLocation,
        gender: userGender,
        studies: [],
        jobs: []
      }
    }
    Accounts.createUser(userProfile)
  },
  'keyup, keydown'(event){
    registerUserEvent(event)
  }
})
