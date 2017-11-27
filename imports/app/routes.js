import { JobOffer } from '/imports/db/jobOffer'
import { City } from '/imports/db/city'
import { Meteor } from 'meteor/meteor'

import './pages'
import './components'
import './styles.scss'

Router.route('/', {
  onBeforeAction: function(){
    if(!Meteor.userId()){
      this.redirect('loginActivity')
    }else{
      this.redirect('mainActivity')
    }
  }
})

Router.route('/login',{
  name: 'loginActivity',
  template: 'login',
  onBeforeAction: function(){
    if(Meteor.userId()){
      this.redirect('mainActivity')
    }else{
      this.next()
    }
  },
  action: function(){
    if(Meteor.loggingIn()){
      this.render('loading')
    }else{
      this.render()
    }
  }
})

Router.route('/register',{
  name: 'registerActivity',
  template: 'register',
  subscriptions: function(){
    this.subscribe('City').wait()
  },
  onBeforeAction: function(){
    if(Meteor.userId()){
      this.redirect('mainActivity')
    }else{
      this.next()
    }
  },
  action: function(){
    if(this.ready()){
      this.render()
    } else {
      this.render('loading')
    }
  },
  data: function() {
    return {'city': City.find({})}
  },
})

Router.route('/main', {
  name: 'mainActivity',
  layoutTemplate: 'layout',
  yieldRegions: {
    'mainHeader': { to: 'header'},
    'mainContent': { to: 'main'}
  },
  subscriptions: function(){
    var user = Meteor.user()
    if(user){
      if(user.profile.typeProfile == 'user'){
        this.subscribe('EnterpriseNames').wait()
        this.subscribe('Job', Meteor.userId()).wait()
        this.subscribe('Study', Meteor.userId()).wait()
        this.subscribe('JobOffer', null).wait()
      }else{
        this.subscribe('BranchOffice', Meteor.userId()).wait()
        this.subscribe('JobOfferEnterprise', Meteor.userId()).wait()
      }
    }
    this.subscribe('City').wait()
  },
  onBeforeAction: function(){
    if(Meteor.userId()){
      this.next()
    }else{
      this.redirect('loginActivity')
    }
  },
  action: function(){
    if(this.ready()){
      this.render()
    }else{
      this.render('loading')
    }
  },
  data: function() {
    return {
      'city': City.find({})
    }
  }
})
Router.route('/offer/:offerId', {
  name:'offerActivity',
  layoutTemplate: 'layout',
  yieldRegions: {
    'offerDetail': { to: 'main'}
  },
  subscriptions: function(){
    this.subscribe('City').wait()
    this.subscribe('EnterpriseNames').wait()
    this.subscribe('JobOffer', this.params.offerId).wait()
  },
  onBeforeAction: function(){
    if(Meteor.userId()){
      this.next()
    }else{
      this.redirect('loginActivity')
    }
  },
  action: function(){
    if(this.ready()){
      this.render()
    }else{
      this.render('loading')
    }
  },
  data: function(){
    return JobOffer.findOne({_id: this.params.offerId})
  }
})

Router.route('/search', {
  name: 'searchActivity',
  layoutTemplate: 'layout',
  yieldRegions: {
    'search': { to: 'main'}
  },
  subscriptions: function(){
    this.subscribe('City').wait()
    this.subscribe('EnterpriseNames').wait()
    this.subscribe('JobOfferSearch', this.params.query.q).wait()
  },
  onBeforeAction: function(){
    if(Meteor.userId()){
      if(_.size(this.params.query) > 0){
        this.next()
      }else{
        this.redirect('mainActivity')
      }
    }else{
      this.redirect('loginActivity')
    }
  },
  action: function(){
    if(this.ready()){
      this.render()
    }else{
      this.render('loading')
    }
  },
  data: function(){
    var r = JobOffer.find({},{sort: { job_dateTime: -1}})
    return {
      offerMatch: r,
      hasOffers: r.count() > 0
    }
  }
})
