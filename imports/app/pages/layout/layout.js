import { Session } from 'meteor/session'
import { Tracker } from 'meteor/tracker'
import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'

import './layout.html'

var doSearch = new ReactiveVar(false)

Tracker.autorun(function(){
  doSearch.set(Session.get('route') == 'searchActivity')
})

Template.layout.onCreated(function(){
  doSearch.set(false)
})

Template.searchForm.onRendered(function(){
  var s = $('#search')
  s.focusout(function(){
    if(Router.current().route.getName() != 'searchActivity'){
      s.val('').removeAttr('placeholder')
      $('.input-field').one('transitionend webkitTransitionEnd', function(event){
        doSearch.set(false)
      })
    }else{
      if(!s.val()){
        s.val('').removeAttr('placeholder')
        $('.input-field').one('transitionend webkitTransitionEnd', function(event){
          doSearch.set(false)
        })
      }
    }
  }).focus()
})

Template.layout.helpers({
  inMain: function(){
    return Session.get('route') == 'mainActivity'
  },
  toSearch: function(){
    return doSearch.get()
  }
})

Template.layout.events({
  'click .backButton'(event){
    event.preventDefault()
    window.history.go(-1)
  },
  'click #searchButton'(event){
    event.preventDefault()
    doSearch.set(true)
  },
  'click #close'(){
    var s = $('#search')
    s.val('')
    s.val('').removeAttr('placeholder')
    $('.input-field').one('transitionend webkitTransitionEnd', function(event){
      doSearch.set(false)
    })
  }
})

Template.searchForm.helpers({
  inMain: function(){
    return Session.get('route') == 'mainActivity'
  }
})

Template.searchForm.events({
  'submit form'(event){
    event.preventDefault()
    var term = 'q='+$('#search').val()
    Router.go('searchActivity', {} ,{ query: term })

  },
  'click .backButton'(event){
    event.preventDefault()
    var s = $('#search')
    s.val('')
    s.removeAttr('placeholder')
    doSearch.set(false)
    window.history.go(-1)
  },
})
