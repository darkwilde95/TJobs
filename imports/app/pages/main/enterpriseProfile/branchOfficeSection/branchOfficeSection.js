import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { BranchOffice } from '/imports/db/branchOffice'

import './branchOfficeSection.html'
import './branchOfficeRegister/branchOfficeRegister'

Template.branchOfficeSection.helpers({
  hasBranchOffices: function(){
    return BranchOffice.find({bra_ent_id: Meteor.userId()}).count() > 0
  },
  enterpriseBOs: function(){
    return BranchOffice.find({bra_ent_id: Meteor.userId()})
  }
})
