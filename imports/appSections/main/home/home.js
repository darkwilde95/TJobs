import { Template } from 'meteor/templating'
import { JobOffer } from '/imports/db/jobOffer'

import './home.html'

Template.home.helpers({
  jobOffers: function(){
    return JobOffer.find({}, {limit: 10})
  }
})
