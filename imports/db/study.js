import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

var study = new Mongo.Collection('study',{idGeneration: 'STRING'})

study.schema = new SimpleSchema({
  stu_use_id: {type: String},
  stu_instName: {type: String},
  stu_title: {type: String},
  stu_year: {type: Number}
})

study.attachSchema(study.schema)

if(Meteor.isServer){
  Meteor.publish('Study', function(userId){
    return study.find({stu_use_id: userId})
  })
  study.allow({
    insert: function(userId, doc){
      return userId && doc.stu_use_id === userId;
    },
    update: function(userId, doc, fields, modifier){
      return doc.stu_use_id === userId;
    },
    remove: function(userId, doc){
      return doc.stu_use_id === userId;
    }
  })
  study.deny({
    update: function(userId, doc, fields, modifier){
      return _.contains(fields, 'stu_use_id');
    }
  })
}

export const Study = study
