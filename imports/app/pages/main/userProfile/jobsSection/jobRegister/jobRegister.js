import { Job } from '/imports/db/job'
import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'

import './jobRegister.html'

var jobAdding = new ReactiveVar(false)
var durationValid = new ReactiveVar(true)

function addJobEvent(event) {
  var duration = $('#duration').val()
  var submit = $('#submitJob')
  if(duration > 0 || duration == ''){
    durationValid.set(true)
    return false
  }else{
    if(!submit.hasClass('disabled')) submit.addClass('disabled')
    durationValid.set(false)
    if(event.keyCode == 13){
      event.preventDefault()
    }
  }
  var time = $('#time').val()
  var enterName = $('#enterName').val()
  var appointment = $('#appointment').val()
  if(duration && enterName && appointment && time){
    if(submit.hasClass('disabled')) submit.removeClass('disabled')
    return false
  }
  if(!submit.hasClass('disabled')) submit.addClass('disabled')
  if(event.keyCode == 13){
    event.preventDefault()
  }
}

Template.jobRegister.onCreated(function(){
  durationValid.set(true)
  $(document).ready(function(){
    $('select').not('.disabled').material_select()
    $('#time').on('change', function(event) {
      addJobEvent(event)
    })
  })
})

Template.jobRegister.helpers({
  job: function(){
    if(jobAdding.get()){
      return { icon: 'clear', message: 'CANCELAR' }
    }else{
      return { icon: 'add', message: 'AGREGAR TRABAJO' }
    }
  },
  durationError: function(){
    return (durationValid.get())? '' : 'Duración invalida'
  }
})

Template.jobRegister.events({
  'click #collapJob'(){
    if($('#collapJob').hasClass('active')){
      jobAdding.set(true)
    }else{
      jobAdding.set(false)
      durationValid.set(true)
      $('.jblabels').removeClass('active')
      $('#enterName').val('')
      $('#appointment').val('')
      $('#duration').val('')
    }
  },
  'click #submitJob'(event){
    event.preventDefault()
    var enterName = $('#enterName')
    var appointment = $('#appointment')
    var duration = $('#duration')
    var time = $('#time')
    var job = {
      job_use_id: Meteor.userId(),
      job_enterpriseName: enterName.val(),
      job_appointment: appointment.val(),
      job_duration: {
        time: duration.val(),
        type: (time.val() == 'D') ? 'Dias':
              (time.val() == 'M') ? 'Meses' : 'Años'
      }
    }
    Job.insert(job)
    $('#collapsibleJob').collapsible('close', 0)
    jobAdding.set(false)
    $('.jblabels').removeClass('active')
    enterName.val('')
    appointment.val('')
    duration.val('')
    time.prop('selectedIndex', 0)
    time.material_select()
    durationValid.set(true)
    $('#submitJob').addClass('disabled')
  },
  'keyup, keydown'(event){
    addJobEvent(event)
  }
})
