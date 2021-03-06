import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'
import { BranchOffice } from '/imports/db/branchOffice'

import './branchOfficeRegister.html'

var addingBranchOffer = new ReactiveVar(false)
var numberError = new ReactiveVar(false)

function addBOEvent(event){
  var number = $('#numberBO').val()
  var submit = $('#submitBranchOffer')
  if(number >= 1000000 && number <= 9999999999 || number == ''){
    numberError.set(false)
  }else{
    numberError.set(true)
    if(!submit.hasClass('disabled')) submit.addClass('disabled')
    if(event.keyCode == 13){
      event.preventDefault()
    }
    return false
  }
  var address = $('#addressBO').val()
  var location = $('#locationBO').val()
  if(address && location && number){
    if(submit.hasClass('disabled')) submit.removeClass('disabled')
    return false
  }
  if(!submit.hasClass('disabled')) submit.addClass('disabled')
  if(event.keyCode == 13){
    event.preventDefault()
  }
}

Template.branchOfficeRegister.onCreated(function(){
  addingBranchOffer.set(false)
  numberError.set(false)
  $(document).ready(function(){
    $('select').not('.disabled').material_select()
    $('#locationBO').on('change', function(event) {
      addBOEvent(event)
    })
  })
})

Template.branchOfficeRegister.helpers({
  branchOffice: function(){
    if(addingBranchOffer.get()){
      return { icon: 'clear', message: 'CANCELAR' }
    }else{
      return { icon: 'add', message: 'AGREGAR'}
    }
  },
  telError: function(){
    return (numberError.get()) ? 'Teléfono inválido' : ''
  }
})

Template.branchOfficeRegister.events({
  'click #collapBranchOffices'(){
    if($('#collapBranchOffices').hasClass('active')){
      addingBranchOffer.set(true)
    }else{
      addingBranchOffer.set(false)
      $('.bolabels').removeClass('active')
      $('#addressBO').val('')
      $('#locationBO').val('')
      $('#numberBO').val('')
    }
  },
  'click #submitBranchOffer'(event){
    event.preventDefault()
    var number = $('#numberBO')
    var address = $('#addressBO')
    var location = $('#locationBO')

    var branchOffice = {
      bra_ent_id: Meteor.userId(),
      bra_location: location.val(),
      bra_address: address.val(),
      bra_number: number.val()
    }
    BranchOffice.insert(branchOffice)
    $('#collapsibleBranchOffices').collapsible('close', 0)
    addingBranchOffer.set(false)
    $('.stlabels').removeClass('active')
    address.val('')
    location.val('')
    number.val('')
    numberError.set(false)
    $('#submitBranchOffer').addClass('disabled')
    $(document).ready(function(){
      $('select').not('.disabled').material_select()
    })
  },
  'keyup, keydown'(event){
    addBOEvent(event)
  }
})
