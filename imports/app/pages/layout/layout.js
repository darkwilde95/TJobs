import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var'

import './layout.html'

var doSearch = new ReactiveVar(false)

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
    return Router.current().route.getName() == 'mainActivity'
  },
  toSearch: function(){
    return doSearch.get()
  }
})

Template.layout.events({
  'click #backButton'(event){
    event.preventDefault()
    doSearch.set(false)
    window.history.go(-1)
  },
  'click #searchButton'(event){
    event.preventDefault()
    doSearch.set(true)
  }
})

Template.searchForm.events({
  'submit form'(event){
    event.preventDefault()
    var term = 'q='+$('#search').val()
    Router.go('searchActivity', {} ,{ query: term })

  }
})
