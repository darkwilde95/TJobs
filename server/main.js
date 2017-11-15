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
    if(account.profile.typeProfile == 'user'){
      console.log('Asumiendo que se borran las cosas del user')
    }else{
      JobOffer.remove({job_ent_id: this.userId})
    }
    Meteor.users.remove(account)
  },
  publishNewOffer: function(offer){
    JobOffer.insert(offer)
  }
})
