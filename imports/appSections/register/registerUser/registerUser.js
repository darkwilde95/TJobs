import { Template } from 'meteor/templating'
import { Accounts } from 'meteor/accounts-base'

import './registerUser.html'

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
    if(password1 == password2){
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
      Router.go('mainActivity')
    }
  }

})
