import { Template } from 'meteor/templating'

import './search.html'

Template.search.events({

  'click #search_submit'(event){
    event.preventDefault()
  }

})
