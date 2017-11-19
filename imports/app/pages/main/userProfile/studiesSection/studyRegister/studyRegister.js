import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'

import './studyRegister.html'

var studyAdding = new ReactiveVar(false)
var yearValid = new ReactiveVar(false)
var maxYear

function addStudyEvent(event) {
  var year = $('#year').val()
  var submit = $('#submitStudy')
  if(year >= 1950 && year <= maxYear){
    yearValid.set(false)
  }else{
    yearValid.set(true)
    if(!submit.hasClass('disabled')) submit.addClass('disabled')
    if(event.keyCode == 13){
      event.preventDefault()
    }
    return false
  }
  var instName = $('#instName').val()
  var title = $('#title').val()
  if(instName && title){
    if(submit.hasClass('disabled')) submit.removeClass('disabled')
    return false
  }
  if(!submit.hasClass('disabled')) submit.addClass('disabled')
  if(event.keyCode == 13){
    event.preventDefault()
  }
}

Template.studyRegister.onCreated(function(){
  maxYear = new Date().getFullYear()
  studyAdding.set(false)
  yearValid.set(false)
})

Template.studyRegister.helpers({
  study: function(){
    if(studyAdding.get()){
      return { icon: 'clear', message: 'CANCELAR' }
    }else{
      return { icon: 'add', message: 'AGREGAR ESTUDIO' }
    }
  },
  maxYear: function(){
    return maxYear
  },
  yearError: function(){
    return (yearValid.get())? 'Año inválido': ''
  }
})

Template.studyRegister.events({
  'click #collapStudy'(){
    if($('#collapStudy').hasClass('active')){
      studyAdding.set(true)
    }else{
      yearValid.set(false)
      studyAdding.set(false)
      $('.stlabels').removeClass('active')
      $('#instName').val('')
      $('#title').val('')
      $('#year').val('')
    }
  },
  'click #submitStudy'(event){
    event.preventDefault()
    var instName = $('#instName')
    var title = $('#title')
    var year = $('#year')
    var study = {
      name: instName.val(),
      title: title.val(),
      year: year.val()
    }
    Meteor.users.update({ _id: Meteor.userId() },{ $push: { 'profile.studies': study }})
    $('#collapsibleStudy').collapsible('close', 0)
    studyAdding.set(false)
    $('.stlabels').removeClass('active')
    instName.val('')
    title.val('')
    year.val('')
    yearValid.set(false)
    $('#submitStudy').addClass('disabled')
  },
  'keyup, keydown'(event){
    addStudyEvent(event)
  }
})
