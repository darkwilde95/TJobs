import { Template } from 'meteor/templating'
import { City } from 'imports/db/city'
import './offerResume.html'

Template.offerResume.onCreated(function(){
  Meteor.subscribe('Enterprises')
})

Template.offerResume.helpers({
  enterpriseName: function(enterpriseId){
    return Meteor.users.find()
  }
})
