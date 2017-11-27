import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'

import './notification.html'

Template.notification.helpers({
  dateTimeNotif: function(dateTime){
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
