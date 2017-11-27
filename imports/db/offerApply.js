import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

var offerApply = new Mongo.Collection('offerApply', { idGeneration: 'STRING' })

offerApply.schema = new SimpleSchema({
  off_enterpriseId: { type: String },
  off_userId: { type: String },
  off_offerId: { type: String }
})

offerApply.attachSchema(offerApply.schema)

if(Meteor.isServer){
  Meteor.publish('OfferApplies', function(enterpriseId){

    return (enterpriseId) ? offerApply.find({ off_enterpriseId: enterpriseId })
                          : offerApply.find({})
  })
  offerApply.allow({
    insert: function(userId, doc){
      return userId && doc.off_userId === userId && !offerApply.findOne({off_userId: userId})
    },
    remove: function(userId, doc){
      return userId && doc.off_userId === userId
    }
  })
  offerApply.deny({
    insert: function(userId, doc){
      var aux = Meteor.users.findOne({_id: userId})
      var aux2 = (aux) ? aux.profile.typeProfile == 'enterprise' : true
      return userId && doc.off_enterpriseId === userId && !aux2
    },
    update: function(userId, doc, fields, modifier){
      return _.contains(fields, 'off_enterpriseId') ||
             _.contains(fields, 'off_userId') ||
             _.contains(fields, 'off_offerId')
    }
  })
}

export const OfferApply = offerApply
