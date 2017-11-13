import { Meteor } from 'meteor/meteor'
import { City } from '/imports/db/city'
import { JobOffer } from '/imports/db/jobOffer'
import '/imports/db/'

Meteor.startup(function(){
  if(City.find({}).count() == 0){
    City.insert({cit_name: 'Bogota D.C.'})
    City.insert({cit_name: 'Manizales'})
    City.insert({cit_name: 'Medellin'})
    City.insert({cit_name: 'Cali'})
  }
})

Meteor.publish('Enterprises', function(){
  return Meteor.users.find({ 'profile.typeProfile': 'enterprise'})
})

Meteor.methods({
  deleteProfile: function(){
    var account = Meteor.users.findOne({_id: this.userId})
    // if(account.profile.typeProfile == 'user'){
    //   Aqui borrar todo lo que sea de un usuario
    // }else{
    //   Aqui borrar todo lo que sea de la empresa
    // }
    Meteor.users.remove(account)
  },
})
