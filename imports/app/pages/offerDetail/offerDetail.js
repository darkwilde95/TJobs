import { Meteor } from 'meteor/meteor'
import { City } from '/imports/db/city'
import { Template } from 'meteor/templating'
import { OfferApply } from '/imports/db/offerApply'

import './offerDetail.html'

Template.offerDetail.helpers({
  entName: function(entId){
    var aux = Meteor.users.findOne({_id: entId})
    return (aux) ? aux.profile.name : ''
  },
  offerLocation:function(cityId){
    var aux = City.findOne({_id: cityId})
    return (aux) ? aux.cit_name : ''
  },
  offerDate: function(dateTime){
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
  },
  alReadyApply : function(){
    var aux = OfferApply.findOne({off_userId: Meteor.userId()})
    return (aux) ? true : false
  }
})

Template.offerDetail.events({
  'click #apply'(event){
    OfferApply.insert({
      off_userId: Meteor.userId(),
      off_enterpriseId: this.job_ent_id,
      off_offerId: this._id
    })
  },
  'click #cancel'(event){
    var aux = OfferApply.findOne({off_userId: Meteor.userId(), off_offerId: this._id })
    if(aux){
      OfferApply.remove({_id: aux._id})
    }
  }
})
