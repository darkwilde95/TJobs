import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { City } from '/imports/db/city'
import './offerResume.html'

Template.offerResume.helpers({
  enterpriseName: function(enterpriseId){
    var enterprise = Meteor.users.findOne({_id: enterpriseId})
    return (enterprise)? enterprise.profile.name : false
  },
  locationName: function(locationId){
    var city = City.findOne({_id: locationId})
    return (city) ? city.cit_name: false
  },
  dateTimeOffer: function(dateTime){
    var f = new Date(dateTime)
    var hour = f.getHours()
    var min = f.getMinutes()
    var year = f.getFullYear()
    var month = f.getMonth()
    var day = f.getDate()

    hour = (hour < 10) ? '0' + hour : hour
    min = (min < 10) ? '0' + min : min
    month = (month < 10) ? '0' + month : month
    day = (day < 10) ? '0' + day : day
    return day + '/' + month + '/' + year + ' - ' + hour + ':' + min
  }
})
