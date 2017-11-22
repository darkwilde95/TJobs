import { Meteor } from 'meteor/meteor'
import { City } from '/imports/db/city'
import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'

import './publishOffer.html'

var validPublish = new ReactiveVar(false)
var validSalary = new ReactiveVar(false)
var requerimentsList = new ReactiveVar([])

function newOfferEvent(event){
  var addRequeriment = $('#addRequeriment')
  var submit = $('#submitPublish')
  var salary = $('#salary').val()
  var requirements = $('#requirements').val()
  var BOffice = (Meteor.user().profile.branchOffices.length > 0) ?
                $('#OfferLocation').val() : true
  if(requirements && BOffice){
    if(addRequeriment.hasClass('disabled')) addRequeriment.removeClass('disabled')
  }else{
    if(!addRequeriment.hasClass('disabled')) addRequeriment.addClass('disabled')
  }
  if(salary > 0){
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
  if(name && description && requerimentsList.get().length > 0){
    validPublish.set(true)
    if(submit.hasClass('disabled')) submit.removeClass('disabled')
    return false
  }
  validPublish.set(false)
  if(!submit.hasClass('disabled')) submit.addClass('disabled')
  if(event.keyCode == 13) event.preventDefault()
}

Template.publishOffer.onCreated(function(){
  validSalary.set(false)
  validPublish.set(false)
  $(document).ready(function(){
    $('select').not('.disabled').material_select()
    $('#OfferLocation').on('change', function(event) {
      newOfferEvent(event)
    })
  })
})

Template.publishOffer.helpers({
  salaryError: function(){
    return (validSalary.get()) ? '' : 'Valor de salario inválido'
  },
  hasBOffices: function(){
    var enterprise = Meteor.user()
    if(enterprise){
      return (enterprise.profile.branchOffices.length > 0)? true: false
    }
    return false
  },
  BOffices: function(){
    var enterprise = Meteor.user()
    if(enterprise){
      return enterprise.profile.branchOffices
    }
  },
  principalLocation: function(){
    return City.findOne({_id: Meteor.user().profile.location}).cit_name
  },
  OLocation: function(location){
    return City.findOne({_id: location}).cit_name
  }
})

Template.publishOffer.events({
  'click #addRequeriment'(event){
    event.preventDefault()
    var requirement = $('#requirements')
    requerimentsList.get().push(requirement.val())
    requirement.val('')
    newOfferEvent(event)
  },
  'click #submitPublish'(event){
    event.preventDefault()
    var name = $('#offerName').val()
    var salary = $('#salary').val()
    var description = $('#description').val()
    var BOffice = (Meteor.user().profile.branchOffices.length > 0) ?
                  ('#OfferLocation').val() : Meteor.user().profile.location
    var offer = {
      job_name: name,
      job_ent_id: Meteor.userId(),
      job_id_location: BOffice,
      job_dateTime: new Date().getTime(),
      job_salary: salary,
      job_requirements: requerimentsList.get(),
      job_description: description
    }
    Meteor.call('publishNewOffer', offer, (error, result) => {
    })
  },
  'keyup, keydown'(event){
    newOfferEvent(event)
  }
})
