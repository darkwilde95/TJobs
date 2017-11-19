import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'

import './branchOfficeSection.html'
import './branchOfficeRegister/branchOfficeRegister'

Template.branchOfficeSection.helpers({
  hasBranchOffices: function(){
    var user = Meteor.user()
    if(user){
      return (user.profile.branchOffices.length > 0)? true: false
    }else{
      return false
    }
  }
})
