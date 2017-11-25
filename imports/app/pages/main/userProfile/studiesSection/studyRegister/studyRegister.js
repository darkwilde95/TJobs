import { Study } from '/imports/db/study'
import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'

import './studyRegister.html'

var studyAdding = new ReactiveVar(false)
var yearValid = new ReactiveVar(true)
var maxYear

function addStudyEvent(event) {
  var year = $('#year').val()
  var submit = $('#submitStudy')
  if(year >= 1950 && year <= maxYear || year == ''){
    yearValid.set(true)
  }else{
    yearValid.set(false)
    if(!submit.hasClass('disabled')) submit.addClass('disabled')
    if(event.keyCode == 13){
      event.preventDefault()
    }
    return false
  }
  var instName = $('#instName').val()
  var title = $('#title').val()
  if(year && instName && title){
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
  yearValid.set(true)
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
    return (yearValid.get())? '': 'Año inválido'
  }
})

Template.studyRegister.events({
  'click #collapStudy'(){
    if($('#collapStudy').hasClass('active')){
      studyAdding.set(true)
    }else{
      yearValid.set(true)
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
      stu_use_id: Meteor.userId(),
      stu_instName: instName.val(),
      stu_title: title.val(),
      stu_year: year.val()
    }
    Study.insert(study)
    $('#collapsibleStudy').collapsible('close', 0)
    studyAdding.set(false)
    $('.stlabels').removeClass('active')
    instName.val('')
    title.val('')
    year.val('')
    yearValid.set(true)
    $('#submitStudy').addClass('disabled')
  },
  'keyup, keydown'(event){
    addStudyEvent(event)
  }
})
