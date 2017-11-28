import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'

import './applicand.html'

Template.applicand.onCreated(function(){
  var user = Meteor.users.findOne({_id: this.data.item})
  if(user){
    var userName = user.profile.name
    this.data.profile = {
      name: userName.name + ' ' + userName.firstLastName + ' ' + userName.secondLastName,
      email: user.emails[0].address,
      number: user.profile.number
    }
  }
})
