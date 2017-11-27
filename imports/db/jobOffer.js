import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

var jobOffer = new Mongo.Collection('jobOffer',{idGeneration: 'STRING'})

jobOffer.schema = new SimpleSchema({
  job_name: {type: String},
  job_ent_id: {type: String},
  job_id_location: {type: String},
  job_address: {type: String},
  job_dateTime: {type: Number},
  job_salary: {type: Number},
  job_requirements: {type: [String]},
  job_description: {type: String},
  job_search: {type: String}
})

jobOffer.attachSchema(jobOffer.schema)

if(Meteor.isServer){
  jobOffer._ensureIndex({job_search: "text"})
  Meteor.publish('JobOffer', function(offerId){
    return (offerId) ? jobOffer.find({_id: offerId}) : jobOffer.find({})
  })
  Meteor.publish('JobOfferEnterprise', function(enterpriseId){
    return jobOffer.find({job_ent_id: enterpriseId})
  })
  Meteor.publish('JobOfferSearch', function(query){
    if(query){
      return jobOffer.find({ $text: { $search: query } })
    }else{
      return jobOffer.find({})
    }
  })
  jobOffer.allow({
    insert: function(userId, doc){
      return userId && doc.job_ent_id === userId;
    },
    update: function(userId, doc, fields, modifier){
      return doc.job_ent_id === userId;
    },
    remove: function(userId, doc){
      return doc.job_ent_id === userId;
    }
  })
  jobOffer.deny({
    update: function(userId, doc, fields, modifier){
      return _.contains(fields, 'job_ent_id');
    }
  })
}

export const JobOffer = jobOffer
