import { Study } from '/imports/db/study'
import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'

import './studiesSection.html'
import './studyRegister/studyRegister'

Template.studiesSection.helpers({
  hasStudies: function(){
    return Study.find({stu_use_id: Meteor.userId()}).count() > 0
  },
  userStudies: function(){
    return Study.find({stu_use_id: Meteor.userId()})
  }
})
