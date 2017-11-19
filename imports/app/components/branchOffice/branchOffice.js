import { Template } from 'meteor/templating'
import { City } from '/imports/db/city'

import './branchOffice.html'

Template.branchOffice.helpers({
  location: function(location){
    return City.findOne({_id: location}).cit_name
  }
})
