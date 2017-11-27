import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

var job = new Mongo.Collection('job',{idGeneration: 'STRING'})

job.schema = new SimpleSchema({
  job_use_id: {type: String},
  job_enterpriseName: {type: String},
  job_appointment: {type: String},
  'job_duration.time': {type: Number},
  'job_duration.type': {type: String}
})

job.attachSchema(job.schema)

if(Meteor.isServer){
  Meteor.publish('Job', function(userId){
    return job.find({job_use_id: userId})
  })
  job.allow({
    insert: function(userId, doc){
      return userId && doc.job_use_id === userId
    },
    update: function(userId, doc, fields, modifier){
      return doc.job_use_id === userId;
    },
    remove: function(userId, doc){
      return doc.job_use_id === userId
    }
  })
  job.deny({
    update: function(userId, doc, fields, modifier){
      return _.contains(fields, 'job_use_id')
    }
  })
}

export const Job = job
