import { Template } from 'meteor/templating'
import { City } from '/imports/db/city'

import './branchOfficeItem.html'

Template.branchOfficeItem.helpers({
  location: function(location){
    return City.findOne({_id: location}).cit_name
  }
})
