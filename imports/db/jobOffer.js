import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

var jobOffer = new Mongo.Collection('jobOffer',{idGeneration: 'STRING'})

jobOffer.schema = new SimpleSchema({
  job_ent_name: {type: String},
  job_location: {type: String},
  job_salary: {type: Number},
  job_requirements: {type: [String]},
  job_description: {type: String}
})

jobOffer.attachSchema(jobOffer.schema)

if(Meteor.isServer){
  Meteor.publish('JobOffer', function(){
    return jobOffer.find({})
  })
}

export const JobOffer = jobOffer
