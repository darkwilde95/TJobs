import { Template } from 'meteor/templating'
import { Accounts } from 'meteor/accounts-base'

import './registerEnterprise.html'

Template.registerEnterprise.events({

  'click #registerE_submit'(event){
    event.preventDefault()
    var enterpriseName = $('#registerE_name').val()
    var enterpriseLocation = $('#registerE_location').val()
    var enterpriseNumber = $('#registerE_number').val()
    var enterpriseEmail = $('#registerE_email').val()
    var password1 = $('#registerE_password').val()
    var password2 = $('#registerE_password2').val()
    if(password1 == password2){
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
      Router.go('mainActivity')
    }
  }
})
