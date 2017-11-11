import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'

import './jobRegister.html'

var jobAdding = new ReactiveVar(false)

Template.jobRegister.helpers({
  job: function(){
    if(jobAdding.get()){
      return { icon: 'clear', message: 'CANCELAR' }
    }else{
      return { icon: 'add', message: 'AGREGAR TRABAJO' }
    }
  }
})

Template.jobRegister.events({
  'click #collapJob'(){
    if($('#collapJob').hasClass('active')){
      jobAdding.set(true)
    }else{
      jobAdding.set(false)
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
    var job = {
      name: enterName.val(),
      appointment: appointment.val(),
      duration: duration.val()
    }
    Meteor.users.update({ _id: Meteor.userId() },{ $push: { 'profile.jobs': job }})
    $('#collapsibleJob').collapsible('close', 0)
    jobAdding.set(false)
    $('.jblabels').removeClass('active')
    enterName.val('')
    appointment.val('')
    duration.val('')
  }
})
