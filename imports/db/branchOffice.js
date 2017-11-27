import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

var branchOffice = new Mongo.Collection('branchOffice',{idGeneration: 'STRING'})

branchOffice.schema = new SimpleSchema({
  bra_ent_id: {type: String},
  bra_location: {type: String},
  bra_address: {type: String},
  bra_number: {type: Number}
})

branchOffice.attachSchema(branchOffice.schema)

if(Meteor.isServer){
  Meteor.publish('BranchOffice', function(enterprise){
    return branchOffice.find({bra_ent_id: enterprise})
  })
  branchOffice.allow({
    insert: function(userId, doc){
      return userId && doc.bra_ent_id === userId
    },
    update: function(userId, doc, fields, modifier){
      return doc.bra_ent_id === userId
    },
    remove: function(userId, doc){
      return doc.bra_ent_id === userId
    }
  })
  branchOffice.deny({
    update: function(userId, doc, fields, modifier){
      return _.contains(fields, 'bra_ent_id')
    }
  })
}

export const BranchOffice = branchOffice
