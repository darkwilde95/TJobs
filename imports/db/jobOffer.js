import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

var jobOffer = new Mongo.Collection('jobOffer',{idGeneration: 'STRING'})

jobOffer.schema = new SimpleSchema({
  job_name: {type: String},
  job_ent_id: {type: String},
  job_id_location: {type: String},
  job_dateTime: {type: Number},
  job_salary: {type: Number},
  job_requirements: {type: [String]},
  job_description: {type: String}
})

jobOffer.attachSchema(jobOffer.schema)

if(Meteor.isServer){
  Meteor.publish('JobOffer', function(){
    return jobOffer.find({})
  })
  Meteor.publish('JobOfferEnterprise', function(enterpriseId){
    return jobOffer.find({job_ent_id: enterpriseId})
  })
}

export const JobOffer = jobOffer
