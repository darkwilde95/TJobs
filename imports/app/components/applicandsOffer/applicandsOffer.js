import { Template } from 'meteor/templating'
import { OfferApply } from '/imports/db/offerApply'

import './applicandsOffer.html'

Template.applicandsOffer.helpers({
  hasApplicands: function(offerId){
    var aux = OfferApply.find({off_offerId: offerId})
    return (aux) ? aux.count() > 0 : false
  },
  applicands: function(offerId){
    var aux = OfferApply.find({off_offerId: offerId}, {fields: {off_userId: true}})
    return (aux) ? aux : false
  }
})
