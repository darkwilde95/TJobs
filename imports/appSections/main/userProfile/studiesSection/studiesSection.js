import { Template } from 'meteor/templating'

import './studiesSection.html'
import './studyItem/studyItem'
import './studyRegister/studyRegister'

Template.studiesSection.helpers({
  hasStudies: function(){
    return (Meteor.user().profile.studies.length == 0)? false: true
  }
})
