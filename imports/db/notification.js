import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

var notification = new Mongo.Collection('notification',{idGeneration: 'STRING'})

notification.schema = new SimpleSchema({
  not_userId: {type: String},
  not_offerId: {type: String},
  not_seen: {type: Boolean},
  not_infomation: {type: String},
  not_dateTime: {type: Number},
})

notification.attachSchema(notification.schema)

if(Meteor.isServer){
  Meteor.publish('Notification', function(userId){
    return (userId) ? notification.find({not_userId: userId}) : notification.find({})
  })

  notification.allow({
    update: function(userId, doc, fields, modifier){
      return doc.not_userId === userId && !doc.not_seen
    },
    remove: function(userId, doc){
      return doc.not_userId === userId
    }
  })
  notification.deny({
    update: function(userId, doc, fields, modifier){
      return _.contains(fields, 'not_userId')
    }
  })
}

export const Notification = notification
