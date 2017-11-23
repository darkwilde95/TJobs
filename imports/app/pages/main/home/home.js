import { Template } from 'meteor/templating'
import { JobOffer } from '/imports/db/jobOffer'

import './home.html'

Template.home.onRendered(function(){
  if(JobOffer.find().count() == 0){
    $('#home').addClass('valign-wrapper')
  }
})

Template.home.helpers({
  hasOffers: function(){
    return JobOffer.find({}).count() > 0
  },
  jobOffers: function(){
    return JobOffer.find({})
  }
})
