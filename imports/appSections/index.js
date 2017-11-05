import './home/home.js'
import './login/login.js'
import './profile/profile.js'
import './register/register.js'
import './settings/settings.js'
import './search/search.js'
import '../generalTemplates'


Router.route('/', function(){
  this.redirect('home')
})


Router.route('/login',{
  name: 'login',
  template: 'login'
})

Router.route('/register', {
  name:'register',
  template: 'register'

})

Router.route('/home',{
  name: 'home',
  layoutTemplate: 'layoutTemplate',
  yieldRegions:{
    'home':{to: 'activity'}
  }
})

Router.route('/search',{
  name: 'search',
  layoutTemplate: 'layoutTemplate',
  yieldRegions:{
    'search':{to: 'activity'}
  }
})

Router.route('/profile',{
  name: 'profile',
  layoutTemplate: 'layoutTemplate',
  yieldRegions:{
    'profile':{to: 'activity'}
  }
})

Router.route('/settings',{
  name: 'settings',
  layoutTemplate: 'layoutTemplate',
  yieldRegions:{
    'settings':{to: 'activity'}
  }

})
