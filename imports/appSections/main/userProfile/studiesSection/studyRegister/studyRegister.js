import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'

import './studyRegister.html'

var studyAdding = new ReactiveVar(false)

Template.studyRegister.helpers({
  study: function(){
    if(studyAdding.get()){
      return { icon: 'clear', message: 'CANCELAR' }
    }else{
      return { icon: 'add', message: 'AGREGAR ESTUDIO' }
    }
  }
})

Template.studyRegister.events({
  'click #collapStudy'(){
    if($('#collapStudy').hasClass('active')){
      studyAdding.set(true)
    }else{
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
  }
})
