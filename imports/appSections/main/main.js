import { Template } from 'meteor/templating'

import './main.html'
import './home/home'
import './search/search'
import './profile/profile'
import './settings/settings'

Template.main.onCreated(function(){
  $(document).ready(function(){
    $('ul.tabs').tabs();
  })
})
