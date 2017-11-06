import { Meteor } from 'meteor/meteor'
import { City } from '/imports/db/city'
import '/imports/db'

Meteor.startup(() => {
  if(City.find({}).fetch().length == 0){
    City.insert({cit_name: 'Bogota D.C.'})
    City.insert({cit_name: 'Manizales'})
    City.insert({cit_name: 'Medellin'})
    City.insert({cit_name: 'Cali'})
  }
})
