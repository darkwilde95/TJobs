import { Meteor } from 'meteor/meteor'
import { City } from '/imports/db/city'
import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'
import { JobOffer } from '/imports/db/jobOffer'
import { BranchOffice } from '/imports/db/branchOffice'

import './publishOffer.html'

var validPublish = new ReactiveVar(false)
var validSalary = new ReactiveVar(true)
var requerimentsList = new ReactiveVar([])

function newOfferEvent(event){
  var submit = $('#submitPublish')
  var salary = $('#salary').val()
  if(salary > 0 || salary == ''){
    validSalary.set(true)
  }else{
    validSalary.set(false)
    validPublish.set(false)
    if(!submit.hasClass('disabled')) submit.addClass('disabled')
    if(event.keyCode == 13) event.preventDefault()
    return false
  }
  var name = $('#offerName').val()
  var description = $('#description').val()
  var BOffices
  if(BranchOffice.find({bra_ent_id: Meteor.userId()}).count() > 0){
    BOffices = $('#OfferLocation').val()
  }else{
    BOffices = true
  }
  if(salary && name && description && BOffices && requerimentsList.get().length > 0){
    validPublish.set(true)
    if(submit.hasClass('disabled')) submit.removeClass('disabled')
    return false
  }
  validPublish.set(false)
  if(!submit.hasClass('disabled')) submit.addClass('disabled')
  if(event.keyCode == 13) event.preventDefault()
}

Template.publishOffer.onCreated(function(){
  validSalary.set(true)
  validPublish.set(false)
  $(document).ready(function(){
    $('select').not('.disabled').material_select()
    $('#OfferLocation').on('change', function(event) {
      newOfferEvent(event)
    })
    $('.chips-placeholder').material_chip({
      placeholder: 'Agregar requerimientos',
    })
    $('.chips-placeholder').on('chip.add', function(e, chip){
      requerimentsList.get().push(chip.tag)
    })
    $('.chips-placeholder').on('chip.delete', function(e, chip){
      var arr = requerimentsList.get()
      arr.splice(arr.indexOf(chip),1)
      requerimentsList.set(arr)
    })
  })
})

Template.publishOffer.helpers({
  salaryError: function(){
    return (validSalary.get()) ? '' : 'Valor de salario inválido'
  },
  hasBOffices: function(){
    return BranchOffice.find({bra_ent_id: Meteor.userId()}).count() > 0
  },
  BOffices: function(){
    return BranchOffice.find({bra_ent_id: Meteor.userId()})
  },
  principalLocation: function(){
    var user = Meteor.user()
    if(user){
      return City.findOne({_id: user.profile.location}).cit_name
    }else{
      return ''
    }
  },
  OLocation: function(location){
    var city = City.findOne({_id: location})
    if(city){
      return city.cit_name
    }else{
      return ''
    }
  }
})

Template.publishOffer.events({
  'click #submitPublish'(event){
    event.preventDefault()
    var name = $('#offerName')
    var salary = $('#salary')
    var description = $('#description')
    var offerLocation = $('#OfferLocation')
    var BOffice = BranchOffice.findOne({_id: offerLocation.val()})
    if(!BOffice){
      BOffice = {
        bra_address: Meteor.user().profile.address,
        bra_location: Meteor.user().profile.location
      }
    }
    var offer = {
      job_name: name.val(),
      job_ent_id: Meteor.userId(),
      job_id_location: BOffice.bra_location,
      job_address: BOffice.bra_address,
      job_dateTime: new Date().getTime(),
      job_salary: salary.val(),
      job_requirements: requerimentsList.get(),
      job_description: description.val()
    }
    JobOffer.insert(offer)
    validSalary.set(true)
    offerLocation.prop('selectedIndex', 0)
    offerLocation.material_select()
    name.val('')
    salary.val('')
    description.val('')
    requerimentsList.set([])
    $('.chips-placeholder').material_chip({
      placeholder: 'Agregar requerimientos',
    })
    $('#submitPublish').addClass('disabled')
  },
  'keyup, keydown'(event){
    newOfferEvent(event)
  }
})
