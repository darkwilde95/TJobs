import { Template } from 'meteor/templating'
import { Tracker } from 'meteor/tracker'
import { City } from '/imports/db/city'

import './register.html'
import './registerUser/registerUser'
import './registerEnterprise/registerEnterprise'

Tracker.autorun(function(){
  if(City.find({}).count() > 0){
    $(document).ready(function(){
      $('select').material_select()
    })
  }
})

Template.register.onCreated(function(){
  $(document).ready(function(){
    $('ul.tabs').tabs()
    $('select').material_select()
  })
})
