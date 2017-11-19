import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { City } from '/imports/db/city'
import './offerResume.html'

Template.offerResume.helpers({
  enterpriseName: function(enterpriseId){
    return Meteor.users.findOne({_id: enterpriseId}).profile.name
  },
  locationName: function(locationId){
    return City.findOne({_id: locationId}).cit_name
  },
  dateTimeOffer: function(){
    return 'en construcción'
  }
})
