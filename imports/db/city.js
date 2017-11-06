import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

var city = new Mongo.Collection('city',{idGeneration: 'STRING'})

city.schema = new SimpleSchema({
  cit_name: {type: String}
})

city.attachSchema(city.schema)

if(Meteor.isServer){
  Meteor.publish('City', function(){
    return city.find({})
  })
}

export const City = city
