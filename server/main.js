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
  if(JobOffer.find({}).count() == 0){
    JobOffer.insert({
      job_name: 'Se necesitan gatos para empollarse',
      job_ent_id: 'M7iizEGkkoA7MwgER',
      job_id_location: 'cgXvbc9DTYHL4wGWG',
      job_salary: 1500000,
      job_requirements: ['Ser gordo', 'Ser suave', 'Saber ronronear', 'Saber empollarse'],
      job_description: ['Se necesitan gatos gordos, con minimo de 6 meses de experiencia en empollarse']
    })
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
