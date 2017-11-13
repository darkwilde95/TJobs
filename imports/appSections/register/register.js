import { Template } from 'meteor/templating'
import { Tracker } from 'meteor/tracker'
import { City } from '/imports/db/city'

import './register.html'
import './registerUser/registerUser'
import './registerEnterprise/registerEnterprise'

Template.register.onCreated(function(){
  $(document).ready(function(){
    $('select').not('.disabled').material_select()
    $('ul.tabs').tabs()
  })
})
