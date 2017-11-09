import { City } from '/imports/db/city'
import './login/login'
import './register/register'
import './main/main'
import './styles.css'
import './generalTemplates'


Router.route('/', {
  onBeforeAction: function(){
    if(!Meteor.userId()){
      this.redirect('loginActivity')
    }else{
      this.redirect('mainActivity')
    }
    this.next()
  }
})

Router.route('/login',{
  name: 'loginActivity',
  template: 'login',
  onBeforeAction: function(){
    if(Meteor.userId()){
      this.redirect('mainActivity')
    }
    this.next()
  }
})

Router.route('/register',{
  name: 'registerActivity',
  template: 'register',
  subscriptions: function(){
    this.subscribe('City').wait()
  },
  data: function() {
    return {'city': City.find({})}
  },
  onBeforeAction: function(){
    if(Meteor.userId()){
      this.redirect('mainActivity')
    }
    this.next()
  },
  action: function(){
    if (this.ready()) {
      this.render()
    } else {
      this.render('loading')
    }
  }
})

Router.route('/main', {
  name: 'mainActivity',
  template: 'main',
  subscriptions: function(){
    this.subscribe('City').wait()
  },
  data: function() {
    return {'city': City.find({})}
  },
  onBeforeAction: function(){
    if(!Meteor.userId()){
      this.redirect('loginActivity')
    }
    this.next()
  },
  action: function(){
    if (this.ready()) {
      this.render()
    } else {
      this.render('loading')
    }
  }
})
