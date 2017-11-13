import { Template } from 'meteor/templating'
import { Accounts } from 'meteor/accounts-base'
import { ReactiveVar } from 'meteor/reactive-var'

import './registerEnterprise.html'

var regEnterpriseP = new ReactiveVar(0)
var regEnterpriseN = new ReactiveVar(false)

function registerEnterpriseEvent(event) {
  var password1 = $('#registerE_password').val()
  var password2 = $('#registerE_password2').val()
  var enterpriseNumber = $('#registerE_number').val()
  var submit = $('#registerE_submit')
  if(password1.length < 8 || password2.length < 8){
    regEnterpriseP.set(1) //Error 1 es de tamaño de contraseña
  }else if(password1 != password2) {
    regEnterpriseP.set(2) //Error 2 es de diferencia de contraseña
  }else{
    regEnterpriseP.set(0) //No hay error en contraseñas
  }
  if(enterpriseNumber >= 1000000 && enterpriseNumber <= 9999999999){
    regEnterpriseN.set(false) //No hay error en el numero
  }else{
    regEnterpriseN.set(true)  //El numero no es valido
  }
  if(regEnterpriseP.get() > 0 || regEnterpriseN.get()){
    if(!submit.hasClass('disabled')) submit.addClass('disabled')
    if(event.keyCode == 13){
      event.preventDefault()
    }
    return false
  }
  var enterpriseName = $('#registerE_name').val()
  var enterpriseLocation = $('#registerE_location').val()
  var enterpriseEmail = $('#registerE_email').val()
  if(enterpriseName && enterpriseLocation && enterpriseNumber
    && enterpriseEmail){
    if(submit.hasClass('disabled')) submit.removeClass('disabled')
    return false
  }
  if(!submit.hasClass('disabled')) submit.addClass('disabled')
  if(event.keyCode == 13){
    event.preventDefault()
  }
}

Template.registerEnterprise.onCreated(function(){
  regEnterpriseP.set(0)
  regEnterpriseN.set(false)
  $(document).ready(function(){
    $('#registerE_location').on('change', function(event) {
      registerEnterpriseEvent(event)
    })
  })
})

Template.registerEnterprise.helpers({
  registerE_EPass: function(){
    if(regEnterpriseP.get() == 1){
      return 'El tamaño minimo de contraseña debe ser 8'
    }else if(regEnterpriseP.get() == 2){
      return 'Las contraseñas no coinciden'
    }else{
      return ''
    }
  },
  registerE_ENum: function(){
    if(regEnterpriseN.get()){
      return 'Teléfono inválido'
    }else{
      return ''
    }
  }
})

Template.registerEnterprise.events({
  'click #registerE_submit'(event){
    event.preventDefault()
    var enterpriseName = $('#registerE_name').val()
    var enterpriseLocation = $('#registerE_location').val()
    var enterpriseNumber = $('#registerE_number').val()
    var enterpriseEmail = $('#registerE_email').val()
    var password1 = $('#registerE_password').val()
    var password2 = $('#registerE_password2').val()
    var enterpriseProfile = {
      email: enterpriseEmail,
      password: password1,
      profile: {
        typeProfile: 'enterprise',
        name: enterpriseName,
        number: enterpriseNumber,
        location: enterpriseLocation
      }
    }
    Accounts.createUser(enterpriseProfile)
  },
  'keyup, keydown'(event){
    registerEnterpriseEvent(event)
  }
})
