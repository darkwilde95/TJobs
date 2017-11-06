import { City } from '/imports/db/city'
import './login/login'
import './register/register'
import './main/main'
import './styles.css'
import './generalTemplates'

Router.route('/', function(){
  this.redirect('loginActivity')
})

Router.route('/login',{
  name: 'loginActivity',
  template: 'login'
})

Router.route('/register',{
  name: 'registerActivity',
  template: 'register',
  subscriptions: function(){
    this.subscribe('City').wait()
  },
  data: function() {
    return {'city': City.find({})}
  }
})

Router.route('/main', {
  name: 'mainActivity',
  template: 'main'
})
