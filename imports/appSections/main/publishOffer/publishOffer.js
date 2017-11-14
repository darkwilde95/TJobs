import { Template } from 'meteor/templating'

import './publishOffer.html'

function newOfferEvent(event){

}

Template.publishOffer.events({
  'click #submitOffer'(event){

  },
  'keyup, keydown'(event){
    newOfferEvent(event)
  }
})
