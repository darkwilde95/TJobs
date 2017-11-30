import { Meteor } from 'meteor/meteor'
import { City } from '/imports/db/city'
import { Session } from 'meteor/session'
import { JobOffer } from '/imports/db/jobOffer'
import { Notification } from '/imports/db/notification'

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
    Session.set('route', Router.current().route.getName())
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
    Session.set('route', Router.current().route.getName())
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
        this.subscribe('JobOffer', null).wait()
        this.subscribe('Profiles', 'enterprise').wait()
        this.subscribe('Job', Meteor.userId()).wait()
        this.subscribe('Study', Meteor.userId()).wait()
        this.subscribe('Notification', null).wait()
      }else{
        this.subscribe('Profiles', 'user').wait()
        this.subscribe('OfferApplies', Meteor.userId()).wait()
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
    Session.set('route', Router.current().route.getName())
  },
  data: function() {
    var user = Meteor.user()
    if(user){
      var jo = JobOffer.find({})
      if(user.profile.typeProfile == 'user'){
        var n = Notification.find({})
        return {
          city: City.find({}),
          hasOffers: jo.count() > 0,
          jobOffers: jo,
          hasNotifications: n.count() > 0,
          notifications: n
        }
      }else{
        return {
          city: City.find({}),
          hasOffers: jo.count() > 0,
          jobOffers: jo,
        }
      }
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
    this.subscribe('OfferApplies', null).wait()
    this.subscribe('Profiles', 'enterprise').wait()
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
      if(JobOffer.findOne({_id: this.params.offerId})){
        this.render()
      }else{
        this.redirect('mainActivity')
      }
    }else{
      this.render('loading')
    }
    Session.set('route', Router.current().route.getName())
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
    this.subscribe('Profiles', 'enterprise').wait()
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
    Session.set('route', Router.current().route.getName())
  },
  data: function(){
    var r = JobOffer.find({},{sort: { job_dateTime: -1}})
    return {
      offerMatch: r,
      hasOffers: r.count() > 0
    }
  }
})

Router.route('/profile/:profileId', {
  name: 'profileActivity',
  layoutTemplate: 'layout',
  yieldRegions: {
    'search': { to: 'main'}
  },
  subscriptions: function(){
    var user = Meteor.user()
    if(user){
      if(user.profile.typeProfile == 'user'){
        this.subscribe('Profiles', 'enterprise').wait()
        this.subscribe('BranchOffice', this.params.profileId).wait()
      }else{
        this.subscribe('Profiles', 'user').wait()
        this.subscribe('Job', this.params.profileId).wait()
        this.subscribe('Study', this.params.profileId).wait()
      }
    }
    this.subscribe('City').wait()
  },
  onBeforeAction: function(){

  },
  action: function(){

  },
  data: function(){

  }
})
